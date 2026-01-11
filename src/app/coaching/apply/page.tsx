'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/AnimatedSection'

const coachingTopics = [
  {
    id: 'hubspot',
    title: 'HubSpot Strategy & Implementation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    questions: [
      { id: 'hubspot_tier', label: 'What HubSpot tier are you currently using?', type: 'select', options: ['Not using HubSpot yet', 'Free', 'Starter', 'Professional', 'Enterprise'] },
      { id: 'hubspot_challenge', label: 'What&apos;s your biggest HubSpot challenge right now?', type: 'textarea' },
      { id: 'hubspot_team', label: 'How many people on your team use HubSpot?', type: 'select', options: ['Just me', '2-5', '6-10', '11-25', '25+'] },
    ],
  },
  {
    id: 'video',
    title: 'Video Marketing Mastery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    questions: [
      { id: 'video_current', label: 'Are you currently creating video content?', type: 'select', options: ['No, just getting started', 'Yes, occasionally', 'Yes, regularly', 'Yes, but I need to improve'] },
      { id: 'video_goals', label: 'What are your main video marketing goals?', type: 'textarea' },
      { id: 'video_comfort', label: 'How comfortable are you on camera? (Be honest!)', type: 'select', options: ['Not comfortable at all', 'Somewhat nervous', 'Getting better', 'Very comfortable'] },
    ],
  },
  {
    id: 'podcasting',
    title: 'Podcasting Excellence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    questions: [
      { id: 'podcast_status', label: 'Do you have an existing podcast?', type: 'select', options: ['No, planning to launch', 'Yes, less than 20 episodes', 'Yes, 20-50 episodes', 'Yes, 50+ episodes'] },
      { id: 'podcast_goals', label: 'What do you want to achieve with your podcast?', type: 'textarea' },
      { id: 'podcast_frequency', label: 'How often do you want to publish?', type: 'select', options: ['Weekly', 'Bi-weekly', 'Monthly', 'Not sure yet'] },
    ],
  },
  {
    id: 'ai',
    title: 'AI Integration & Strategy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/>
        <line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/>
        <line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/>
        <line x1="20" y1="14" x2="23" y2="14"/>
        <line x1="1" y1="9" x2="4" y2="9"/>
        <line x1="1" y1="14" x2="4" y2="14"/>
      </svg>
    ),
    questions: [
      { id: 'ai_tools', label: 'What AI tools are you currently using (if any)?', type: 'textarea' },
      { id: 'ai_concerns', label: 'What are your biggest concerns about AI adoption?', type: 'textarea' },
      { id: 'ai_readiness', label: 'How ready is your team to embrace AI?', type: 'select', options: ['Not ready', 'Curious but hesitant', 'Ready to explore', 'Already using some tools'] },
    ],
  },
  {
    id: 'personal',
    title: 'Personal Transformation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    questions: [
      { id: 'personal_belief', label: 'What limiting belief is holding you back most?', type: 'textarea' },
      { id: 'personal_area', label: 'What area of your life do you most want to transform?', type: 'select', options: ['Career/Business', 'Relationships', 'Health/Wellness', 'Mindset/Confidence', 'Multiple areas'] },
      { id: 'personal_vision', label: 'Describe your ideal future self in 1 year—dream big!', type: 'textarea' },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Content Strategy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    questions: [
      { id: 'marketing_stage', label: 'What stage is your business at?', type: 'select', options: ['Startup (0-2 years)', 'Growth (3-5 years)', 'Established (5+ years)', 'Enterprise'] },
      { id: 'marketing_current', label: 'Tell me about your current marketing efforts:', type: 'textarea' },
      { id: 'marketing_goals', label: 'What are your top 3 marketing goals?', type: 'textarea' },
    ],
  },
]

const packageDetails = {
  starter: { name: 'Starter', hours: 10, price: 2000 },
  growth: { name: 'Growth', hours: 20, price: 4000 },
  transformation: { name: 'Transformation', hours: 30, price: 6000 },
  activation: { name: 'Activation Meeting', hours: 0.75, price: 99 },
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  role: string
  howHeard: string
  bestTime: string
  goals: string
  topicAnswers: Record<string, string>
}

