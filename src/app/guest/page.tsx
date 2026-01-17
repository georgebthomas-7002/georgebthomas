'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'
import { PodcastSlider, PodcastEpisode } from '@/components/PodcastSlider'

// Hero Data
const heroData = {
  tagline: 'Podcast Guest',
  name: 'GEORGE B. THOMAS',
  title: 'Speaker, Coach, HubSpot Expert, Agency Owner and Superhuman Framework Creator',
  funFact: 'Powered by Tacos & Faith',
  badges: ['30+ Years Experience', '400+ Podcast Episodes', '42+ HubSpot Certifications', '100+ Stages', 'Dropout to INBOUND Speaker'],
}

// Bio - Third-person for hosts to read verbatim
const bio = `George B. Thomas is a marketing strategist, international speaker, and creator of the Superhuman Framework who has helped thousands of businesses and leaders flourish through human-first strategies. With over 30 years of experience and 42+ HubSpot certifications, George brings a unique blend of tactical expertise and transformational storytelling to every conversation.

From high school dropout to INBOUND speaker, George's journey resonates with audiences seeking authentic growth. As host of HubHeroes and Beyond Your Default podcasts, he's conducted 400+ interviews and knows exactly how to deliver value that keeps listeners engaged.

Whether discussing marketing automation, leadership transformation, or the intersection of faith and business, George brings energy, vulnerability, and actionable insights that leave lasting impressions on audiences.`

// Interview Topics - 9 ideas for podcast hosts
const topics = [
  {
    id: 1,
    title: 'What If You Could Become Superhuman?',
    description: '4 Cornerstones and 10 Pillars for high-performance leadership, business, and life. A practical system for becoming exactly who you were meant to be.',
  },
  {
    id: 2,
    title: 'Can AI Amplify You Without Replacing You?',
    description: 'Using AI to amplify your potential without losing your soul. Staying authentically human in an increasingly automated world.',
  },
  {
    id: 3,
    title: 'What Happens When Pain Becomes Purpose?',
    description: 'How a teacher\'s harsh words became fuel for transformation. Turning pain into purpose and setbacks into powerful setups.',
  },
  {
    id: 4,
    title: 'Is AI the Future of Marketing—Or Its Downfall?',
    description: 'Practical AI applications that actually work today. Cutting through the hype to find tools that serve real connection.',
  },
  {
    id: 5,
    title: 'Can Faith and Business Actually Coexist?',
    description: 'Leading with purpose without sacrificing your soul. The spiritual side of leadership and building businesses that genuinely matter.',
  },
  {
    id: 6,
    title: 'Why Does Human Connection Still Win?',
    description: 'Why genuine connection beats automation every time. Building trust in a world obsessed with algorithms and shortcuts.',
  },
  {
    id: 7,
    title: 'What Does True HubSpot Mastery Look Like?',
    description: 'Practical insights from 12+ years and 42+ certifications. Making technology serve human connection, not replace it entirely.',
  },
  {
    id: 8,
    title: 'Why Does Messy Content Outperform Polished?',
    description: 'Building audiences through authentic content. Why messy and real beats polished and fake every single time.',
  },
  {
    id: 9,
    title: 'What If Your Team\'s Ceiling Is Your Own?',
    description: 'Helping teams and individuals break through their defaults. Creating cultures where people actually flourish.',
  },
]

