import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

// Load the form client-side only so browser extensions never cause a mismatch
const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false })

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
