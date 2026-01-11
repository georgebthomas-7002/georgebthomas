'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection, StaggerContainer } from '@/components/AnimatedSection'
import { VideoSlider, VideoItem } from '@/components/VideoSlider'
import { VideoShowcase } from '@/components/VideoShowcase'

// Speaking example videos - add more YouTube IDs here
const speakingVideos: VideoItem[] = [
  {
    id: 'vid-1',
    youtubeId: 'LyLWZ4sF8uc',
    title: 'Speaker Reel Highlights',
    description: 'A compilation of keynote moments and audience engagement.'
  },
  {
    id: 'vid-2',
    youtubeId: '7rlGBDLHjQ4',
    title: 'How to be WORLD CLASS at HubSpot',
    description: 'INBOUND presentation on mastering the HubSpot platform.'
  },
  {
    id: 'vid-3',
    youtubeId: 'E9EO_5jYk-M',
    title: 'The World Has Changed',
    description: 'Insights on adapting to the evolving digital landscape.'
  },
  {
    id: 'vid-4',
    youtubeId: 'aFWRGqXwxDU',
    title: 'Social Media Breakfast - Madison',
    description: 'Live presentation on social media strategy and engagement.'
  },
]

type Topic = 'hubspot' | 'video' | 'podcasting' | 'ai' | 'transformation' | 'marketing'

interface Keynote {
  id: string
  topic: Topic
  title: string
  description: string
  whatYouLearn: string[]
  whoItsFor: string[]
  url?: string
  external?: boolean
}

const topics: { id: Topic; label: string; color: string }[] = [
  { id: 'hubspot', label: 'HubSpot', color: '#ff7a59' },
  { id: 'video', label: 'Video Marketing', color: '#00bda5' },
  { id: 'podcasting', label: 'Podcasting', color: '#6a4c93' },
  { id: 'ai', label: 'AI & Technology', color: '#0077b6' },
  { id: 'transformation', label: 'Transformation', color: '#f77f00' },
  { id: 'marketing', label: 'Marketing & Sales', color: '#2d4a6f' },
]

