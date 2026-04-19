const services = [
  {
    icon: '🌿',
    title: 'Artificial Turf',
    description:
      'Professional artificial turf installation that looks lush year-round — zero watering, zero mowing, and built to last. Perfect for Arizona\'s climate.',
    price: 'Free estimate',
  },
  {
    icon: '🪨',
    title: 'Paver Installation',
    description:
      'Beautiful, durable paver driveways, patios, pathways, and courtyards that add real value and curb appeal to your property.',
    price: 'Free estimate',
  },
  {
    icon: '💧',
    title: 'Irrigation Systems',
    description:
      'Smart irrigation design, installation, and repair. We are Arizona Landscape Contractor\'s Association Certified Irrigation Technicians.',
    price: 'Free estimate',
  },
  {
    icon: '🌱',
    title: 'Landscape Maintenance',
    description:
      'Ongoing maintenance to keep your outdoor space clean, healthy, and beautiful all year. Reliable, scheduled service you can count on.',
    price: 'Free estimate',
  },
  {
    icon: '🌾',
    title: 'Weed Management',
    description:
      'Effective weed control and prevention treatments tailored to Arizona landscapes. We\'re PMD Qualified Applicators for safe, professional results.',
    price: 'Free estimate',
  },
  {
    icon: '✨',
    title: '& More',
    description:
      'Custom landscaping solutions for any outdoor challenge. ISA Certified Arborist on staff. Ask us about your project — we can handle it.',
    price: 'Free estimate',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          From artificial turf to full landscape transformations — certified Arizona professionals you can trust.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
              <span className="inline-block bg-amber-50 text-amber-700 text-sm font-semibold px-3 py-1 rounded-full">
                {service.price}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Not sure what you need? Our AI assistant can help, or request a free on-site estimate.</p>
          <a href="#contact" className="btn-primary">
            Get a Free Estimate
          </a>
        </div>
      </div>
    </section>
  )
}
