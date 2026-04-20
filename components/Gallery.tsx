const photos = [
  {
    src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
    alt: 'Artificial turf installation in Arizona backyard',
    label: 'Artificial Turf',
  },
  {
    src: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
    alt: 'Paver patio with desert plants and outdoor seating',
    label: 'Paver Installation',
  },
  {
    src: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&q=80',
    alt: 'Saguaro cactus and desert landscape Arizona',
    label: 'Desert Landscaping',
  },
  {
    src: 'https://images.unsplash.com/photo-1601760562234-9814eea6db90?w=600&q=80',
    alt: 'Drip irrigation system in Arizona desert garden',
    label: 'Irrigation Systems',
  },
  {
    src: 'https://images.unsplash.com/photo-1526628953301-3cd40e5a4638?w=600&q=80',
    alt: 'Arizona desert rock and gravel landscape',
    label: 'Rock Landscaping',
  },
  {
    src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    alt: 'Desert succulent and agave garden maintenance',
    label: 'Desert Garden Care',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Our Work</h2>
        <p className="section-subtitle">
          Arizona desert landscaping done right. Your yard could be next.
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