const keynotes: Keynote[] = [
  // HubSpot Keynotes (6)
  {
    id: 'hs-1',
    topic: 'hubspot',
    title: 'The HubSpot Advantage: Beyond Software to Strategy',
    description: 'Discover why HubSpot isn\'t just a CRM. It\'s a complete growth operating system. Learn how to leverage the full ecosystem to transform your business operations and customer relationships.',
    whatYouLearn: [
      'How to align marketing, sales, and service on one platform',
      'The flywheel methodology in action',
      'Automation strategies that save 20+ hours weekly',
      'Integration patterns that 10x your efficiency',
    ],
    whoItsFor: ['Marketing leaders', 'Sales directors', 'Operations managers', 'Business owners evaluating CRM solutions'],
  },
  {
    id: 'hs-2',
    topic: 'hubspot',
    title: 'From Zero to HubSpot Hero: The Implementation Playbook',
    description: 'You\'ll discover the exact framework for successful HubSpot implementations that actually stick—built from 12+ years and 42+ certifications of hands-on experience.',
    whatYouLearn: [
      'The 90-day implementation roadmap',
      'Common pitfalls that derail 80% of implementations',
      'Change management strategies for team adoption',
      'How to measure and prove ROI within 6 months',
    ],
    whoItsFor: ['New HubSpot customers', 'Implementation teams', 'HubSpot partners', 'C-suite decision makers'],
  },
  {
    id: 'hs-3',
    topic: 'hubspot',
    title: 'Revenue Operations: The HubSpot RevOps Revolution',
    description: 'Break down silos and create a unified revenue machine. This talk explores how HubSpot enables true RevOps alignment across your entire organization.',
    whatYouLearn: [
      'The RevOps framework for growth',
      'Building unified reporting dashboards',
      'SLA creation between marketing and sales',
      'Lifecycle stage optimization tactics',
    ],
    whoItsFor: ['RevOps professionals', 'Sales operations managers', 'Growth leaders', 'CFOs seeking predictable revenue'],
  },
  {
    id: 'hs-4',
    topic: 'hubspot',
    title: 'HubSpot Automation Mastery: Work Smarter, Grow Faster',
    description: 'Unlock the true power of HubSpot workflows, sequences, and automation. From lead nurturing to customer success, learn to automate without losing the human touch.',
    whatYouLearn: [
      'Advanced workflow architecture patterns',
      'Personalization at scale strategies',
      'Behavioral trigger optimization',
      'When to automate vs. when to stay human',
    ],
    whoItsFor: ['Marketing automation specialists', 'Demand generation teams', 'Customer success managers', 'Anyone overwhelmed by manual tasks'],
  },
  {
    id: 'hs-5',
    topic: 'hubspot',
    title: 'The Inbound Evolution: What\'s Next for HubSpot',
    description: 'You\'ll get insider perspectives—from every INBOUND since 2015—on where HubSpot\'s heading and how to prepare your organization for what\'s next.',
    whatYouLearn: [
      'Emerging HubSpot features to watch',
      'AI integration opportunities',
      'The future of customer-centric business',
      'How to future-proof your HubSpot investment',
    ],
    whoItsFor: ['HubSpot power users', 'Partner agencies', 'Tech-forward marketers', 'Innovation leaders'],
  },
  {
    id: 'hs-6',
    topic: 'hubspot',
    title: 'Building a HubSpot Culture: Team Adoption That Lasts',
    description: 'Technology only works when people use it. Learn the psychology and methodology behind creating a team culture that embraces HubSpot as their daily operating system.',
    whatYouLearn: [
      'The adoption psychology framework',
      'Training programs that actually work',
      'Gamification strategies for engagement',
      'Measuring and improving usage metrics',
    ],
    whoItsFor: ['HR and training leaders', 'Team managers', 'HubSpot administrators', 'Change management professionals'],
  },

  // Video Marketing Keynotes (6)
  {
    id: 'vid-1',
    topic: 'video',
    title: 'Embrace the Messy: Authentic Video That Converts',
    description: 'You\'ll learn why authentic, imperfect video outperforms polished productions—and how to create videos that genuinely connect with your audience.',
    whatYouLearn: [
      'Why authenticity beats production value',
      'The 80/20 rule of video creation',
      'Overcoming camera fear and perfectionism',
      'Building genuine viewer connections',
    ],
    whoItsFor: ['Marketers afraid of video', 'Small teams with limited resources', 'Personal brands', 'Anyone holding back from pressing record'],
  },
  {
    id: 'vid-2',
    topic: 'video',
    title: 'Video Strategy That Scales: From 1 to 1000 Videos',
    description: 'You\'ll learn the systems and strategies behind creating thousands of videos. This isn\'t about working harder—it\'s about building a sustainable video machine for your team.',
    whatYouLearn: [
      'Content batching frameworks',
      'Repurposing strategies for maximum ROI',
      'Team workflows and delegation systems',
      'Technology stack for efficient production',
    ],
    whoItsFor: ['Content teams', 'Marketing directors', 'Agency owners', 'In-house video producers'],
  },
  {
    id: 'vid-3',
    topic: 'video',
    title: 'Sales Video Mastery: Close Deals With Personalized Video',
    description: 'Transform your sales process with the power of personalized video. Learn the techniques that have helped sales teams increase response rates by 300%+.',
    whatYouLearn: [
      'The psychology of video in sales',
      'Personalization techniques that work',
      'Optimal video length and format by sales stage',
      'Tracking and measuring video performance',
    ],
    whoItsFor: ['Sales professionals', 'Account executives', 'BDRs and SDRs', 'Sales managers'],
  },
  {
    id: 'vid-4',
    topic: 'video',
    title: 'YouTube for Business: Building Authority Through Video',
    description: 'YouTube isn\'t just for entertainment. It\'s the world\'s second-largest search engine. Learn how to leverage YouTube to build authority and drive business results.',
    whatYouLearn: [
      'YouTube SEO fundamentals',
      'Content strategy for B2B success',
      'Thumbnail and title optimization',
      'Building community and engagement',
    ],
    whoItsFor: ['B2B marketers', 'Thought leaders', 'Educators and trainers', 'Anyone building an audience'],
  },
  {
    id: 'vid-5',
    topic: 'video',
    title: 'Live Video & Webinars: Engaging Audiences in Real-Time',
    description: 'Master the art of live video to create urgency, engagement, and connection. From webinars to live streams, learn to command attention in real-time.',
    whatYouLearn: [
      'Live video best practices and preparation',
      'Engagement techniques during live broadcasts',
      'Technical setup for professional results',
      'Converting live viewers to customers',
    ],
    whoItsFor: ['Webinar hosts', 'Community managers', 'Educators', 'Anyone hosting virtual events'],
  },
  {
    id: 'vid-6',
    topic: 'video',
    title: 'The Video-First Future: Preparing Your Organization',
    description: 'Video is no longer optional. It\'s essential. This forward-looking keynote prepares organizations for a future where video is the primary communication medium.',
    whatYouLearn: [
      'The shift to video-first communication',
      'Building internal video capabilities',
      'Training teams on video creation',
      'Measuring video\'s impact on business goals',
    ],
    whoItsFor: ['C-suite executives', 'Digital transformation leaders', 'Communications directors', 'Future-focused organizations'],
  },

  // Podcasting Keynotes (6)
  {
    id: 'pod-1',
    topic: 'podcasting',
    title: 'Podcast Launch Blueprint: From Idea to First 10 Episodes',
    description: 'You\'ll get the exact blueprint for launching a podcast that builds audience and authority from day one—built from 400+ episodes across multiple shows.',
    whatYouLearn: [
      'Defining your podcast\'s unique position',
      'Technical setup and equipment essentials',
      'Content planning and episode structure',
      'Launch strategy for maximum initial impact',
    ],
    whoItsFor: ['Aspiring podcasters', 'Brands considering a show', 'Content marketers', 'Thought leaders seeking new channels'],
  },
  {
    id: 'pod-2',
    topic: 'podcasting',
    title: 'Podcast Growth Secrets: Building an Engaged Audience',
    description: 'Launching is easy, but growing is hard. You\'ll learn audience-building strategies that have reached hundreds of thousands of listeners—and can work for you too.',
    whatYouLearn: [
      'Organic growth tactics that work',
      'Cross-promotion strategies',
      'Community building around your show',
      'Leveraging guests for audience expansion',
    ],
    whoItsFor: ['Existing podcasters seeking growth', 'Marketing teams', 'Community builders', 'Anyone with a show under 10k downloads'],
  },
  {
    id: 'pod-3',
    topic: 'podcasting',
    title: 'The Art of the Interview: Conversations That Connect',
    description: 'Great podcasts are built on great conversations. Master the interviewing techniques that create genuine moments, meaningful insights, and memorable episodes.',
    whatYouLearn: [
      'Pre-interview research and preparation',
      'Question frameworks that unlock stories',
      'Active listening techniques',
      'Handling difficult moments gracefully',
    ],
    whoItsFor: ['Interview-based podcasters', 'Journalists', 'Content creators', 'Anyone who hosts conversations'],
  },
  {
    id: 'pod-4',
    topic: 'podcasting',
    title: 'Podcasting for Business: ROI-Driven Content Strategy',
    description: 'Turn your podcast into a business asset. Learn how to align your show with business objectives and measure the real impact on your bottom line.',
    whatYouLearn: [
      'Aligning podcast goals with business goals',
      'Lead generation through podcast content',
      'Sponsorship and monetization models',
      'Measuring podcast ROI accurately',
    ],
    whoItsFor: ['Business owners with podcasts', 'Marketing leaders', 'Content strategists', 'Podcast managers'],
  },
  {
    id: 'pod-5',
    topic: 'podcasting',
    title: 'Longevity in Podcasting: Sustaining Creativity Over Years',
    description: 'You\'ll discover how to avoid burnout, maintain creativity, and build a sustainable podcasting practice that endures—drawing from 13+ years of experience.',
    whatYouLearn: [
      'Avoiding podcast burnout',
      'Refreshing your format and approach',
      'Building sustainable production systems',
      'Evolving with your audience over time',
    ],
    whoItsFor: ['Long-term podcasters', 'Content creators facing burnout', 'Media producers', 'Anyone committed to the long game'],
  },
  {
    id: 'pod-6',
    topic: 'podcasting',
    title: 'Multi-Show Strategy: Running Multiple Successful Podcasts',
    description: 'Managing one show is hard, and managing multiple seems impossible. Learn the systems and strategies for running multiple podcasts without losing your mind.',
    whatYouLearn: [
      'When to launch additional shows',
      'Content differentiation strategies',
      'Team and workflow management',
      'Cross-pollinating audiences effectively',
    ],
    whoItsFor: ['Experienced podcasters', 'Media companies', 'Agencies with podcast offerings', 'Ambitious content creators'],
  },

  // AI & Technology Keynotes (6)
  {
    id: 'ai-1',
    topic: 'ai',
    title: 'Human-First AI: Technology That Amplifies, Not Replaces',
    description: 'In a world obsessed with AI replacement, you\'ll discover a different vision: AI that amplifies your potential while preserving authentic human connection.',
    whatYouLearn: [
      'The human-first AI philosophy',
      'Identifying AI-appropriate tasks vs. human tasks',
      'Building trust in an AI-enhanced world',
      'Ethical considerations for AI adoption',
    ],
    whoItsFor: ['Business leaders navigating AI', 'HR professionals', 'Anyone anxious about AI', 'Ethics-focused technologists'],
  },
  {
    id: 'ai-2',
    topic: 'ai',
    title: 'Cloning Human Expertise: The Future of Knowledge Transfer',
    description: 'You\'ll explore how your organization can capture and scale its best expertise using AI—with insights from real-world experience creating an AI clone.',
    whatYouLearn: [
      'The concept of expertise cloning',
      'Training AI on human knowledge',
      'Use cases for knowledge preservation',
      'Building your own expertise clone',
    ],
    whoItsFor: ['Knowledge management professionals', 'Training departments', 'Subject matter experts', 'Forward-thinking leaders'],
  },
  {
    id: 'ai-3',
    topic: 'ai',
    title: 'AI-Powered Marketing: Practical Applications Today',
    description: 'Cut through the hype and focus on what\'s actually working. This practical talk covers real AI applications that marketing teams can implement immediately.',
    whatYouLearn: [
      'AI tools for content creation',
      'Personalization at scale with AI',
      'Predictive analytics for marketing',
      'Automation without losing authenticity',
    ],
    whoItsFor: ['Marketing teams', 'Content creators', 'Demand gen professionals', 'Anyone exploring AI for marketing'],
  },
  {
    id: 'ai-4',
    topic: 'ai',
    title: 'The AI-Augmented Salesperson: Selling in the New Era',
    description: 'Sales is fundamentally human, but AI can make salespeople superhuman. Discover how to leverage AI to sell more effectively while maintaining genuine relationships.',
    whatYouLearn: [
      'AI tools for sales prospecting',
      'Personalization at scale in sales',
      'AI-assisted follow-up and nurturing',
      'Keeping the human touch in AI-enhanced sales',
    ],
    whoItsFor: ['Sales professionals', 'Sales managers', 'RevOps teams', 'Anyone selling in the modern era'],
  },
  {
    id: 'ai-5',
    topic: 'ai',
    title: 'Preparing Your Team for AI: Change Management Essentials',
    description: 'AI adoption fails when people are left behind. Learn the change management strategies essential for successful AI integration across your organization.',
    whatYouLearn: [
      'Addressing AI fears and resistance',
      'Training programs for AI literacy',
      'Building an AI-positive culture',
      'Measuring AI adoption success',
    ],
    whoItsFor: ['HR leaders', 'Change management professionals', 'Team managers', 'Organizational development specialists'],
  },
  {
    id: 'ai-6',
    topic: 'ai',
    title: 'The Future of Work: AI, Creativity, and Human Potential',
    description: 'A visionary look at how AI will reshape work, not to diminish human value, but to elevate it. Discover the skills and mindsets that will matter most.',
    whatYouLearn: [
      'How AI will transform job roles',
      'Skills that will remain uniquely human',
      'Preparing for careers that don\'t exist yet',
      'Thriving in an AI-enhanced workplace',
    ],
    whoItsFor: ['Future-focused professionals', 'Career development leaders', 'Educators', 'Anyone curious about the future'],
  },

  // Transformation Keynotes (6)
  {
    id: 'trans-1',
    topic: 'transformation',
    title: 'The Superhuman Framework: Unleashing Your Best Self',
    description: 'You\'ll discover the signature methodology for personal and professional transformation—how to operate at your highest level and achieve what others think is impossible.',
    whatYouLearn: [
      'The four pillars: Love, Purpose, Passion, Persistence',
      'Identifying and overcoming limiting beliefs',
      'Building sustainable high-performance habits',
      'Creating your personal transformation roadmap',
    ],
    whoItsFor: ['Anyone seeking personal growth', 'Leaders developing their potential', 'Teams needing inspiration', 'Individuals facing major transitions'],
    url: 'https://superhumanframework.com/',
    external: true,
  },
  {
    id: 'trans-2',
    topic: 'transformation',
    title: 'From Dropout to Thought Leader: The Power of Belief',
    description: 'You\'ll hear a powerful story of transformation—from high school dropout to industry expert—and walk away with lessons on how belief and persistence can reshape your future.',
    whatYouLearn: [
      'How to rewrite your personal narrative',
      'Turning setbacks into setup for success',
      'The role of mentors and community',
      'Practical steps for reinvention',
    ],
    whoItsFor: ['Anyone facing self-doubt', 'Career changers', 'Those overcoming past failures', 'Inspiration seekers'],
  },
  {
    id: 'trans-3',
    topic: 'transformation',
    title: 'Becoming Your Own Sidekick: Self-Coaching for Success',
    description: 'You can\'t always have a coach by your side, but you can become your own. Learn the self-coaching techniques that enable continuous growth and development.',
    whatYouLearn: [
      'Self-assessment frameworks',
      'Building accountability systems',
      'Reflective practices for growth',
      'Knowing when to seek outside help',
    ],
    whoItsFor: ['Self-directed learners', 'Remote workers', 'Solopreneurs', 'Anyone investing in personal development'],
  },
  {
    id: 'trans-4',
    topic: 'transformation',
    title: 'Leading Transformation: Helping Others Become Superhuman',
    description: 'Leadership is about helping others transform. Learn how to create environments and relationships that unlock the potential in those you lead.',
    whatYouLearn: [
      'Creating psychological safety for growth',
      'Coaching conversations that transform',
      'Building a culture of continuous improvement',
      'Measuring team transformation',
    ],
    whoItsFor: ['People managers', 'Executive leaders', 'HR professionals', 'Anyone developing others'],
  },
  {
    id: 'trans-5',
    topic: 'transformation',
    title: 'The Transition Specialist: Navigating Major Life Changes',
    description: 'Whether it\'s career change, organizational restructuring, or personal reinvention, learn to navigate transitions with confidence and emerge stronger.',
    whatYouLearn: [
      'The psychology of transition',
      'Framework for managing change',
      'Building resilience during uncertainty',
      'Finding opportunity in disruption',
    ],
    whoItsFor: ['Those in transition', 'Change management leaders', 'Career counselors', 'Anyone facing major change'],
  },
  {
    id: 'trans-6',
    topic: 'transformation',
    title: 'Beyond Your Default: Breaking Patterns That Hold You Back',
    description: 'We all have default patterns that limit our potential. This talk explores how to identify, interrupt, and replace the patterns keeping you from your best self.',
    whatYouLearn: [
      'Identifying limiting default patterns',
      'The neuroscience of habit change',
      'Creating new empowering defaults',
      'Sustaining change over time',
    ],
    whoItsFor: ['Anyone feeling stuck', 'Personal development enthusiasts', 'Coaches and trainers', 'Those seeking breakthrough'],
  },

  // Marketing & Sales Keynotes (6)
  {
    id: 'mkt-1',
    topic: 'marketing',
    title: 'The Inbound Revolution: Why Traditional Marketing is Dying',
    description: 'You\'ll discover why inbound isn\'t just a methodology—it\'s a fundamental shift in how you connect with and serve customers. Drawing from 30+ years in marketing.',
    whatYouLearn: [
      'The evolution of marketing effectiveness',
      'Inbound principles that endure',
      'Building trust in a skeptical market',
      'Content strategy for the modern buyer',
    ],
    whoItsFor: ['Traditional marketers ready for change', 'Business owners', 'Marketing students', 'Anyone questioning old-school tactics'],
  },
  {
    id: 'mkt-2',
    topic: 'marketing',
    title: 'Content That Converts: From Awareness to Advocacy',
    description: 'You\'ll learn content strategies that actually drive business results, not just vanity metrics—proven through 16+ million words of real-world content creation.',
    whatYouLearn: [
      'Content mapping to the buyer journey',
      'Creating content that answers real questions',
      'Distribution strategies that amplify reach',
      'Measuring content\'s impact on revenue',
    ],
    whoItsFor: ['Content marketers', 'Content strategists', 'Demand gen teams', 'Anyone creating content'],
  },
  {
    id: 'mkt-3',
    topic: 'marketing',
    title: 'The Superhuman Marketing OS: Systems for Sustainable Growth',
    description: 'Marketing without systems is chaos. Learn the operating system approach to marketing that creates predictable, sustainable growth.',
    whatYouLearn: [
      'Building marketing systems that scale',
      'Automating without losing authenticity',
      'Team structures for marketing efficiency',
      'Metrics and dashboards that matter',
    ],
    whoItsFor: ['Marketing leaders', 'Growth teams', 'Agency owners', 'Anyone scaling marketing efforts'],
  },
  {
    id: 'mkt-4',
    topic: 'marketing',
    title: 'Sales and Marketing Alignment: Ending the War',
    description: 'The sales-marketing divide costs companies millions. Learn practical strategies for creating true alignment and shared success.',
    whatYouLearn: [
      'Root causes of sales-marketing friction',
      'SLA frameworks that work',
      'Shared metrics and accountability',
      'Building collaborative culture',
    ],
    whoItsFor: ['Sales leaders', 'Marketing leaders', 'RevOps professionals', 'CEOs tired of internal conflict'],
  },
  {
    id: 'mkt-5',
    topic: 'marketing',
    title: 'Building Authority: Becoming the Go-To Expert',
    description: 'In crowded markets, authority wins. Learn how to position yourself or your brand as the undisputed expert in your space.',
    whatYouLearn: [
      'Authority-building content strategies',
      'Leveraging speaking and media',
      'Building thought leadership platforms',
      'From expert to recognized authority',
    ],
    whoItsFor: ['Thought leaders', 'Personal brands', 'Agency principals', 'Anyone seeking market authority'],
  },
  {
    id: 'mkt-6',
    topic: 'marketing',
    title: 'The Loop Marketing Model: Creating Continuous Customer Value',
    description: 'Marketing doesn\'t end at the sale. It\'s a continuous loop of value creation. Learn how to build marketing that serves customers throughout their entire journey.',
    whatYouLearn: [
      'The customer loop framework',
      'Post-sale marketing strategies',
      'Building customer advocacy programs',
      'Lifetime value optimization',
    ],
    whoItsFor: ['Customer success teams', 'Marketing leaders', 'Subscription businesses', 'Anyone focused on retention'],
  },
]