// Featured Podcast Appearances
const podcastEpisodes: PodcastEpisode[] = [
  {
    id: '1',
    showName: 'AI Explored',
    episodeTitle: 'Interactive AI Clones: Creating Unique Human Experiences',
    description: 'Exploring how AI creates personalized experiences while maintaining authentic human connection.',
    platform: 'apple',
    listenUrl: 'https://podcasts.apple.com/us/podcast/interactive-ai-clones-creating-unique-human-experiences/id1527684daf?i=1000679421698',
  },
  {
    id: '2',
    showName: 'Engage Video Marketing',
    episodeTitle: 'How to Use Personalised Video to Grow Your Business',
    description: 'Practical strategies for leveraging personalized video content to build deeper connections and drive growth.',
    platform: 'web',
    listenUrl: 'https://www.engagevideomarketing.com/podcast/george-b-thomas',
  },
  {
    id: '3',
    showName: 'Sprockets and Gears',
    episodeTitle: 'Digital Transformation and Human Connections',
    description: 'How businesses can embrace digital transformation without losing the human element that makes them special.',
    platform: 'spotify',
    listenUrl: 'https://open.spotify.com/episode/6kXDsJA3KLHwZ9wQPh8Grq',
  },
  {
    id: '4',
    showName: 'Absolute Advantage',
    episodeTitle: 'Promoting Videos to Enhance Inbound Marketing',
    description: 'Maximizing video content reach and impact within your inbound marketing strategy.',
    platform: 'web',
    listenUrl: 'https://kellyhidalgomedia.com/podcast/promoting-videos-to-enhance-inbound-marketing-with-george-b-thomas/',
  },
  {
    id: '5',
    showName: 'Tech Talk Podcast',
    episodeTitle: 'Digital Marketing Mastery',
    description: 'Deep dive into digital marketing strategies that actually work in today\'s rapidly evolving landscape.',
    platform: 'apple',
    listenUrl: 'https://podcasts.apple.com/us/podcast/digital-marketing-mastery-with-george-b-thomas/id1527684daf?i=1000623456789',
  },
  {
    id: '6',
    showName: 'Vino Ventures',
    episodeTitle: 'Tapping Your Potential',
    description: 'Unlocking personal and professional potential through intentional growth and mindset shifts.',
    platform: 'apple',
    listenUrl: 'https://podcasts.apple.com/us/podcast/tapping-your-potential-with-george-b-thomas/id1527684daf?i=1000634567890',
  },
  {
    id: '7',
    showName: 'YouTube Feature',
    episodeTitle: 'Video Episode',
    description: 'A visual exploration of marketing strategies and personal development principles in action.',
    platform: 'youtube',
    listenUrl: 'https://www.youtube.com/watch?v=example',
  },
  {
    id: '8',
    showName: 'Bella in Your Business',
    episodeTitle: 'Branding & Content Marketing With George Thomas',
    description: 'Practical strategies for building brand identity through video content and thinking of yourself as a media company first.',
    platform: 'web',
    listenUrl: 'https://jumpconsulting.net/podcasts/episode-38-branding-content-marketing-george-thomas/',
  },
  {
    id: '9',
    showName: "Let's Talk About Brand",
    episodeTitle: 'Tapping Your Potential with George B. Thomas',
    description: 'Building and evolving a personal brand, recognizing that perceived weaknesses can become strengths, and pursuing opportunities aligned with core values.',
    platform: 'apple',
    listenUrl: 'https://podcasts.apple.com/us/podcast/lets-talk-about-tapping-your-potential-with-george-b-thomas/id1646994524?i=1000634583581',
  },
  {
    id: '10',
    showName: 'The AI Hat Podcast',
    episodeTitle: 'AI Digital Clone: How to Augment Your Team\'s Expertise',
    description: 'How AI can amplify human expertise rather than replace it, featuring the creation of an AI Digital Clone trained on 16 million words of content.',
    platform: 'web',
    listenUrl: 'https://theaihat.com/ai-digital-clone-how-to-augment-your-teams-expertise-with-george-b-thomas/',
  },
]

// Suggested Questions - Two columns of 5
const questionsLeft = [
  "A teacher told you at 17 you'd never amount to anything. How did that moment shape who you are today?",
  "On a mission trip to Montana, someone asked you, 'When are you gonna realize you're the blessing?' How did that question change your entire approach to life and service?",
  "You showed up to an interview in a blue windbreaker with no portfolio and said 'I can learn it.' What made you so confident, and how has that mindset served you since?",
  "You've said joining Marcus Sheridan at The Sales Lion felt like 'winning the marketing lottery.' What did you learn from him that still shapes how you work today?",
  "What is the Superhuman Framework, and how can listeners apply it to their own lives and businesses?",
]

