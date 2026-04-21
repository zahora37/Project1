const tips = [
  {
    number: '01',
    tag: 'Irrigation Tip',
    title: 'Water Early Morning, Never Midday',
    description:
      'In Arizona summers, watering at noon loses up to 50% of water to evaporation before it reaches roots. Water between 4 and 8 AM. Drip irrigation delivers water right to root zones and cuts usage by up to 60% compared to sprinklers.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
    imgAlt: 'Lush irrigated lawn early morning',
  },
  {
    number: '02',
    tag: 'Plant Selection',
    title: 'Plant Desert-Native Species',
    description:
      'Saguaro, agave, palo verde, desert willow, and brittlebush are built for Arizona heat. Once established they need almost no irrigation and stay beautiful through summer highs above 115 degrees while supporting native pollinators.',
    img: 'https://images.unsplash.com/photo-1601760562234-9814eea6db90?w=800&q=85',
    imgAlt: 'Desert native plants and Arizona landscape',
  },
  {
    number: '03',
    tag: 'Heat Management',
    title: 'Use Rock or Gravel Ground Cover',
    description:
      'A 3 to 4 inch layer of decomposed granite or river rock keeps soil 15 to 20 degrees cooler, locks in moisture, and eliminates weeds. Unlike wood mulch, it will not break down or attract termites in the Arizona climate.',
    img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=85',
    imgAlt: 'Stone and gravel desert landscape design',
  },
]

export default function LandscapeTips() {
  return (
    <section id="tips" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide">
            Arizona Expert Advice
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Beating the Arizona Heat
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            Three things every homeowner should know to keep a beautiful yard when summer temps hit 115 degrees.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tips.map((tip) => (
            <div
              key={tip.number}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-100"
            >
              {/* Fixed-height image */}
              <div className="relative h-52 flex-shrink-0 bg-green-100">
                <img
                  src={tip.img}
                  alt={tip.imgAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-4 left-4 bg-amber-400 text-green-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {tip.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <div className="text-6xl font-black text-green-100 leading-none mb-3 select-none">
                  {tip.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {tip.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {tip.description}
                </p>
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors group"
                  >
                    Get expert help with this
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-5">Ready to transform your Arizona yard with the right approach?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-green-700 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-xl transition-colors duration-200 text-lg shadow-lg shadow-green-900/20 hover:shadow-green-900/30"
          >
            Get a Free Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
