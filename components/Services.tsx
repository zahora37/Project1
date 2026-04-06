const services = [
  {
    icon: '🌿',
    title: 'Lawn Mowing',
    description:
      'Regular mowing, edging, and blowing to keep your lawn looking pristine every week or bi-weekly.',
    price: 'From $40/visit',
  },
  {
    icon: '🌳',
    title: 'Landscape Design',
    description:
      'Custom designs that transform your yard into a beautiful outdoor living space tailored to your style.',
    price: 'From $500',
  },
  {
    icon: '✂️',
    title: 'Tree Trimming',
    description:
      'Professional pruning and trimming to keep your trees healthy, safe, and looking their best.',
    price: 'From $150/tree',
  },
  {
    icon: '💧',
    title: 'Irrigation Systems',
    description:
      'Smart irrigation installation and repair to keep your lawn watered efficiently, saving you water and money.',
    price: 'From $1,500',
  },
  {
    icon: '🍂',
    title: 'Seasonal Cleanup',
    description:
      'Spring and fall cleanup including leaf removal, bed prep, and debris clearing to get your yard season-ready.',
    price: 'From $200',
  },
  {
    icon: '🪨',
    title: 'Hardscaping',
    description:
      'Patios, walkways, retaining walls, and fire pits that add value and extend your usable outdoor space.',
    price: 'From $3,000',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          From routine maintenance to full landscape transformations — we do it all with care and expertise.
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
              <span className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                {service.price}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Not sure what you need? Chat with our AI assistant or request a free estimate.</p>
          <a href="#contact" className="btn-primary">
            Get a Free Estimate
          </a>
        </div>
      </div>
    </section>
  )
}
