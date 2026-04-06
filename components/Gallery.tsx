const photos = [
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Beautiful green lawn after mowing',
    label: 'Lawn Mowing',
  },
  {
    src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
    alt: 'Landscape design with flowers and shrubs',
    label: 'Landscape Design',
  },
  {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    alt: 'Garden maintenance in progress',
    label: 'Garden Care',
  },
  {
    src: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=600&q=80',
    alt: 'Stone patio hardscaping',
    label: 'Hardscaping',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
    alt: 'Lush backyard landscaping',
    label: 'Full Backyard',
  },
  {
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80',
    alt: 'Tree trimming and pruning',
    label: 'Tree Trimming',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Our Work</h2>
        <p className="section-subtitle">
          A glimpse at some of the yards we&apos;ve transformed. Your yard could be next.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.alt}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">{photo.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">Want results like these for your property?</p>
          <a href="#contact" className="btn-primary">
            Request a Free Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
