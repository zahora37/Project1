const tips = [
  {
    number: '01',
    tag: 'Irrigation Tip',
    title: 'Water Early Morning, Never Midday',
    description:
      'In Arizona summers, watering at noon loses up to 50% of water to evaporation before it ever reaches the roots. Water between 4 and 8 AM when temps are coolest. Drip irrigation delivers water right to root zones and cuts usage by up to 60% compared to sprinklers.',
    img: 'https://source.unsplash.com/800x500/?drip-irrigation,desert-garden',
  },
  {
    number: '02',
    tag: 'Plant Selection',
    title: 'Plant Desert-Native Species',
    description:
      'Plants like saguaro, agave, palo verde, desert willow, and brittlebush are built for Arizona heat. Once established they need almost no irrigation and stay beautiful through summer highs above 115 degrees. They also attract native pollinators and support the local ecosystem.',
    img: 'https://source.unsplash.com/800x500/?saguaro,cactus,arizona-desert',
  },
  {
    number: '03',
    tag: 'Heat Management',
    title: 'Use Rock or Gravel Ground Cover',
    description:
      'A 3 to 4 inch layer of decomposed granite or river rock keeps soil temperatures 15 to 20 degrees cooler, locks in moisture, and eliminates weeds naturally. Unlike wood mulch, gravel will not break down or attract termites in the Arizona climate, making it a long-lasting, low-maintenance choice.',
    img: 'https://source.unsplash.com/800x500/?decomposed-granite,gravel-garden,desert-landscaping',
  },
]

export default function LandscapeTips() {
  return (
    <section id="tips" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Arizona Expert Advice
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Beating the Arizona Heat</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Three things every Arizona homeowner should know to keep a beautiful yard when summer temps hit 115 degrees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <div
              key={tip.number}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={tip.img}
                  alt={tip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-amber-400 text-green-950 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {tip.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-black text-green-100 leading-none mb-3">{tip.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-green-700 transition-colors">
                  {tip.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tip.description}</p>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <a
                    href="#contact"
                    className="text-green-700 font-semibold text-sm hover:text-green-600 flex items-center gap-1.5 transition-colors"
                  >
                    Get expert help with this
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
