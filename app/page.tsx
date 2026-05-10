import type { Metadata } from 'next';
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: 'Wild Roots Custom Landscaping | Arizona Landscaping Experts',
  description: 'Arizona-licensed landscaping professionals. Artificial turf, pavers, irrigation, Landscape Maintenance & more. ROC #357770.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function Home() {
  return (
    <>
      <style>{`
        /* ── Reset & Base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --green: #3a5a40;
          --green-dark: #2d4731;
          --green-light: #e8f0e9;
          --beige: #f5f0e8;
          --beige-dark: #ede5d8;
          --brown: #7c5c3e;
          --text: #2c2c2c;
          --text-light: #666;
          --white: #ffffff;
        }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Georgia', serif;
          color: var(--text);
          background: var(--white);
          line-height: 1.6;
        }
        img { max-width: 100%; height: auto; display: block; }
        a { color: inherit; text-decoration: none; }

        /* ── Header ── */
        .header {
          position: sticky; top: 0; z-index: 100;
          background: var(--white);
          border-bottom: 1px solid #e8e3db;
          padding: 0 24px;
        }
        .header-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          height: 68px; gap: 16px;
        }
        .header-logo {
          display: flex; align-items: center; gap: 10px;
          font-weight: 700; font-size: 17px; color: var(--green);
          flex-shrink: 0;
        }
        .header-logo img { width: 40px; height: 40px; object-fit: contain; }
        .header-logo-sub { font-size: 10px; color: var(--text-light); font-weight: 400; display: block; }
        .header-nav {
          display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
        }
        .header-nav a {
          padding: 6px 10px; font-size: 13px; color: var(--text-light);
          border-radius: 6px; transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .header-nav a:hover { color: var(--green); background: var(--green-light); }
        .header-actions {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .header-instagram {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; color: var(--text-light);
          padding: 6px 10px; border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          border: 1px solid #e0d8cc;
          white-space: nowrap;
        }
        .header-instagram:hover { color: #c13584; background: #fff0f8; border-color: #c13584; }
        .header-instagram svg { width: 16px; height: 16px; }
        .btn-book {
          background: var(--green); color: white;
          padding: 9px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 600;
          transition: background 0.2s;
          white-space: nowrap;
          border: none; cursor: pointer; font-family: inherit;
          display: inline-block;
        }
        .btn-book:hover { background: var(--green-dark); }
        .btn-outline {
          border: 1.5px solid var(--green); color: var(--green);
          padding: 9px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 600;
          transition: all 0.2s; white-space: nowrap;
          display: inline-block;
        }
        .btn-outline:hover { background: var(--green); color: white; }
        .header-license {
          font-size: 11px; color: var(--text-light);
          padding: 4px 10px; background: var(--beige);
          border-radius: 20px; white-space: nowrap;
        }
        .mobile-menu-btn {
          display: none; background: none; border: none;
          font-size: 22px; cursor: pointer; color: var(--green);
        }

        /* ── Hero ── */
        .hero {
          background: linear-gradient(135deg, var(--green-dark) 0%, var(--green) 60%, #4a7c52 100%);
          color: white; padding: 80px 24px;
          text-align: center; position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=60') center/cover no-repeat;
          opacity: 0.12;
        }
        .hero-inner { position: relative; max-width: 760px; margin: 0 auto; }
        .hero-badge {
          display: inline-block; background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 6px 16px; border-radius: 20px;
          font-size: 12px; letter-spacing: 1px; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .hero h1 {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.15; margin-bottom: 20px;
        }
        .hero h1 span { color: #b8d4bb; }
        .hero-sub {
          font-size: 17px; opacity: 0.9; margin-bottom: 36px;
          max-width: 560px; margin-left: auto; margin-right: auto;
        }
        .hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
        .btn-white {
          background: white; color: var(--green);
          padding: 13px 28px; border-radius: 8px;
          font-size: 15px; font-weight: 700;
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-block;
        }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
        .btn-ghost {
          background: transparent; color: white;
          border: 2px solid rgba(255,255,255,0.6);
          padding: 13px 28px; border-radius: 8px;
          font-size: 15px; font-weight: 600;
          transition: all 0.2s; display: inline-block;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.15); border-color: white; }
        .hero-trust {
          display: flex; gap: 20px; justify-content: center;
          flex-wrap: wrap; font-size: 13px; opacity: 0.85;
        }
        .hero-trust span { display: flex; align-items: center; gap: 6px; }

        /* ── Section Base ── */
        .section { padding: 72px 24px; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-label {
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--brown); font-weight: 600; margin-bottom: 10px;
          text-align: center;
        }
        .section-title {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700; color: var(--text); margin-bottom: 14px;
          text-align: center;
        }
        .section-sub { font-size: 16px; color: var(--text-light); max-width: 560px; text-align: center; margin: 0 auto; }
        .section-header { margin-bottom: 48px; text-align: center; }

        /* ── Services ── */
        .services { background: var(--beige); }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .service-card {
          background: white; border-radius: 12px;
          padding: 28px; border: 1px solid #e8e3db;
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: center;
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .service-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; color: var(--green); }
        .service-card p { font-size: 14px; color: var(--text-light); margin-bottom: 18px; line-height: 1.6; }
        .service-link {
          font-size: 13px; font-weight: 600; color: var(--green);
          display: inline-flex; align-items: center; gap: 6px;
          transition: gap 0.2s; justify-content: center;
        }
        .service-link:hover { gap: 10px; }

        /* ── About ── */
        .about { background: white; }
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
        }
        .about-img {
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .about-img img { width: 100%; height: 400px; object-fit: cover; }
        .about-stats {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; margin-top: 32px;
        }
        .stat-box {
          background: var(--beige); border-radius: 10px;
          padding: 18px; text-align: center;
        }
        .stat-box strong { display: block; font-size: 22px; color: var(--green); }
        .stat-box span { font-size: 12px; color: var(--text-light); }
        .certs { margin-top: 24px; }
        .certs h4 { font-size: 14px; font-weight: 700; margin-bottom: 12px; }
        .cert-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .cert-list li {
          font-size: 13px; color: var(--text-light);
          display: flex; align-items: flex-start; gap: 8px;
        }
        .cert-list li::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; }

        /* ── Our Work (Hover Tiles) ── */
        .our-work { background: var(--beige); }
        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .work-tile {
          background: var(--beige-dark); border-radius: 12px;
          padding: 32px 24px; position: relative; overflow: hidden;
          cursor: default; transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
          border: 1px solid #ddd5c5; text-align: center;
        }
        .work-tile::before {
          content: ''; position: absolute; inset: 0;
          background: var(--green); opacity: 0;
          transition: opacity 0.25s;
        }
        .work-tile:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(58,90,64,0.18); }
        .work-tile:hover::before { opacity: 1; }
        .work-tile-content { position: relative; z-index: 1; }
        .work-tile h3 {
          font-size: 17px; font-weight: 700; color: var(--green);
          margin-bottom: 6px; transition: color 0.25s;
        }
        .work-tile p { font-size: 13px; color: var(--text-light); transition: color 0.25s; }
        .work-tile:hover h3 { color: white; }
        .work-tile:hover p { color: rgba(255,255,255,0.8); }
        .work-cta { text-align: center; margin-top: 40px; }

        /* ── Tips ── */
        .tips { background: white; }
        .tips-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 32px;
        }
        .tip-card { display: flex; flex-direction: column; gap: 16px; }
        .tip-img {
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .tip-img img { width: 100%; height: 220px; object-fit: cover; }
        .tip-badge {
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--brown); font-weight: 600;
        }
        .tip-number {
          font-size: 3rem; font-weight: 900; color: var(--green-dark);
          line-height: 1; margin-bottom: 4px; opacity: 0.85;
        }
        .tip-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .tip-card p { font-size: 14px; color: var(--text-light); line-height: 1.7; }
        .tip-link {
          font-size: 13px; font-weight: 600; color: var(--green);
          display: inline-flex; align-items: center; gap: 6px; margin-top: 4px;
          transition: gap 0.2s;
        }
        .tip-link:hover { gap: 10px; }
        .tips-cta { text-align: center; margin-top: 48px; }

        /* ── Testimonials ── */
        .testimonials { background: var(--beige); }
        .testi-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .testi-card {
          background: white; border-radius: 12px;
          padding: 28px; border: 1px solid #e8e3db;
          text-align: center;
        }
        .testi-quote { font-size: 36px; color: var(--green); line-height: 1; margin-bottom: 8px; }
        .testi-card p { font-size: 14px; color: var(--text-light); line-height: 1.7; font-style: italic; margin-bottom: 18px; }
        .testi-author strong { display: block; font-size: 14px; }
        .testi-author span { font-size: 12px; color: var(--text-light); }
        .stars { color: #f59e0b; font-size: 14px; margin-bottom: 16px; }

        /* ── Scheduling ── */
        .scheduling { background: white; }
        .scheduling-welcome {
          background: var(--green-light); border-left: 4px solid var(--green);
          padding: 16px 20px; border-radius: 8px; margin-bottom: 40px;
          font-size: 15px; color: var(--green-dark); font-weight: 500;
          text-align: center;
        }
        .steps-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; margin-bottom: 40px;
        }
        .step-box {
          text-align: center; padding: 32px 20px;
          background: var(--beige); border-radius: 12px;
        }
        .step-num {
          width: 48px; height: 48px; border-radius: 50%;
          background: var(--green); color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 700;
          margin: 0 auto 16px;
        }
        .step-box h3 { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
        .step-box p { font-size: 13px; color: var(--text-light); }
        .scheduling-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }
        .scheduling-phone { text-align: center; font-size: 14px; color: var(--text-light); }
        .scheduling-phone a { color: var(--green); font-weight: 600; }

        /* ── Footer ── */
        .footer { background: var(--green-dark); color: white; padding: 56px 24px 32px; }
        .footer-inner { max-width: 1100px; margin: 0 auto; }
        .footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr;
          gap: 48px; margin-bottom: 40px;
        }
        .footer-brand-logo {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
        }
        .footer-brand-logo img { width: 36px; height: 36px; object-fit: contain; }
        .footer-brand-name { font-size: 16px; font-weight: 700; }
        .footer-brand-name small { display: block; font-size: 11px; opacity: 0.7; font-weight: 400; }
        .footer-desc { font-size: 13px; opacity: 0.75; line-height: 1.7; margin-bottom: 20px; }
        .footer-contact a { color: rgba(255,255,255,0.85); font-size: 13px; }
        .footer-contact a:hover { color: white; }
        .footer-insta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: rgba(255,255,255,0.85);
          margin-top: 12px; transition: color 0.2s;
        }
        .footer-insta:hover { color: #f9a8d4; }
        .footer-col h4 { font-size: 13px; font-weight: 700; margin-bottom: 16px; opacity: 0.9; letter-spacing: 0.5px; }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-links a { font-size: 13px; opacity: 0.7; transition: opacity 0.2s; }
        .footer-links a:hover { opacity: 1; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.12);
          padding-top: 24px; font-size: 12px; opacity: 0.6;
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;
        }
        .footer-review {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 16px; border-radius: 8px; font-size: 13px;
          transition: background 0.2s; margin-top: 14px;
        }
        .footer-review:hover { background: rgba(255,255,255,0.18); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-img { display: none; }
          .footer-top { grid-template-columns: 1fr 1fr; }
          .steps-grid { grid-template-columns: 1fr; }
          .header-nav { display: none; }
          .mobile-menu-btn { display: block; }
          .header-license { display: none; }
        }
        @media (max-width: 600px) {
          .section { padding: 48px 16px; }
          .hero { padding: 60px 16px; }
          .footer-top { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; }
          .services-grid, .work-grid, .tips-grid, .testi-grid { grid-template-columns: 1fr; }
          .about-stats { grid-template-columns: 1fr 1fr; }
          .hero-ctas { flex-direction: column; align-items: center; }
          .header-instagram span { display: none; }
          .btn-white, .btn-ghost { width: 100%; text-align: center; }
          .scheduling-ctas { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          <a href="#" className="header-logo">
            <img src="/logo.png" alt="Wild Roots Logo" />
            <div>
              Wild Roots
              <span className="header-logo-sub">Custom Landscaping, LLC</span>
            </div>
          </a>

          <nav className="header-nav">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#gallery">Our Work</a>
            <a href="#tips">Tips</a>
            <a href="#testimonials">Reviews</a>
            <a href="#booking">Contact</a>
          </nav>

          <div className="header-actions">
            {/* Instagram in header */}
            <a
              href="https://www.instagram.com/wild_roots_custom_landscapes"
              target="_blank"
              rel="noopener noreferrer"
              className="header-instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>Instagram</span>
            </a>

            <span className="header-license">ROC #357770</span>

            <a
              href="https://calendly.com/wild-roots-custom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book"
            >
              Book Free Estimate
            </a>

            <button className="mobile-menu-btn" aria-label="Menu">☰</button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Arizona Licensed & Insured · ROC #357770</div>
          <h1>Wild Roots<br /><span>Custom Landscaping</span></h1>
          <p className="hero-sub">
            Transform Your Outdoor Space Today. Artificial turf, pavers, irrigation, Landscape Maintenance and more — by Arizona-certified professionals.
          </p>
          <div className="hero-ctas">
            <a
              href="https://calendly.com/wild-roots-custom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white"
            >
              Get Free Estimate
            </a>
            <a href="#services" className="btn-ghost">Our Services</a>
          </div>
          <div className="hero-trust">
            <span>✓ Licensed & Insured</span>
            <span>✓ Free Estimates</span>
            <span>✓ ISA Certified Arborist</span>
            <span>✓ AZ Certified Pros</span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section services" id="services">
        <div className="section-inner">
          <div className="section-header">
            <p className="section-label">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <p className="section-sub">From artificial turf to full landscape transformations. Certified Arizona professionals you can trust.</p>
          </div>
          <div className="services-grid">
            {[
              { title: 'Artificial Turf', desc: 'Professional installation that looks lush year-round. Zero watering, zero mowing, built to last. Perfect for Arizona\'s climate.' },
              { title: 'Paver Installation', desc: 'Beautiful, durable paver driveways, patios, pathways, and courtyards that add real value and curb appeal.' },
              { title: 'Irrigation Systems', desc: 'Smart irrigation design, installation, and repair. AZ Landscape Contractor\'s Association Certified Irrigation Technicians.' },
              { title: 'Landscape Maintenance', desc: 'Cleanup, trimming, and upkeep.' },
              { title: 'Tree Management', desc: ' Expert care for trees including trimming, health assessment, and removal.' },
              { title: 'And More', desc: 'Custom landscaping solutions for any outdoor challenge. Ask us about your project and we can handle it.' },
            ].map((s) => (
              <div key={s.title} className="service-card">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a
                  href="https://calendly.com/wild-roots-custom/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-link"
                >
                  Free estimate →
                </a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ color: 'var(--text-light)', marginBottom: '16px', fontSize: '15px' }}>
              Not sure what you need? Our AI assistant can help, or request a free on-site estimate.
            </p>
            <a
              href="https://calendly.com/wild-roots-custom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book"
              style={{ display: 'inline-block', padding: '13px 32px', fontSize: '15px' }}
            >
              Get a Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section about" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-img">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                alt="Wild Roots team at work"
              />
            </div>
            <div>
              <p className="section-label">About Us</p>
              <h2 className="section-title">Arizona-Certified Landscaping Professionals</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
                Wild Roots Custom Landscaping, LLC is a fully licensed and insured landscaping company serving the local Arizona community. We specialize in artificial turf, paver installation, irrigation systems, and full landscape maintenance.
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.7' }}>
                Our team holds some of the highest certifications in the industry. When we work on your property, you know it&apos;s done right.
              </p>

              <div className="about-stats">
                <div className="stat-box"><strong>ROC</strong><span>#357770 Licensed</span></div>
                <div className="stat-box"><strong>5★</strong><span>Rated Service</span></div>
                <div className="stat-box"><strong>100%</strong><span>Satisfaction Goal</span></div>
                <div className="stat-box"><strong>AZ</strong><span>Certified Pros</span></div>
              </div>

              <div className="certs">
                <h4>Our Certifications</h4>
                <ul className="cert-list">
                  <li>ROC #357770 — Licensed &amp; Insured</li>
                  <li>PMD Qualified Applicator</li>
                  <li>ISA Certified Arborist / Municipal Specialist</li>
                  <li>AZ Landscape Contractor&apos;s Association: Certified Irrigation Technician</li>
                  <li>Arizona Certified Landscape Professional</li>
                  <li>Sustainable Landscape Management Certification</li>
                </ul>
              </div>

              <a
                href="https://calendly.com/wild-roots-custom/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-book"
                style={{ display: 'inline-block', marginTop: '28px', padding: '13px 28px', fontSize: '15px' }}
              >
                Get Your Free Estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR WORK (hover tiles) ── */}
      <section className="section our-work" id="gallery">
        <div className="section-inner">
          <div className="section-header">
            <p className="section-label">Portfolio</p>
            <h2 className="section-title">Our Work</h2>
            <p className="section-sub">Expert Arizona landscaping services for every outdoor space.</p>
          </div>
          <div className="work-grid">
            {[
              { title: 'Artificial Turf', sub: 'Zero water. Always green.' },
              { title: 'Paver Installation', sub: 'Driveways, patios & paths' },
              { title: 'Irrigation Systems', sub: 'Smart water management' },
              { title: 'Landscape Maintenance', sub: 'Cleanup, trimming, and upkeep' },
              { title: 'Tree Management', sub: 'ISA certified arborist' },
            ].map((w) => (
              <div key={w.title} className="work-tile">
                <div className="work-tile-content">
                  <h3>{w.title}</h3>
                  <p>{w.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="work-cta">
            <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>Want expert landscaping for your Arizona property?</p>
            <a
              href="https://calendly.com/wild-roots-custom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book"
              style={{ display: 'inline-block', padding: '13px 28px' }}
            >
              Request a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* ── TIPS ── */}
      <section className="section tips" id="tips">
        <div className="section-inner">
          <div className="section-header">
            <p className="section-label">Arizona Expert Advice</p>
            <h2 className="section-title">Beating the Arizona Heat</h2>
            <p className="section-sub">Three things every homeowner should know to keep a beautiful yard when summer temps hit 115°.</p>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-img">
                <img src="/images/tip-irrigation.jpg" alt="Drip irrigation system with plant and mulch" />
              </div>
              <div>
                <p className="tip-badge">Irrigation Tip</p>
                <div className="tip-number">01</div>
                <h3>Water Early Morning, Never Midday</h3>
                <p>In Arizona summers, watering at noon loses up to 50% of water to evaporation before it reaches roots. Water between 4 and 8 AM. Drip irrigation delivers water right to root zones and cuts usage by up to 60% compared to sprinklers.</p>
                <a href="https://calendly.com/wild-roots-custom/30min" target="_blank" rel="noopener noreferrer" className="tip-link">Get expert help with this →</a>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-img">
                <img src="/images/tip-plants.jpg" alt="Prickly pear cactus with Arizona red rock mountains" />
              </div>
              <div>
                <p className="tip-badge">Plant Selection</p>
                <div className="tip-number">02</div>
                <h3>Plant Desert-Native Species</h3>
                <p>Saguaro, agave, palo verde, desert willow, and brittlebush are built for Arizona heat. Once established they need almost no irrigation and stay beautiful through summer highs above 115° while supporting native pollinators.</p>
                <a href="https://calendly.com/wild-roots-custom/30min" target="_blank" rel="noopener noreferrer" className="tip-link">Get expert help with this →</a>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-img">
                <img src="/images/tip-rock.jpg" alt="Rocky desert mountain landscape with gravel terrain" />
              </div>
              <div>
                <p className="tip-badge">Heat Management</p>
                <div className="tip-number">03</div>
                <h3>Use Rock or Gravel Ground Cover</h3>
                <p>A 3 to 4 inch layer of decomposed granite or river rock keeps soil 15 to 20 degrees cooler, locks in moisture, and eliminates weeds. Unlike wood mulch, it will not break down or attract termites in the Arizona climate.</p>
                <a href="https://calendly.com/wild-roots-custom/30min" target="_blank" rel="noopener noreferrer" className="tip-link">Get expert help with this →</a>
              </div>
            </div>
          </div>
          <div className="tips-cta">
            <a
              href="https://calendly.com/wild-roots-custom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book"
              style={{ display: 'inline-block', padding: '13px 32px', fontSize: '15px' }}
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials" id="testimonials">
        <div className="section-inner">
          <div className="section-header">
            <p className="section-label">Customer Reviews</p>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-sub">Real reviews from real Arizona neighbors. We let our work and our customers speak for us.</p>
          </div>
          <div className="testi-grid">
            {[
              {
                text: 'Wild Roots completely transformed our backyard. We went from a patchy mess to a beautiful desert landscape with a stone walkway and agave beds. The team was professional, on time, and the results exceeded our expectations.',
                name: 'Sarah M.',
                loc: 'Scottsdale, AZ',
                service: 'Landscape Design & Hardscaping',
              },
              {
                text: "I had Wild Roots install artificial turf in my front and back yard. Best decision I ever made. Zero maintenance, always green, and my water bill dropped significantly. Their crew was clean, fast, and respectful of our property.",
                name: 'James T.',
                loc: 'Gilbert, AZ',
                service: 'Artificial Turf Installation',
              },
              {
                text: "After getting quotes from three companies, we went with Wild Roots for our irrigation system. Our water bill dropped significantly and the yard has never looked healthier. Their AI chat on the website was actually really helpful.",
                name: 'Linda & Bob K.',
                loc: 'Goodyear, AZ',
                service: 'Irrigation System',
              },
            ].map((t) => (
              <div key={t.name} className="testi-card">
                <div className="testi-quote">&ldquo;</div>
                <div className="stars">★★★★★</div>
                <p>{t.text}</p>
                <div className="testi-author">
                  <strong>{t.name}</strong>
                  <span>{t.loc} · {t.service}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Removed: "5.0 · Based on 80+ reviews" */}
        </div>
      </section>

      {/* ── SCHEDULING ── */}
      <section className="section scheduling" id="booking">
        <div className="section-inner">
          <div className="section-header">
            <p className="section-label">Free Consultation</p>
            <h2 className="section-title">Schedule a Time That Works for You</h2>
            <p className="section-sub">Pick a day and we will come to your property for a free, no-pressure estimate.</p>
          </div>

          <div className="scheduling-welcome">
            Welcome to Wild Roots Custom Landscaping scheduling. Please follow the steps to book your consultation.
          </div>

          <div className="steps-grid">
            <div className="step-box">
              <div className="step-num">1</div>
              <h3>Pick a Time</h3>
              <p>Choose any available slot. Mornings, evenings, weekends available.</p>
            </div>
            <div className="step-box">
              <div className="step-num">2</div>
              <h3>We Show Up</h3>
              <p>A certified Wild Roots professional visits your property. On time, every time.</p>
            </div>
            <div className="step-box">
              <div className="step-num">3</div>
              <h3>Get Your Quote</h3>
              <p>Same-day written estimate. No surprises, no pressure. 100% free.</p>
            </div>
          </div>

          <div className="scheduling-ctas">
            <a
              href="https://calendly.com/wild-roots-custom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book"
              style={{ display: 'inline-block', padding: '14px 36px', fontSize: '16px' }}
            >
              Book My Free Consultation
            </a>
            <a
              href="https://calendly.com/wild-roots-custom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '14px 36px', fontSize: '16px' }}
            >
              View Available Times
            </a>
          </div>
          <p className="scheduling-phone">
            Prefer to call or text? <a href="tel:8054782466">(805) 478-2466</a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" id="contact">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-logo">
                <img src="/logo.png" alt="Wild Roots Logo" />
                <div className="footer-brand-name">
                  Wild Roots
                  <small>Custom Landscaping, LLC</small>
                </div>
              </div>
              <p className="footer-desc">
                Arizona&apos;s trusted landscaping professionals. Artificial turf, pavers, irrigation &amp; more. Licensed, insured, and certified.
              </p>
              <div className="footer-contact">
                <a href="tel:8054782466" style={{ display: 'block', marginBottom: '6px' }}>(805) 478-2466</a>
                <a href="mailto:wild.roots.llc24@gmail.com">wild.roots.llc24@gmail.com</a>
              </div>
              <a
                href="https://www.instagram.com/wild_roots_custom_landscapes"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-insta"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                @wild_roots_custom_landscapes
              </a>
              <br />
              <a
                href="href="https://www.google.com/maps/search/Wild+Roots+Custom+Landscaping+LLC+Arizona""
                target="_blank"
                rel="noopener noreferrer"
                className="footer-review"
              >
                ⭐ Leave Us a Google Review
              </a>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul className="footer-links">
                <li><a href="#services">Artificial Turf</a></li>
                <li><a href="#services">Paver Installation</a></li>
                <li><a href="#services">Irrigation Systems</a></li>
                <li><a href="#services">Landscape Maintenance</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#gallery">Our Work</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="https://calendly.com/wild-roots-custom/30min" target="_blank" rel="noopener noreferrer">Book Consultation</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Wild Roots Custom Landscaping, LLC. All rights reserved.</span>
            <span> Arizona Licensed &amp; Insured 🌳</span>
          </div>
        </div>
      </footer>

      {/* ── AI CHAT WIDGET ── */}
      <ChatWidget />
    </>
  );
}