export default function SpeakingPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<Topic | null>(null)
  const keynotesWrapperRef = useRef<HTMLDivElement>(null)

  const getTopicColor = (topic: Topic) => {
    return topics.find((t) => t.id === topic)?.color || 'var(--color-accent)'
  }

  const getTopicLabel = (topic: Topic) => {
    return topics.find((t) => t.id === topic)?.label || topic
  }

  const getKeynotesByTopic = (topic: Topic) => {
    return keynotes.filter((k) => k.topic === topic)
  }

  // Scroll detection for sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      const wrapper = keynotesWrapperRef.current
      if (!wrapper) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Show sidebar when keynotes wrapper is in view
      const isInView = wrapperRect.top < windowHeight * 0.5 && wrapperRect.bottom > windowHeight * 0.3
      setSidebarVisible(isInView)

      // Determine active section
      if (isInView) {
        const sections = wrapper.querySelectorAll('[data-topic]')
        let currentSection: Topic | null = null

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect()
          if (rect.top <= windowHeight * 0.4) {
            currentSection = section.getAttribute('data-topic') as Topic
          }
        })

        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* Hero Section with Speaker Reel */}
        <section className="page-hero page-hero--speaking-video">
          <div className="container">
            <div className="speaking-hero-grid">
              <AnimatedSection className="page-hero__content" animation="fade-in">
                <span className="page-hero__tagline">Keynote Speaker</span>
                <h1 className="page-hero__title">
                  Talks That
                  <span className="page-hero__title-accent"> Transform Your Audience</span>
                </h1>
                <p className="page-hero__description">
                  From INBOUND to Social Media Marketing World, you&apos;ll get keynotes that inspire action,
                  challenge perspectives, and create lasting change. Every talk blends deep expertise
                  with genuine human connection—so your audience leaves transformed.
                </p>
                <div className="page-hero__stats">
                  <div className="page-hero__stat">
                    <span className="page-hero__stat-value">25+</span>
                    <span className="page-hero__stat-label">Years Speaking</span>
                  </div>
                  <div className="page-hero__stat">
                    <span className="page-hero__stat-value">100+</span>
                    <span className="page-hero__stat-label">Keynotes Delivered</span>
                  </div>
                  <div className="page-hero__stat">
                    <span className="page-hero__stat-value">6</span>
                    <span className="page-hero__stat-label">Expertise Topics</span>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection className="speaking-hero-video" animation="slide-right">
                <VideoShowcase
                  youtubeId="jIMAkDBsI8c"
                  title="George B. Thomas Speaker Reel"
                  caption="Watch the Speaker Reel"
                />
              </AnimatedSection>
            </div>
          </div>
          <div className="page-hero__shape" aria-hidden="true"></div>
        </section>

        {/* Who I Serve - Flowing Editorial Section */}
        <section className="section who-i-serve-flow">
          <div className="container container--narrow">
            <AnimatedSection className="serve-intro" animation="fade-in">
              <span className="serve-intro__eyebrow">Who I Serve</span>
              <h2 className="serve-intro__title">
                Inspiration Meets Action.<br />
                Insights Meet Impact.
              </h2>
              <p className="serve-intro__text">
                Every audience is unique, but one thing&apos;s constant: whether it&apos;s your stage,
                workshop, or podcast—your people will leave with real-world insights and actionable
                strategies they can use immediately. That&apos;s what matters most: empowering
                your audience to flourish personally and professionally.
              </p>
            </AnimatedSection>
          </div>

          {/* Corporate Leaders */}
          <div className="serve-block">
            <div className="container">
              <div className="serve-block__grid">
                <AnimatedSection className="serve-block__content" animation="fade-in">
                  <span className="serve-block__label">For Corporate Leaders & Organizations</span>
                  <h3 className="serve-block__title">Align Your Teams. Ignite Your Growth.</h3>
                  <p className="serve-block__text">
                    Today&apos;s leaders face challenges that demand clarity, innovation, and resilience.
                    Whether you&apos;re managing a growing team, navigating a shift in strategy, or tackling
                    burnout, I&apos;m here to help your organization flourish.
                  </p>
                  <ul className="serve-block__list">
                    <li><strong>Keynotes that captivate:</strong> Energize your leadership team with insights on HubSpot mastery, modern marketing, and AI-powered strategies.</li>
                    <li><strong>Workshops that transform:</strong> Hands-on training designed to strengthen communication, trust, and team alignment.</li>
                    <li><strong>Strategies for success:</strong> Walk away with actionable frameworks to inspire growth and boost performance.</li>
                  </ul>
                  <Link href="/coaching" className="btn btn--primary">
                    Transform Your Team
                  </Link>
                </AnimatedSection>
                <AnimatedSection className="serve-block__video" animation="slide-right">
                  <div className="serve-block__video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/7rlGBDLHjQ4"
                      title="How to be WORLD CLASS at HubSpot - INBOUND"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>

          {/* Event Planners */}
          <div className="serve-block serve-block--reverse serve-block--warm">
            <div className="container">
              <div className="serve-block__grid">
                <AnimatedSection className="serve-block__content" animation="fade-in">
                  <span className="serve-block__label">For Event Planners & Conferences</span>
                  <h3 className="serve-block__title">Unforgettable Keynotes. Transformative Experiences.</h3>
                  <p className="serve-block__text">
                    You&apos;re not just filling an agenda slot. You&apos;re creating a moment that your
                    audience will carry long after the event ends. I deliver keynotes that inspire,
                    workshops that engage, and content that resonates deeply.
                  </p>
                  <ul className="serve-block__list">
                    <li><strong>Deep expertise, delivered simply:</strong> Sessions on marketing, sales, video strategies, and the Superhuman Framework packed with practical insights.</li>
                    <li><strong>Energy that engages:</strong> A dynamic, relatable presence that keeps audiences engaged from the first word to the last.</li>
                    <li><strong>Transformation that lasts:</strong> Content that challenges, empowers, and equips attendees to take meaningful action.</li>
                  </ul>
                  <Link href="/coaching" className="btn btn--primary">
                    Create an Unforgettable Event
                  </Link>
                </AnimatedSection>
                <AnimatedSection className="serve-block__video" animation="slide-left">
                  <div className="serve-block__video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/E9EO_5jYk-M"
                      title="The World Has Changed - George B. Thomas"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>

          {/* Podcast Hosts */}
          <div className="serve-block">
            <div className="container">
              <div className="serve-block__grid">
                <AnimatedSection className="serve-block__content" animation="fade-in">
                  <span className="serve-block__label">For Podcast Hosts & Listeners</span>
                  <h3 className="serve-block__title">Conversations That Connect. Stories That Inspire.</h3>
                  <p className="serve-block__text">
                    Podcasts are where big ideas come to life and meaningful conversations spark real
                    change. As the creator and host of the HubHeroes Podcast, I understand what it
                    takes to keep listeners coming back for more.
                  </p>
                  <ul className="serve-block__list">
                    <li><strong>Expertise that educates:</strong> Ready to dive into AI in marketing, building trust through video, or aligning life and work with purpose.</li>
                    <li><strong>Stories that connect:</strong> Real-world examples that resonate with professionals and entrepreneurs alike.</li>
                    <li><strong>Insights that stick:</strong> Practical strategies and inspiration your audience can use immediately.</li>
                  </ul>
                  <Link href="/coaching" className="btn btn--primary">
                    Spark a Great Conversation
                  </Link>
                </AnimatedSection>
                <AnimatedSection className="serve-block__video" animation="slide-right">
                  <div className="serve-block__video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/aFWRGqXwxDU"
                      title="Social Media Breakfast - Madison"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* More Speaking Examples - Video Slider */}
        <VideoSlider
          videos={speakingVideos}
          title="See More Speaking Highlights"
          subtitle="More Examples"
        />

        {/* Topic Navigation Section */}
        <section className="section speaking-filter">
          <div className="container">
            <AnimatedSection className="filter-section" animation="fade-in">
              <h2 className="filter-section__title">Explore Keynote Topics</h2>
              <p className="filter-section__description">
                Choose from 36 keynotes across 6 areas of expertise
              </p>
              <div className="topic-filters">
                {topics.map((topic) => (
                  <a
                    key={topic.id}
                    href={`#${topic.id}`}
                    className="topic-filter"
                    style={{
                      '--topic-color': topic.color,
                    } as React.CSSProperties}
                  >
                    {topic.label}
                    <span className="topic-filter__count">
                      {keynotes.filter((k) => k.topic === topic.id).length}
                    </span>
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Keynote Topic Sections with Sticky Sidebar */}
        <div className="keynotes-wrapper" ref={keynotesWrapperRef}>
          {/* Sticky Sidebar Navigation */}
          <nav className={`keynotes-sidebar ${sidebarVisible ? 'is-visible' : ''}`}>
            <div className="keynotes-sidebar__list">
              {topics.map((topic) => (
                <a
                  key={topic.id}
                  href={`#${topic.id}`}
                  className={`keynotes-sidebar__item ${activeSection === topic.id ? 'is-active' : ''}`}
                  style={{ '--sidebar-color': topic.color } as React.CSSProperties}
                >
                  <span className="keynotes-sidebar__dot" style={{ background: topic.color }}></span>
                  <span className="keynotes-sidebar__label">{topic.label}</span>
                </a>
              ))}
            </div>
          </nav>

          {topics.map((topic, topicIndex) => (
            <section
              key={topic.id}
              id={topic.id}
              data-topic={topic.id}
              className={`section keynote-topic-section ${topicIndex % 2 === 0 ? 'section--warm' : ''}`}
              style={{
                '--topic-color': topic.color,
              } as React.CSSProperties}
            >
            <div className="container container--wide">
              <AnimatedSection className="keynote-topic-header" animation="fade-in">
                <span
                  className="keynote-topic-header__badge"
                  style={{ background: topic.color }}
                >
                  {getKeynotesByTopic(topic.id).length} Keynotes
                </span>
                <h2 className="keynote-topic-header__title">{topic.label}</h2>
              </AnimatedSection>

              <div className="keynotes-grid">
                {getKeynotesByTopic(topic.id).map((keynote) => (
                  <article
                    key={keynote.id}
                    className={`keynote-card ${expandedCard === keynote.id ? 'is-expanded' : ''}`}
                    style={{
                      '--keynote-color': topic.color,
                    } as React.CSSProperties}
                  >
                    <div className="keynote-card__header">
                      <h3 className="keynote-card__title">
                        {keynote.url ? (
                          <a
                            href={keynote.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link"
                          >
                            {keynote.title}
                          </a>
                        ) : (
                          keynote.title
                        )}
                      </h3>
                    </div>

                    <p className="keynote-card__description">{keynote.description}</p>

                    <button
                      className="keynote-card__expand"
                      onClick={() => setExpandedCard(expandedCard === keynote.id ? null : keynote.id)}
                      aria-expanded={expandedCard === keynote.id}
                    >
                      {expandedCard === keynote.id ? 'Show Less' : 'Learn More'}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="keynote-card__expand-icon"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    <div className="keynote-card__details">
                      <div className="keynote-card__section">
                        <h4>What You&apos;ll Learn</h4>
                        <ul>
                          {keynote.whatYouLearn.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="keynote-card__section">
                        <h4>Who It&apos;s For</h4>
                        <ul>
                          {keynote.whoItsFor.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <Link href="/coaching" className="btn btn--primary keynote-card__cta">
                        Book This Keynote
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          ))}
        </div>

        {/* Speaking Experience Section */}
        <section className="section speaking-experience">
          <div className="container">
            <AnimatedSection className="section-header" animation="fade-in">
              <span className="section-header__subtitle">Speaking Experience</span>
              <h2 className="section-header__title">Trusted By Leading Events</h2>
            </AnimatedSection>

            <StaggerContainer className="experience-grid">
              <div className="experience-card">
                <h3 className="experience-card__title">INBOUND</h3>
                <p className="experience-card__description">Speaker every year since 2015</p>
              </div>
              <div className="experience-card">
                <h3 className="experience-card__title">Social Media Marketing World</h3>
                <p className="experience-card__description">Emcee and featured speaker</p>
              </div>
              <div className="experience-card">
                <h3 className="experience-card__title">Vidyard Fast Forward</h3>
                <p className="experience-card__description">Keynote speaker 3 consecutive years</p>
              </div>
              <div className="experience-card">
                <h3 className="experience-card__title">MarketingProfs</h3>
                <p className="experience-card__description">Regular contributor and speaker</p>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section--dark speaking-cta">
          <div className="container">
            <AnimatedSection className="cta-block" animation="fade-in">
              <h2 className="cta-block__title">Give Your Audience an Experience They Won&apos;t Forget</h2>
              <p className="cta-block__description">
                Whether it&apos;s a keynote, workshop, or emcee role—let&apos;s create
                something transformative together. Your audience deserves it.
              </p>
              <div className="cta-block__buttons">
                <Link href="/coaching" className="btn btn--primary btn--large">
                  Ignite Your Event
                </Link>
                <Link href="/expertise" className="btn btn--secondary btn--large">
                  See What&apos;s Possible
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
