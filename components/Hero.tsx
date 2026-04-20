'use client'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background - warm Arizona desert landscape */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1601760562234-9814eea6db90?w=1920&q=90')`,
        }}
      />
      {/* Organic multi-layer gradient - light and natural, not heavy */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-stone-900/25 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/50 via-transparent to-green-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 via-transparent to-transparent" />

      {/* Decorative side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-green-400 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/50 rounded-full px-5 py-2 text-amber-300 text-sm font-semibold mb-8 tracking-wide">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          Arizona Licensed & Insured · ROC #357770
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-5 leading-none tracking-tight">
          Wild Roots
          <span className="block text-amber-400 mt-1">Custom Landscaping</span>
        </h1>

        <div className="w-24 h-1 bg-amber-400 mx-auto mb-6 rounded-full" />

        <p className="text-xl sm:text-2xl text-white/90 mb-3 font-bold tracking-widest uppercase">
          Transform Your Outdoor Space Today
        </p>

        <p className="text-base sm:text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          Artificial turf, pavers, irrigation, weed management and more,
          by Arizona-certified professionals with the credentials to back it up.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#contact"
            className="bg-amber-400 hover:bg-amber-300 text-green-950 font-bold px-10 py-4 rounded-xl transition-all duration-200 w-full sm:w-auto text-lg shadow-lg shadow-amber-400/30 hover:scale-105"
          >
            Get Free Estimate
          </a>
          <button
            onClick={() => {
              const chatBtn = document.getElementById('chat-toggle-btn')
              chatBtn?.click()
            }}
            className="bg-white/10 hover:bg-white/20 border-2 border-white/50 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 w-full sm:w-auto text-lg flex items-center justify-center gap-2 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Ask Our AI Assistant
          </button>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-6 text-white/80">
          {[
            { icon: '✓', label: 'Licensed & Insured' },
            { icon: '✓', label: 'Free Estimates' },
            { icon: '✓', label: 'ROC #357770' },
            { icon: '✓', label: 'ISA Certified Arborist' },
            { icon: '✓', label: 'AZ Certified Pros' },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-1.5 text-sm font-medium">
              <span className="text-amber-400 font-bold">{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 36.7C1200 33.3 1320 26.7 1380 23.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
