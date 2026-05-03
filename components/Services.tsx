const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Artificial Turf',
    description:
      'Professional artificial turf installation that looks lush year-round. Zero watering, zero mowing, and built to last. Perfect for Arizona climate.',
    price: 'Free estimate',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
    title: 'Paver Installation',
    description:
      'Beautiful, durable paver driveways, patios, pathways, and courtyards that add real value and curb appeal to your property.',
    price: 'Free estimate',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3" />
      </svg>
    ),
    title: 'Irrigation Systems',
    description:
      'Smart irrigation design, installation, and repair for efficient water use and long term performance.',
    price: 'Free estimate',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19" />
      </svg>
    ),
    title: 'Landscape Maintenance',
    description:
      'Ongoing maintenance to keep your outdoor space clean, healthy, and visually strong all year.',
    price: 'Free estimate',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'And More',
    description:
      'Additional outdoor services including cleanup, planting, and custom landscape solutions based on your needs.',
    price: 'Free estimate',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          From turf to full landscape upgrades. Clean, simple, professional results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 group"
            >
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4 text-green-700 group-hover:bg-green-700 group-hover:text-white transition-colors duration-200">
                {service.icon}
              </div>
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
          <p className="text-gray-500 mb-4">Need help choosing a service. Ask the assistant or request a consultation.</p>
          <a href="#contact" className="btn-primary">
            Get a Free Estimate
          </a>
        </div>
      </div>
    </section>
  )
}
