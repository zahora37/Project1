const footerLinks = {
  Services: [
    { label: 'Artificial Turf', href: '#services' },
    { label: 'Paver Installation', href: '#services' },
    { label: 'Irrigation Systems', href: '#services' },
    { label: 'Landscape Maintenance', href: '#services' },
    { label: 'Planting and Cleanup', href: '#services' },
    { label: 'Custom Landscaping', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Book Consultation', href: '#booking' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Wild Roots Logo" className="h-14 w-auto object-contain" />
              <div>
                <div className="text-white font-bold text-lg">Wild Roots</div>
                <div className="text-amber-400 text-sm">Custom Landscaping, LLC</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Arizona landscaping professionals. Artificial turf, pavers, irrigation, planting, cleanup, and custom outdoor work. Licensed, insured, and certified.
            </p>

            <a
              href="YOUR_GOOGLE_REVIEWS_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors mb-4"
            >
              ⭐ Leave Us a Google Review
            </a>

            <div className="space-y-2 text-sm">
              <a href="tel:8054782466" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                (805) 478-2466
              </a>
              <a href="mailto:wild.roots.llc24@gmail.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                wild.roots.llc24@gmail.com
              </a>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/wild_roots_custom_landscapes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  📸 Instagram
                </a>
              </div>
              <div className="text-xs text-gray-500 pt-2">
                ROC #357770 · Licensed & Insured
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold mb-4">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Wild Roots Custom Landscaping, LLC. All rights reserved.</p>
          <p>ROC #357770 · Arizona Licensed & Insured 🌳</p>
        </div>
      </div>
    </footer>
  )
}
