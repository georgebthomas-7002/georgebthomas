import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Privacy Policy | George B. Thomas',
  description: 'Privacy Policy for georgebthomas.com. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-hero page-hero--compact">
          <div className="container">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <h1 className="page-hero__title">Privacy Policy</h1>
              <p className="page-hero__description">
                Your privacy matters. Here's how we handle your information.
              </p>
              <p className="legal-page__updated">Last updated: January 11, 2025</p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <div className="legal-content">
              <AnimatedSection animation="fade-in">
                <h2>Overview</h2>
                <p>
                  This Privacy Policy describes how George B. Thomas ("we," "us," or "our") collects,
                  uses, and shares information about you when you visit georgebthomas.com (the "Site")
                  or use our services, including coaching, speaking engagements, and related offerings.
                </p>
                <p>
                  We're committed to protecting your privacy and being transparent about our data practices.
                  If you have questions, please reach out at{' '}
                  <a href="mailto:george@georgebthomas.com">george@georgebthomas.com</a>.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Information We Collect</h2>

                <h3>Information You Provide</h3>
                <p>We collect information you voluntarily provide when you:</p>
                <ul>
                  <li><strong>Submit a contact form:</strong> Name, email address, phone number, company name, and your message</li>
                  <li><strong>Request a speaking engagement:</strong> Event details, organization information, budget range, audience size, and topic preferences</li>
                  <li><strong>Apply for coaching:</strong> Name, email, phone, company, role, coaching goals, focus areas, and scheduling preferences</li>
                  <li><strong>Make a purchase:</strong> Payment information is processed securely by our payment processor (see "Payment Processing" below)</li>
                </ul>

                <h3>Information Collected Automatically</h3>
                <p>When you visit our Site, we automatically collect certain information, including:</p>
                <ul>
                  <li>IP address and general location</li>
                  <li>Browser type and device information</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website or source</li>
                  <li>Interactions with site features</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Respond to your inquiries and requests</li>
                  <li>Provide coaching services and schedule sessions</li>
                  <li>Coordinate speaking engagements</li>
                  <li>Process payments and send receipts</li>
                  <li>Send relevant updates about our services (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Analyze site traffic and usage patterns</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Third-Party Services</h2>
                <p>We use the following third-party services that may collect or process your data:</p>

                <h3>HubSpot</h3>
                <p>
                  We use HubSpot as our customer relationship management (CRM) platform. When you submit
                  a form on our site, your information is stored in HubSpot. HubSpot's privacy policy
                  can be found at{' '}
                  <a href="https://legal.hubspot.com/privacy-policy" target="_blank" rel="noopener noreferrer">
                    legal.hubspot.com/privacy-policy
                  </a>.
                </p>

                <h3>Google Analytics</h3>
                <p>
                  We use Google Analytics to understand how visitors interact with our Site. Google Analytics
                  uses cookies to collect anonymous usage data. You can opt out of Google Analytics by
                  installing the{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>

                <h3>Payment Processing</h3>
                <p>
                  Payments for coaching packages are processed through HubSpot Payments. We do not store
                  your credit card information on our servers. Payment data is handled securely by our
                  payment processor in compliance with PCI-DSS standards.
                </p>

                <h3>Vercel</h3>
                <p>
                  Our website is hosted on Vercel. Vercel may collect technical information about your
                  visit for performance and security purposes. See{' '}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                    Vercel's Privacy Policy
                  </a>.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Cookies</h2>
                <p>
                  Our Site uses cookies and similar technologies to enhance your experience and collect
                  analytics data. Cookies are small text files stored on your device.
                </p>
                <p>We use:</p>
                <ul>
                  <li><strong>Essential cookies:</strong> Required for the Site to function properly</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors use our Site (Google Analytics, HubSpot)</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. Note that disabling cookies may
                  affect site functionality.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to provide our services
                  and fulfill the purposes described in this policy. For coaching clients, we retain
                  records for the duration of our engagement plus a reasonable period afterward for
                  follow-up and legal compliance.
                </p>
                <p>
                  If you'd like us to delete your information, please contact us at{' '}
                  <a href="mailto:george@georgebthomas.com">george@georgebthomas.com</a>.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{' '}
                  <a href="mailto:george@georgebthomas.com">george@georgebthomas.com</a>.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Children's Privacy</h2>
                <p>
                  Our Site and services are not directed to children under 16. We do not knowingly
                  collect personal information from children. If you believe we have collected information
                  from a child, please contact us immediately.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant
                  changes by posting a notice on our Site or sending you an email. Your continued use of
                  the Site after changes indicates your acceptance of the updated policy.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Contact Us</h2>
                <p>
                  If you have questions or concerns about this Privacy Policy or our data practices,
                  please contact us:
                </p>
                <p>
                  <strong>George B. Thomas</strong><br />
                  Email: <a href="mailto:george@georgebthomas.com">george@georgebthomas.com</a><br />
                  Website: <Link href="/contact">georgebthomas.com/contact</Link>
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" className="legal-page__nav">
                <Link href="/terms" className="btn btn--secondary">
                  View Terms of Service
                </Link>
                <Link href="/" className="btn btn--secondary">
                  Return Home
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
