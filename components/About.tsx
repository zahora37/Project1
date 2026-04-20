const stats = [
  { value: 'ROC', label: '#357770 Licensed' },
  { value: '5★', label: 'Rated Service' },
  { value: '100%', label: 'Satisfaction Goal' },
  { value: 'AZ', label: 'Certified Pros' },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-green-100">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                alt="Wild Roots team at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold">Wild Roots</div>
              <div className="text-sm text-amber-100">Custom Landscaping</div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Arizona-Certified Landscaping Professionals
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Wild Roots Custom Landscaping, LLC is a fully licensed and insured landscaping company serving the local Arizona community. We specialize in artificial turf, paver installation, irrigation systems, weed management, and full landscape maintenance.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our team holds some of the highest certifications in the industry. When we work on your property, you know it's done right.
            </p>

            {/* Certifications */}
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-3">Our Certifications</p>
              <ul className="space-y-2">
                {[
                  'ROC #357770 - Licensed & Insured',
                  'PMD Qualified Applicator',
                  'ISA Certified Arborist / Municipal Specialist',
                  'AZ Landscape Contractor\'s Association: Certified Irrigation Technician',
                  'Arizona Certified Landscape Professional',
                  'Sustainable Landscape Management Certification',
                ].map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <a href="#contact" className="btn-primary">
              Get Your Free Estimate
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-green-50 rounded-2xl">
              <div className="text-3xl font-bold text-green-700 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
