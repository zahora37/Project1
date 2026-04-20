import WildRootsLogo from './WildRootsLogo'

const footerLinks = {
  Services: [
    { label: 'Artificial Turf', href: '#services' },
    { label: 'Paver Installation', href: '#services' },
    { label: 'Irrigation Systems', href: '#services' },
    { label: 'Landscape Maintenance', href: '#services' },
    { label: 'Weed Management', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Get Free Estimate', href: '#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <WildRootsLogo className="h-14 w-auto" />
              <div>
                <div className="text-white font-bold text-lg">Wild Roots</div>
                <div className="text-amber-400 text-sm">Custom Landscaping, LLC</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Arizona's trusted landscaping professionals. Artificial turf, pavers, irrigation, weed management & more. Licensed, insured, and certified.
            </p>

            {/* Google Reviews button */}
            <a
              href="YOUR_GOOGLE_REVIEWS_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors mb-4"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#4285F4"/>
              </svg>
              ⭐ Leave Us a Google Review
            </a>

            <div className="space-y-2 text-sm">
              <a href="tel:8054782466" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (805) 478-2466
              </a>
              <a href="mailto:wild.roots.llc24@gmail.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                wild.roots.llc24@gmail.com
              </a>

              {/* Social Media */}
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

          {/* Link columns */}
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