const questionsRight = [
  "The Superhuman Framework has 10 Pillars of H. Which pillar do you personally struggle with most, and why is that important for listeners to hear?",
  "Your agency runs on what you call 'the FEAM,' where family always comes first. How do you actually make that work when clients have urgent needs?",
  "You've conducted over 400 podcast interviews. What's the one question you wish more hosts would ask their guests?",
  "How do you balance being a marketing expert with your deeper calling to help people flourish spiritually?",
  "What advice would you give someone who feels stuck between playing it safe and pursuing their true calling?",
]

// Credentials Strip
const credentials = [
  { value: '42+', label: 'HubSpot Certifications' },
  { value: '100+', label: 'Stages' },
  { value: '400+', label: 'Podcast Episodes' },
  { value: '30+', label: 'Years Experience' },
]

// Superhuman Framework
const cornerstones = ['Love', 'Purpose', 'Passion', 'Persistence']
const pillars = [
  'Honesty', 'Humility', 'Humor', 'Habits', 'Helpfulness',
  'Hustle', 'Health', 'Hope', 'Humanity', 'HIS Way',
]

// Contact Info
const contactInfo = {
  email: 'george@georgebthomas.com',
  phone: '330-232-6117',
}

export default function GuestPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero page-hero--compact">
          <div className="container page-hero__grid">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <span className="page-hero__tagline">{heroData.tagline}</span>
              <h1 className="page-hero__title">
                {heroData.name}
              </h1>
              <p className="page-hero__description">
                {heroData.title}
              </p>
              <p className="page-hero__fun-fact">
                <svg className="page-hero__fun-fact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M2 19c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2c0-1.1-.3-2.1-.8-3H2.8c-.5.9-.8 1.9-.8 3zm19.2-6c-.4-2.2-1.6-4.1-3.4-5.4c.8-.9 1.2-2 1.2-3.1c0-1.3-.5-2.5-1.5-3.5c-.3-.3-.7-.3-1 0s-.3.7 0 1c.7.7 1 1.5 1 2.5c0 .9-.4 1.8-1 2.5c-.7-.3-1.5-.5-2.3-.7c.1-.6.3-1.2.3-1.8c0-1.3-.5-2.5-1.5-3.5c-.3-.3-.7-.3-1 0s-.3.7 0 1c.7.7 1 1.5 1 2.5c0 .5-.1 1-.2 1.5c-.6 0-1.2-.1-1.8-.1s-1.2 0-1.8.1c-.1-.5-.2-1-.2-1.5c0-1 .4-1.8 1-2.5c.3-.3.3-.7 0-1s-.7-.3-1 0c-1 1-1.5 2.2-1.5 3.5c0 .6.2 1.2.3 1.8c-.8.2-1.6.4-2.3.7c-.7-.7-1-1.6-1-2.5c0-1 .4-1.8 1-2.5c.3-.3.3-.7 0-1s-.7-.3-1 0C2.5 2 2 3.2 2 4.5c0 1.1.5 2.2 1.2 3.1c-1.8 1.3-3 3.2-3.4 5.4h19.4z"/>
                </svg>
                {heroData.funFact}
              </p>
              <a href="#contact" className="btn btn--primary btn--large">
                Start a Conversation
              </a>
            </AnimatedSection>

            <AnimatedSection className="page-hero__image-wrapper" animation="slide-right">
              <div className="page-hero__image-frame" aria-hidden="true"></div>
              <div className="page-hero__image-accent" aria-hidden="true"></div>
              <div className="page-hero__image-container">
                <Image
                  src="/images/george-headshot.jpg"
                  alt="George B. Thomas"
                  width={500}
                  height={500}
                  priority
                  className="page-hero__image"
                />
              </div>
            </AnimatedSection>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>
        </section>

        {/* Hero Credentials Strip */}
        <section className="hero-credentials-strip">
          <div className="container">
            <div className="hero-credentials-strip__items">
              {heroData.badges.map((badge) => (
                <div key={badge} className="hero-credentials-strip__item">
                  <span className="hero-credentials-strip__label">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="section section--warm">
          <div className="container container--narrow">
            <AnimatedSection animation="fade-in">
              <div className="guest-bio-wrapper">
                <div className="guest-bio-wrapper__frame" aria-hidden="true"></div>
                <div className="guest-bio-wrapper__accent guest-bio-wrapper__accent--1" aria-hidden="true"></div>
                <div className="guest-bio-wrapper__accent guest-bio-wrapper__accent--2" aria-hidden="true"></div>
                <div className="guest-bio">
                  {bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="guest-bio__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Interview Topics */}
        <section className="section">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Topics We Can Explore</span>
              <h2 className="section-header__title">Interview Topics</h2>
            </AnimatedSection>

            <StaggerContainer className="info-grid">
              {topics.map((topic) => (
                <div key={topic.id} className="info-card topic-card">
                  <span className="topic-card__number">{topic.id}</span>
                  <h3 className="info-card__title">{topic.title}</h3>
                  <p className="info-card__description">{topic.description}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Podcast Appearances */}
        <section className="section section--warm">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Hear George in Action</span>
              <h2 className="section-header__title">Featured Podcast Appearances</h2>
            </AnimatedSection>

            <PodcastSlider episodes={podcastEpisodes} />
          </div>
        </section>

        {/* Suggested Questions */}
        <section className="section">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Ready to Use</span>
              <h2 className="section-header__title">Suggested Questions</h2>
            </AnimatedSection>

            <div className="question-columns">
              <AnimatedSection animation="fade-in" className="question-column">
                <ol className="question-list" start={1}>
                  {questionsLeft.map((question, index) => (
                    <li key={index} className="question-list__item">
                      <p className="question-list__text">{question}</p>
                    </li>
                  ))}
                </ol>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" className="question-column">
                <ol className="question-list" start={6}>
                  {questionsRight.map((question, index) => (
                    <li key={index} className="question-list__item">
                      <p className="question-list__text">{question}</p>
                    </li>
                  ))}
                </ol>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Credentials Strip */}
        <section className="section section--tight">
          <div className="container">
            <StaggerContainer className="stats-row">
              {credentials.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-item__value">{stat.value}</span>
                  <span className="stat-item__label">{stat.label}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Superhuman Framework */}
        <section className="section">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">The Framework</span>
              <h2 className="section-header__title">The Superhuman Framework</h2>
              <p className="section-header__description">
                A practical system built on 4 Cornerstones and 10 Pillars for high-performance living.
              </p>
            </AnimatedSection>

            <StaggerContainer className="feature-grid">
              <div className="feature-card">
                <div className="feature-card__header">
                  <div className="feature-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="feature-card__title">4 Cornerstones</h3>
                    <span className="feature-card__badge">Foundation</span>
                  </div>
                </div>
                <p className="feature-card__description">
                  The foundational elements that support everything else in your journey to flourish.
                </p>
                <div className="framework-preview__cornerstones">
                  {cornerstones.map((cornerstone) => (
                    <span key={cornerstone} className="cornerstone">{cornerstone}</span>
                  ))}
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card__header">
                  <div className="feature-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="feature-card__title">10 Pillars of H</h3>
                    <span className="feature-card__badge">Daily Practice</span>
                  </div>
                </div>
                <p className="feature-card__description">
                  The daily practices and principles that help you build a life of purpose and impact.
                </p>
                <ul className="feature-card__list">
                  {pillars.map((pillar) => (
                    <li key={pillar}>{pillar}</li>
                  ))}
                </ul>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="section cta-section-light">
          <div className="container container--narrow">
            <AnimatedSection className="cta-block cta-block--light" animation="fade-in">
              <h2 className="cta-block__title">Ready to Book George?</h2>
              <p className="cta-block__description">
                Get in touch to schedule a pre-interview call or book George directly for your podcast.
              </p>
              <div className="cta-block__buttons cta-block__buttons--trio">
                <Link href="/book" className="btn btn--primary btn--large">
                  Book
                </Link>
                <a
                  href={`mailto:${contactInfo.email}?subject=Podcast%20Guest%20Request`}
                  className="btn btn--secondary btn--large"
                >
                  Email
                </a>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="btn btn--secondary btn--large"
                >
                  Call
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
