const stats = [
  { value: '10+', label: 'Years in Business' },
  { value: '500+', label: 'Homes Served' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '5★', label: 'Average Rating' },
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
                alt="Landscaping team at work"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-green-600 text-white rounded-2xl p-4 shadow-lg">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm text-green-100">Years Experience</div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Passionate About Making Your Yard Beautiful
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Green Horizon Landscaping has been serving homeowners and businesses in our community for over a decade. We started as a small family operation with one truck and a passion for outdoor spaces — and we&apos;ve grown into a trusted team of landscape professionals.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We believe every yard has potential. Whether you need a weekly mow or a complete landscape overhaul, we bring the same dedication and craftsmanship to every job. All our work is backed by a satisfaction guarantee.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-8">
              {[
                'Fully licensed and insured for your peace of mind',
                'Eco-friendly practices and equipment',
                'Transparent pricing — no hidden fees',
                'Responsive communication and on-time service',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

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
