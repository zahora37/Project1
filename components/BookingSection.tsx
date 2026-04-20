'use client'

// Replace this URL with your free Calendly link after signing up at calendly.com
// Steps: 1) Go to calendly.com  2) Sign up free  3) Connect Google Calendar
// 4) Create a "Free Consultation" event  5) Paste your booking link below
const CALENDLY_URL = 'https://calendly.com/wild-roots-landscaping/consultation'

const steps = [
  {
    step: '1',
    title: 'Pick a Time',
    desc: 'Choose any available slot that fits your schedule. Mornings, evenings, weekends available.',
  },
  {
    step: '2',
    title: 'We Show Up',
    desc: 'A certified Wild Roots professional visits your property. On time, every time.',
  },
  {
    step: '3',
    title: 'Get Your Quote',
    desc: 'Same-day written estimate. No surprises, no pressure. 100% free.',
  },
]

export default function BookingSection() {
  return (
    <section id="booking" className="py-20 bg-green-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block bg-amber-400/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-amber-400/30">
            Free Consultation
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Schedule a Time That Works for You
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Pick a day and we will come to your property for a free, no-pressure estimate.
            Appointments sync automatically with Google Calendar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left - Steps */}
          <div className="space-y-8">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="w-11 h-11 rounded-full bg-amber-400 text-green-950 font-black text-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-400/30">
                  {item.step}
                </div>
                <div>
                  <div className="text-white font-semibold text-lg mb-1">{item.title}</div>
                  <div className="text-green-300 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}

            <div className="pt-2 space-y-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-green-950 font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-400/30 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book My Free Consultation
              </a>
              <p className="text-green-400 text-sm">
                Prefer to call or text?{' '}
                <a href="tel:8054782466" className="text-amber-400 font-bold hover:text-amber-300">
                  (805) 478-2466
                </a>
              </p>
            </div>
          </div>

          {/* Right - Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-green-700 px-6 py-5 flex items-center gap-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-white font-bold">Wild Roots Consultation</div>
                <div className="text-green-200 text-xs">Free, no-obligation estimate</div>
              </div>
            </div>

            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">Schedule Online</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Pick a time slot on our live calendar. You will receive an automatic confirmation
                and reminder via email.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-base"
              >
                View Available Times
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5 22h-15A2.5 2.5 0 012 19.5v-13A2.5 2.5 0 014.5 4H6V2h2v2h8V2h2v2h1.5A2.5 2.5 0 0122 6.5v13a2.5 2.5 0 01-2.5 2.5zm-15-2h15a.5.5 0 00.5-.5V10H4v9.5a.5.5 0 00.5.5zm15-14H4.5a.5.5 0 00-.5.5V8h16V6.5a.5.5 0 00-.5-.5z" />
                </svg>
                Syncs with Google Calendar automatically
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
