import { Header, Hero, About, Services, Testimonials, CTA, Footer } from '@/components'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
