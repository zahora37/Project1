const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Scottsdale, AZ',
    stars: 5,
    text: "Wild Roots completely transformed our backyard. We went from a patchy mess to a beautiful desert landscape with a stone walkway and agave beds. The team was professional, on time, and the results exceeded our expectations. We get compliments from neighbors constantly now!",
    service: 'Landscape Design & Hardscaping',
  },
  {
    name: 'James T.',
    location: 'Gilbert, AZ',
    stars: 5,
    text: "I had Wild Roots install artificial turf in my front and back yard. Best decision I ever made. Zero maintenance, always green, and my water bill dropped significantly. Their crew was clean, fast, and respectful of our property.",
    service: 'Artificial Turf Installation',
  },
  {
    name: 'Linda & Bob K.',
    location: 'Mesa, AZ',
    stars: 5,
    text: "After getting quotes from three companies, we went with Wild Roots for our irrigation system. Best decision we made! Our water bill dropped significantly and the yard has never looked healthier. Their AI chat on the website was actually really helpful for getting initial info.",
    service: 'Irrigation System',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">
          Real reviews from real neighbors. We let our work — and our customers — speak for us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col"
            >
              <StarRating count={t.stars} />
              <blockquote className="mt-4 text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t.location}</div>
                <div className="text-xs text-green-600 font-medium mt-1">{t.service}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-green-50 px-6 py-3 rounded-full">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-gray-900">5.0</span>
            <span className="text-gray-500 text-sm">· Based on 120+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
