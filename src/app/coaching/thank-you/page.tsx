'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/AnimatedSection'

const packageInfo = {
  activation: {
    name: 'Activation Meeting',
    title: 'Your Activation Meeting is Confirmed!',
    description: 'Get ready for a focused 45-minute session where we\'ll map out your goals and create a clear path forward.',
    nextSteps: [
      'Check your email for calendar invite',
      'Prepare your top 3 questions or challenges',
      'Find a quiet space for our video call',
      'Come ready to dream big and get specific',
    ],
    resources: [
      { title: 'Beyond Your Default Podcast', url: 'https://beyondyourdefault.com', description: 'Listen to episodes on personal transformation' },
      { title: 'Hub Heroes Podcast', url: 'https://hubheroes.com', description: 'Marketing and HubSpot insights' },
    ],
  },
  starter: {
    name: 'Starter Package',
    title: 'Welcome to Your Coaching Journey!',
    description: 'You\'ve taken the first step with 10 hours of transformation coaching. Let\'s make every session count.',
    nextSteps: [
      'Check your email for welcome materials',
      'Complete the pre-coaching assessment (sent via email)',
      'Book your first session using the scheduling link',
      'Join the private coaching community',
    ],
    resources: [
      { title: 'Coaching Preparation Guide', url: '#', description: 'How to get the most from each session' },
      { title: 'Goal Setting Worksheet', url: '#', description: 'Clarify your objectives before we begin' },
    ],
  },
  growth: {
    name: 'Growth Package',
    title: 'Your Transformation Begins Now!',
    description: 'With 20 hours of coaching, we have the space for real, lasting change. Welcome to your growth journey.',
    nextSteps: [
      'Check your email for welcome materials',
      'Complete the comprehensive pre-coaching assessment',
      'Schedule your first three sessions',
      'Join the private coaching community',
      'Access your custom resource library',
    ],
    resources: [
      { title: 'Growth Roadmap Template', url: '#', description: 'Plan your 20-hour journey' },
      { title: 'Weekly Reflection Journal', url: '#', description: 'Track insights between sessions' },
      { title: 'Private Community Access', url: '#', description: 'Connect with fellow growth-seekers' },
    ],
  },
  transformation: {
    name: 'Transformation Package',
    title: 'The Deep Work Begins!',
    description: 'You\'ve committed to 30 hours of transformative coaching. This is where real change happens. Welcome to the journey.',
    nextSteps: [
      'Check your email for VIP welcome package',
      'Complete the in-depth transformation assessment',
      'Schedule your first month of weekly sessions',
      'Join the private coaching community',
      'Access your comprehensive resource library',
      'Prepare for your bonus keynote consultation',
    ],
    resources: [
      { title: 'Transformation Roadmap', url: '#', description: 'Your 30-hour journey mapped out' },
      { title: 'Weekly Reflection + Action Journal', url: '#', description: 'Track progress and momentum' },
      { title: 'VIP Resource Library', url: '#', description: 'Exclusive frameworks and tools' },
      { title: 'Private Community Access', url: '#', description: 'VIP channel for deeper discussions' },
    ],
  },
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const purchaseType = searchParams.get('purchased') || 'activation'
  const name = searchParams.get('name') || ''

  const info = packageInfo[purchaseType as keyof typeof packageInfo] || packageInfo.activation

  return (
    <>
      <section className="page-hero page-hero--thank-you">
        <div className="container">
          <AnimatedSection className="thank-you-header" animation="fade-in">
            <div className="thank-you-header__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h1 className="thank-you-header__title">
              {name ? `${name}, ` : ''}{info.title}
            </h1>
            <p className="thank-you-header__description">{info.description}</p>
          </AnimatedSection>
        </div>
        <div className="page-hero__shape" aria-hidden="true"></div>
      </section>

      <section className="section thank-you-content">
        <div className="container container--narrow">
          <div className="thank-you-grid">
            <AnimatedSection className="thank-you-card" animation="fade-in">
              <h2 className="thank-you-card__title">
                <span className="thank-you-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </span>
                Next Steps
              </h2>
              <ol className="thank-you-steps">
                {info.nextSteps.map((step, index) => (
                  <li key={index}>
                    <span className="thank-you-steps__number">{index + 1}</span>
                    <span className="thank-you-steps__text">{step}</span>
                  </li>
                ))}
              </ol>
            </AnimatedSection>

            <AnimatedSection className="thank-you-card" animation="fade-in">
              <h2 className="thank-you-card__title">
                <span className="thank-you-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </span>
                Resources for You
              </h2>
              <div className="thank-you-resources">
                {info.resources.map((resource, index) => (
                  <a key={index} href={resource.url} className="thank-you-resource">
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <span className="thank-you-resource__arrow">&rarr;</span>
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="thank-you-cta" animation="fade-in">
            <div className="thank-you-quote">
              <blockquote>
                &quot;I&apos;m not here to be the hero of your story. I&apos;m here to be the sidekick
                that helps you become the superhuman you were meant to be.&quot;
              </blockquote>
              <cite>George B. Thomas</cite>
            </div>

            <div className="thank-you-actions">
              <Link href="/expertise" className="btn btn--secondary">
                Explore My Expertise
              </Link>
              <a href="mailto:george@georgebthomas.com" className="btn btn--secondary">
                Have Questions? Email Me
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={
          <div className="page-hero page-hero--thank-you">
            <div className="container" style={{textAlign: 'center', padding: '4rem 0'}}>
              Loading...
            </div>
          </div>
        }>
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
