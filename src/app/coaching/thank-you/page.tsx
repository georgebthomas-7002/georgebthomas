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
    title: 'You\'re All Set—Let\'s Do This!',
    description: 'I can\'t wait for our 45-minute session together. We\'ll map out your goals and create a clear path forward—just you and me, focused on what matters most to you.',
    nextSteps: [
      'You\'ll get a calendar invite in your inbox shortly',
      'Jot down your top 3 questions or challenges—we\'ll tackle them together',
      'Find a quiet spot for our video call',
      'Come ready to dream big—I\'ll help you get specific',
    ],
    resources: [
      { title: 'Beyond Your Default Podcast', url: 'https://beyondyourdefault.com', description: 'Get inspired while you wait—episodes on personal transformation' },
      { title: 'Hub Heroes Podcast', url: 'https://hubheroes.com', description: 'Marketing and HubSpot insights you\'ll love' },
    ],
  },
  starter: {
    name: 'Starter Package',
    title: 'Welcome—Your Journey Starts Now!',
    description: 'You\'ve made an amazing decision. With 10 hours of coaching, we\'ve got space to make real progress. I\'m excited to work with you!',
    nextSteps: [
      'You\'ll find your welcome materials in your inbox',
      'Complete the pre-coaching assessment I\'ve sent you—it helps me understand you better',
      'Book your first session using the scheduling link',
      'Join our private coaching community—you\'re part of the family now',
    ],
    resources: [
      { title: 'Coaching Preparation Guide', url: '#', description: 'Here\'s how to get the most from each session' },
      { title: 'Goal Setting Worksheet', url: '#', description: 'You\'ll use this to clarify your objectives before we begin' },
    ],
  },
  growth: {
    name: 'Growth Package',
    title: 'This Is Your Moment—Let\'s Go!',
    description: 'With 20 hours together, we\'ve got the space for real, lasting change. I\'m honored you\'re trusting me with this—let\'s make it count!',
    nextSteps: [
      'Check your inbox for your welcome materials',
      'You\'ll find a comprehensive assessment waiting—it helps us hit the ground running',
      'Go ahead and schedule your first three sessions',
      'Join our private community—you\'ll connect with fellow growth-seekers',
      'You now have access to your custom resource library',
    ],
    resources: [
      { title: 'Growth Roadmap Template', url: '#', description: 'You\'ll use this to plan your 20-hour journey' },
      { title: 'Weekly Reflection Journal', url: '#', description: 'Track your insights and wins between sessions' },
      { title: 'Private Community Access', url: '#', description: 'You\'re not alone—connect with others on the same path' },
    ],
  },
  transformation: {
    name: 'Transformation Package',
    title: 'The Deep Work Begins—I\'m So Excited!',
    description: 'You\'ve committed to 30 hours of transformative coaching. This is where real change happens—and I\'m honored to walk this path with you.',
    nextSteps: [
      'Your VIP welcome package is waiting in your inbox',
      'You\'ll find an in-depth assessment there—it sets us up for success',
      'Schedule your first month of weekly sessions',
      'Join our private community—you\'ve got VIP access',
      'Explore your comprehensive resource library',
      'Don\'t forget—your bonus keynote consultation is included!',
    ],
    resources: [
      { title: 'Transformation Roadmap', url: '#', description: 'Your complete 30-hour journey, mapped out step by step' },
      { title: 'Weekly Reflection + Action Journal', url: '#', description: 'You\'ll track your progress and build momentum here' },
      { title: 'VIP Resource Library', url: '#', description: 'Exclusive frameworks and tools—just for you' },
      { title: 'Private Community Access', url: '#', description: 'Your VIP channel for deeper discussions' },
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
                Here's What to Do Next
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
                Resources You'll Love
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
                "I'm not here to be the hero of your story. I'm here to be the sidekick
                that helps you become the superhuman you were meant to be."
              </blockquote>
              <cite>George B. Thomas</cite>
            </div>

            <div className="thank-you-actions">
              <Link href="/expertise" className="btn btn--secondary">
                See What You'll Master
              </Link>
              <a href="mailto:george@georgebthomas.com" className="btn btn--secondary">
                Got Questions? Let's Talk
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
      <main id="main-content">
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
