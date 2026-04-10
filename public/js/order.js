/* ── Order page logic ─────────────────────────── */
let menuItems = [];
let availability = null;

async function initOrderPage() {
  const form = document.getElementById('order-form');
  if (!form) return;

  // Load menu + availability
  const [configRes, availRes] = await Promise.all([
    fetch('/api/config'),
    fetch('/api/availability?date=' + getNextSaturday()),
  ]);
  const config = await configRes.json();
  availability = await availRes.json();
  menuItems = config.menu.filter(m => m.available);

  // Populate date select with upcoming Saturdays
  populateDateOptions(config, form);

  // Render initial item row
  renderItemRows();

  // Availability status
  updateAvailabilityStatus(availability);

  // Delivery address toggle
  const fulfillmentInputs = form.querySelectorAll('input[name="fulfillment"]');
  const deliveryFields = document.getElementById('delivery-fields');
  fulfillmentInputs.forEach(input => {
    input.addEventListener('change', () => {
      deliveryFields.style.display = input.value === 'delivery' ? 'block' : 'none';
      deliveryFields.querySelector('input').required = input.value === 'delivery';
    });
  });

  // Date change → refresh availability
  const dateSelect = form.querySelector('#preferred-date');
  if (dateSelect) {
    dateSelect.addEventListener('change', async () => {
      const res = await fetch('/api/availability?date=' + dateSelect.value);
      availability = await res.json();
      updateAvailabilityStatus(availability);
    });
  }

  // Add item button
  document.getElementById('add-item-btn').addEventListener('click', addItemRow);

  // Summary updates
  form.addEventListener('change', updateSummary);
  form.addEventListener('input', updateSummary);

  // Submit
  form.addEventListener('submit', handleOrderSubmit);
  updateSummary();
}

function getNextSaturday() {
  const today = new Date();
  const day = today.getDay();
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  const sat = new Date(today);
  sat.setDate(today.getDate() + daysUntilSat);
  return sat.toISOString().split('T')[0];
}

function getUpcomingSaturdays(n = 4) {
  const saturdays = [];
  const today = new Date();
  const day = today.getDay();
  let daysUntilSat = (6 - day + 7) % 7 || 7;
  for (let i = 0; i < n; i++) {
    const sat = new Date(today);
    sat.setDate(today.getDate() + daysUntilSat + i * 7);
    saturdays.push(sat.toISOString().split('T')[0]);
  }
  return saturdays;
}

function populateDateOptions(config, form) {
  const select = form.querySelector('#preferred-date');
  if (!select) return;
  const saturdays = getUpcomingSaturdays(4);
  select.innerHTML = saturdays.map(date => {
    const d = new Date(date + 'T12:00:00');
    const label = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const weekend = config.weekends?.[date];
    const soldOut = weekend?.soldOut || (weekend && weekend.ordersPlaced >= weekend.limit);
    return `<option value="${date}" ${soldOut ? 'disabled' : ''}>${label}${soldOut ? ' (Sold Out)' : ''}</option>`;
  }).join('');
}

function updateAvailabilityStatus(avail) {
  const el = document.getElementById('availability-status');
  if (!el) return;
  if (avail.soldOut) {
    el.className = 'availability-status status-soldout';
    el.innerHTML = `<span class="status-dot"></span> Sold Out — this weekend is fully booked.`;
  } else if (avail.remaining <= 5) {
    el.className = 'availability-status status-limited';
    el.innerHTML = `<span class="status-dot"></span> Almost Full — only ${avail.remaining} order${avail.remaining !== 1 ? 's' : ''} left this weekend!`;
  } else {
    el.className = 'availability-status status-available';
    el.innerHTML = `<span class="status-dot"></span> Spots Available — ${avail.remaining} of ${avail.limit} orders remaining`;
  }

  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) submitBtn.disabled = avail.soldOut;
}