function ApplyContent() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    howHeard: '',
    bestTime: '',
    goals: '',
    topicAnswers: {},
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const packageParam = searchParams.get('package')
    const typeParam = searchParams.get('type')

    if (packageParam && packageDetails[packageParam as keyof typeof packageDetails]) {
      setSelectedPackage(packageParam)
      setStep(2)
    } else if (typeParam === 'activation') {
      setSelectedPackage('activation')
      setStep(2)
    }
  }, [searchParams])

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTopicAnswerChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      topicAnswers: { ...prev.topicAnswers, [questionId]: value }
    }))
  }

  const getSelectedTopicQuestions = () => {
    return coachingTopics
      .filter(topic => selectedTopics.includes(topic.id))
      .flatMap(topic => topic.questions.map(q => ({ ...q, topicTitle: topic.title })))
  }

  const getTotalSteps = () => {
    return 4
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedPackage !== ''
      case 2:
        return selectedTopics.length > 0
      case 3:
        return formData.goals.trim() !== ''
      case 4:
        return formData.firstName && formData.lastName && formData.email
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsComplete(true)
    setIsSubmitting(false)
  }

  const currentPackage = packageDetails[selectedPackage as keyof typeof packageDetails]

  if (isComplete) {
    return (
      <>
        <section className="page-hero page-hero--compact">
          <div className="container">
            <AnimatedSection className="apply-complete" animation="fade-in">
              <div className="apply-complete__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h1 className="apply-complete__title">You&apos;re Almost There!</h1>
              <p className="apply-complete__description">
                I&apos;m excited to work with you! Complete your purchase below to lock in your spot—I can&apos;t wait to get started.
              </p>

              <div className="apply-complete__summary">
                <h3>Your Selection</h3>
                <div className="apply-complete__item">
                  <span>{currentPackage?.name}</span>
                  <strong>${currentPackage?.price}</strong>
                </div>
                <div className="apply-complete__topics">
                  <span>Focus Areas:</span>
                  <ul>
                    {selectedTopics.map(topicId => {
                      const topic = coachingTopics.find(t => t.id === topicId)
                      return <li key={topicId}>{topic?.title}</li>
                    })}
                  </ul>
                </div>
              </div>

              <div className="apply-complete__actions">
                <a
                  href={`mailto:george@georgebthomas.com?subject=${encodeURIComponent(`${currentPackage?.name} Purchase - ${formData.firstName} ${formData.lastName}`)}&body=${encodeURIComponent(`Hi George,\n\nI'd like to purchase the ${currentPackage?.name} package.\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\n\nFocus Areas: ${selectedTopics.map(id => coachingTopics.find(t => t.id === id)?.title).join(', ')}\n\nGoals: ${formData.goals}\n\nBest,\n${formData.firstName}`)}`}
                  className="btn btn--primary btn--large"
                >
                  Complete Purchase - ${currentPackage?.price}
                </a>
                <p className="apply-complete__note">
                  You&apos;ll receive a payment link via email shortly.
                  Got questions? Just hit reply—I&apos;m here to help.
                </p>
              </div>

              <Link href="/coaching" className="apply-complete__back">
                &larr; Back to Coaching
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <AnimatedSection className="apply-header" animation="fade-in">
            <Link href="/coaching" className="apply-header__back">
              &larr; Back to Coaching
            </Link>
            <h1 className="apply-header__title">Let&apos;s Get Started</h1>
            <p className="apply-header__description">
              Tell me about yourself and your goals—I&apos;ll use this to create the perfect coaching experience for you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section apply-form-section">
        <div className="container container--narrow">
          {/* Progress Bar */}
          <div className="apply-progress">
            <div className="apply-progress__bar">
              <div
                className="apply-progress__fill"
                style={{ width: `${(step / getTotalSteps()) * 100}%` }}
              />
            </div>
            <span className="apply-progress__text">Step {step} of {getTotalSteps()}</span>
          </div>

          {/* Step 1: Select Package */}
          {step === 1 && (
            <div className="apply-step">
              <h2 className="apply-step__title">Choose Your Path</h2>
              <p className="apply-step__description">
                Which coaching option fits where you are right now? Don&apos;t worry—you can always upgrade later.
              </p>

              <div className="apply-packages">
                <button
                  type="button"
                  className={`apply-package ${selectedPackage === 'activation' ? 'apply-package--selected' : ''}`}
                  onClick={() => setSelectedPackage('activation')}
                >
                  <div className="apply-package__header">
                    <h3>Activation Meeting</h3>
                    <span className="apply-package__price">$99</span>
                  </div>
                  <p>A 45-minute focused session where we&apos;ll map out your goals and create a clear path forward together.</p>
                </button>

                <div className="apply-packages__divider">
                  <span>Or choose a coaching package</span>
                </div>

                {Object.entries(packageDetails)
                  .filter(([key]) => key !== 'activation')
                  .map(([key, pkg]) => (
                    <button
                      key={key}
                      type="button"
                      className={`apply-package ${selectedPackage === key ? 'apply-package--selected' : ''}`}
                      onClick={() => setSelectedPackage(key)}
                    >
                      <div className="apply-package__header">
                        <h3>{pkg.name}</h3>
                        <span className="apply-package__price">${pkg.price.toLocaleString()}</span>
                      </div>
                      <p>{pkg.hours} hours of 1:1 coaching at $200/hour</p>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Topics */}
          {step === 2 && (
            <div className="apply-step">
              <h2 className="apply-step__title">What Would You Like to Focus On?</h2>
              <p className="apply-step__description">
                Select one or more areas you&apos;d like to explore. Don&apos;t overthink it—we&apos;ll adjust as we work together.
              </p>

              <div className="apply-topics">
                {coachingTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    className={`apply-topic ${selectedTopics.includes(topic.id) ? 'apply-topic--selected' : ''}`}
                    onClick={() => handleTopicToggle(topic.id)}
                  >
                    <div className="apply-topic__icon">{topic.icon}</div>
                    <span className="apply-topic__title">{topic.title}</span>
                    {selectedTopics.includes(topic.id) && (
                      <span className="apply-topic__check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Goals & Topic Questions */}
          {step === 3 && (
            <div className="apply-step">
              <h2 className="apply-step__title">Tell Me About Your Goals</h2>
              <p className="apply-step__description">
                The more you share, the better I can tailor your coaching experience. There&apos;s no wrong answer here.
              </p>

              <div className="apply-form">
                <div className="apply-field">
                  <label htmlFor="goals">What do you hope to achieve through coaching?</label>
                  <textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder="Share your goals, challenges, and what success looks like for you..."
                    rows={4}
                  />
                </div>

                {getSelectedTopicQuestions().map((question) => (
                  <div key={question.id} className="apply-field">
                    <label htmlFor={question.id}>
                      <span className="apply-field__topic">{question.topicTitle}</span>
                      {question.label}
                    </label>
                    {question.type === 'textarea' ? (
                      <textarea
                        id={question.id}
                        value={formData.topicAnswers[question.id] || ''}
                        onChange={(e) => handleTopicAnswerChange(question.id, e.target.value)}
                        rows={3}
                      />
                    ) : question.type === 'select' ? (
                      <select
                        id={question.id}
                        value={formData.topicAnswers[question.id] || ''}
                        onChange={(e) => handleTopicAnswerChange(question.id, e.target.value)}
                      >
                        <option value="">Select an option...</option>
                        {question.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id={question.id}
                        value={formData.topicAnswers[question.id] || ''}
                        onChange={(e) => handleTopicAnswerChange(question.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {step === 4 && (
            <div className="apply-step">
              <h2 className="apply-step__title">Your Information</h2>
              <p className="apply-step__description">
                Almost done! How can I reach you to schedule your sessions?
              </p>

              <div className="apply-form">
                <div className="apply-form__row">
                  <div className="apply-field">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="apply-field">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="apply-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="apply-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                <div className="apply-form__row">
                  <div className="apply-field">
                    <label htmlFor="company">Company (optional)</label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  <div className="apply-field">
                    <label htmlFor="role">Your Role (optional)</label>
                    <input
                      type="text"
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    />
                  </div>
                </div>

                <div className="apply-field">
                  <label htmlFor="howHeard">How did you find me?</label>
                  <select
                    id="howHeard"
                    value={formData.howHeard}
                    onChange={(e) => handleInputChange('howHeard', e.target.value)}
                  >
                    <option value="">Select an option...</option>
                    <option value="podcast">Podcast</option>
                    <option value="hubspot">HubSpot Community</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="search">Google Search</option>
                    <option value="event">Event/Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="apply-field">
                  <label htmlFor="bestTime">When&apos;s best for you to meet?</label>
                  <select
                    id="bestTime"
                    value={formData.bestTime}
                    onChange={(e) => handleInputChange('bestTime', e.target.value)}
                  >
                    <option value="">Select an option...</option>
                    <option value="morning">Morning (9am-12pm EST)</option>
                    <option value="afternoon">Afternoon (12pm-5pm EST)</option>
                    <option value="evening">Evening (5pm-8pm EST)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="apply-nav">
            {step > 1 && (
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}

            {step < getTotalSteps() ? (
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary btn--large"
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Continue to Payment - $${currentPackage?.price}`}
              </button>
            )}
          </div>

          {/* Summary Sidebar */}
          {selectedPackage && (
            <div className="apply-summary">
              <h3>Your Selection</h3>
              <div className="apply-summary__package">
                <span>{currentPackage?.name}</span>
                <strong>${currentPackage?.price}</strong>
              </div>
              {selectedTopics.length > 0 && (
                <div className="apply-summary__topics">
                  <span>Focus Areas:</span>
                  <ul>
                    {selectedTopics.map(topicId => {
                      const topic = coachingTopics.find(t => t.id === topicId)
                      return <li key={topicId}>{topic?.title}</li>
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function CoachingApplyPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={
          <div className="page-hero page-hero--compact">
            <div className="container" style={{textAlign: 'center', padding: '4rem 0'}}>
              Loading...
            </div>
          </div>
        }>
          <ApplyContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
