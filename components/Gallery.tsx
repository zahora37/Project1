const tiles = [
  {
    gradient: 'from-green-800 to-green-900',
    ring: 'ring-green-600',
    iconColor: 'text-amber-400',
    name: 'Artificial Turf',
    sub: 'Zero water. Always green.',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 3c-1 2-3 3-3 5s1 2 1 4M12 3c1 2 3 3 3 5s-1 2-1 4M8 7c-1 2-2 3-2 5M16 7c1 2 2 3 2 5M5 21h14" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M3 17c2-2 4-3 6-2s3 2 6 0 4-2 6 0" />
      </svg>
    ),
  },
  {
    gradient: 'from-stone-600 to-stone-700',
    ring: 'ring-stone-400',
    iconColor: 'text-green-200',
    name: 'Paver Installation',
    sub: 'Driveways, patios & paths',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  {
    gradient: 'from-green-700 to-green-800',
    ring: 'ring-green-500',
    iconColor: 'text-amber-300',
    name: 'Irrigation Systems',
    sub: 'Smart water management',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 12v4M10 18h4" />
      </svg>
    ),
  },
  {
    gradient: 'from-green-600 to-green-700',
    ring: 'ring-green-400',
    iconColor: 'text-white',
    name: 'Landscape Maintenance',
    sub: 'Year-round care',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
  },
  {
    gradient: 'from-green-900 to-green-950',
    ring: 'ring-green-700',
    iconColor: 'text-amber-400',
    name: 'Weed Management',
    sub: 'PMD certified applicators',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    gradient: 'from-stone-700 to-stone-800',
    ring: 'ring-stone-500',
    iconColor: 'text-green-200',
    name: 'Custom Projects',
    sub: 'ISA certified arborist',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Our Work</h2>
        <p className="section-subtitle">
          Expert Arizona landscaping services for every outdoor space.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.name}
              className={`bg-gradient-to-br ${tile.gradient} ring-2 ${tile.ring} rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center aspect-square group hover:scale-[1.02] transition-transform duration-300 shadow-lg`}
            >
              <div className={`${tile.iconColor} mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                {tile.icon}
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg leading-tight mb-1">
                {tile.name}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm font-medium">
                {tile.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">Want expert landscaping for your Arizona property?</p>
          <a href="#contact" className="btn-primary">
            Request a Free Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