function renderItemRows() {
  const container = document.getElementById('order-items');
  if (!container) return;
  if (container.children.length === 0) addItemRow();
}

function addItemRow() {
  const container = document.getElementById('order-items');
  const row = document.createElement('div');
  row.className = 'order-item-row';
  row.innerHTML = `
    <select name="item-id[]" required>
      <option value="">Select a bread…</option>
      ${menuItems.map(item =>
        `<option value="${item.id}" data-price="${item.price}" data-name="${item.name}">${item.name} — $${item.price}/${item.unit}</option>`
      ).join('')}
    </select>
    <input type="number" name="item-qty[]" min="1" max="10" value="1" required>
    <button type="button" class="remove-item-btn" aria-label="Remove item" title="Remove">×</button>
  `;
  row.querySelector('.remove-item-btn').addEventListener('click', () => {
    if (container.children.length > 1) {
      row.remove();
      updateSummary();
    }
  });
  row.querySelector('select').addEventListener('change', updateSummary);
  row.querySelector('input').addEventListener('input', updateSummary);
  container.appendChild(row);
  updateSummary();
}

function getOrderItems() {
  const container = document.getElementById('order-items');
  const items = [];
  container.querySelectorAll('.order-item-row').forEach(row => {
    const select = row.querySelector('select');
    const qtyInput = row.querySelector('input[type=number]');
    const opt = select.options[select.selectedIndex];
    if (opt && opt.value) {
      items.push({
        id: opt.value,
        name: opt.dataset.name,
        price: parseFloat(opt.dataset.price),
        quantity: parseInt(qtyInput.value) || 1,
      });
    }
  });
  return items;
}

function updateSummary() {
  const items = getOrderItems();
  const summaryEl = document.getElementById('summary-lines');
  const totalEl = document.getElementById('summary-total');
  if (!summaryEl || !totalEl) return;

  if (!items.length) {
    summaryEl.innerHTML = '<p style="color:var(--brown);font-size:0.87rem;">No items selected yet.</p>';
    totalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  summaryEl.innerHTML = items.map(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    return `<div class="summary-line">
      <span>${item.name} ×${item.quantity}</span>
      <span>$${lineTotal.toFixed(2)}</span>
    </div>`;
  }).join('');
  totalEl.textContent = `$${total.toFixed(2)}`;
}

async function handleOrderSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submit-btn');
  const feedback = document.getElementById('form-feedback');

  const items = getOrderItems();
  if (!items.length) {
    feedback.className = 'form-feedback error';
    feedback.textContent = 'Please add at least one item to your order.';
    return;
  }

  const fulfillment = form.querySelector('input[name="fulfillment"]:checked')?.value;
  if (!fulfillment) {
    feedback.className = 'form-feedback error';
    feedback.textContent = 'Please choose pickup or delivery.';
    return;
  }

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    items,
    fulfillment,
    deliveryAddress: form.querySelector('#delivery-address')?.value.trim(),
    preferredDate: form.querySelector('#preferred-date').value,
    notes: form.querySelector('#notes')?.value.trim(),
  };

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Placing Order…';
  feedback.className = 'form-feedback loading';
  feedback.textContent = 'Submitting your order…';

  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Something went wrong.');

    // Show success modal
    feedback.style.display = 'none';
    const modal = document.getElementById('success-modal');
    document.getElementById('modal-ref').textContent = data.orderRef;
    document.getElementById('modal-total').textContent = `$${Number(data.total).toFixed(2)}`;
    document.getElementById('modal-date').textContent = formatDate(payload.preferredDate);
    modal.classList.add('open');
    form.reset();
    document.getElementById('order-items').innerHTML = '';
    addItemRow();
    updateSummary();
  } catch (err) {
    feedback.className = 'form-feedback error';
    feedback.textContent = err.message;
    btn.disabled = false;
    btn.textContent = 'Place Order';
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

document.addEventListener('DOMContentLoaded', initOrderPage);
