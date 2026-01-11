import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Terms of Service | George B. Thomas',
  description: 'Terms of Service for georgebthomas.com. Read about our policies for coaching, speaking engagements, and use of our website.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-hero page-hero--compact">
          <div className="container">
            <AnimatedSection className="page-hero__content" animation="fade-in">
              <h1 className="page-hero__title">Terms of Service</h1>
              <p className="page-hero__description">
                The terms and conditions for using our services.
              </p>
              <p className="legal-page__updated">Last updated: January 11, 2025</p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <div className="legal-content">
              <AnimatedSection animation="fade-in">
                <h2>Agreement to Terms</h2>
                <p>
                  By accessing or using georgebthomas.com (the "Site") or any services offered by
                  George B. Thomas ("we," "us," or "our"), including coaching and speaking engagements,
                  you agree to be bound by these Terms of Service. If you do not agree to these terms,
                  please do not use our Site or services.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Services Offered</h2>

                <h3>Coaching Services</h3>
                <p>
                  We offer one-on-one coaching packages designed to help you grow in areas including
                  HubSpot strategy, video marketing, podcasting, AI integration, personal transformation,
                  and marketing strategy. Coaching sessions are conducted via video call (Zoom) and are
                  typically 60 minutes each.
                </p>

                <h3>Speaking Engagements</h3>
                <p>
                  We provide keynote speaking, workshop facilitation, podcast guest appearances, and
                  virtual presentations on topics including HubSpot, video marketing, AI, personal
                  development, and business growth.
                </p>

                <h3>Activation Meetings</h3>
                <p>
                  A 45-minute focused session to understand your goals, identify opportunities, and
                  create a clear path forward.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Coaching Packages and Pricing</h2>
                <p>Our coaching packages are billed at $200 per hour:</p>
                <ul>
                  <li><strong>Activation Meeting:</strong> $99 for 45 minutes</li>
                  <li><strong>Starter Package:</strong> $2,000 for 10 hours</li>
                  <li><strong>Growth Package:</strong> $4,000 for 20 hours</li>
                  <li><strong>Transformation Package:</strong> $6,000 for 30 hours</li>
                </ul>
                <p>
                  Pricing is subject to change. The price at the time of purchase will be honored for
                  that package.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Payment Terms</h2>
                <p>
                  Payment is due at the time of purchase. We accept payment through our secure payment
                  processor (HubSpot Payments). By making a purchase, you authorize us to charge the
                  payment method you provide.
                </p>
                <p>
                  All prices are listed in US dollars (USD) unless otherwise specified.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Coaching Hour Validity</h2>
                <p>
                  Coaching hours included in your package are valid for 12 months from the date of
                  purchase. We encourage you to schedule sessions regularly to maintain momentum.
                  Unused hours after 12 months may be forfeited unless alternative arrangements are
                  made in advance.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Refund Policy</h2>
                <p>
                  <strong>Satisfaction Guarantee:</strong> If after your first coaching session you feel
                  this isn't the right fit, we will refund your remaining unused hours, no questions asked.
                </p>
                <p>
                  <strong>Activation Meetings:</strong> Activation meeting fees are non-refundable once the
                  session has been completed.
                </p>
                <p>
                  <strong>Speaking Engagements:</strong> Refund terms for speaking engagements are outlined
                  in individual speaking agreements and contracts.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Scheduling and Cancellations</h2>
                <p>
                  <strong>Scheduling:</strong> Sessions are scheduled at mutually agreeable times based on
                  your package level's scheduling access (flexible, priority, or VIP).
                </p>
                <p>
                  <strong>Cancellations:</strong> Please provide at least 24 hours notice if you need to
                  reschedule a session. Sessions cancelled with less than 24 hours notice may be counted
                  against your package hours.
                </p>
                <p>
                  <strong>No-Shows:</strong> If you miss a scheduled session without notice, it will be
                  counted against your package hours.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Confidentiality</h2>
                <p>
                  We treat all information shared during coaching sessions as confidential. We will not
                  share your personal information, business details, or session content with third parties
                  without your consent, except as required by law.
                </p>
                <p>
                  Similarly, you agree to keep any proprietary frameworks, methodologies, or materials
                  shared during coaching confidential and for your personal use only.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Intellectual Property</h2>
                <p>
                  All content on this Site, including text, graphics, logos, images, and software, is the
                  property of George B. Thomas or our licensors and is protected by copyright and other
                  intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative works from our content
                  without express written permission.
                </p>
                <p>
                  Coaching materials, frameworks, and resources provided to you are for your personal use
                  only and may not be shared, resold, or distributed.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>User Responsibilities</h2>
                <p>When using our Site and services, you agree to:</p>
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Use our services for lawful purposes only</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not use our services to harm, harass, or defraud others</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Disclaimer of Warranties</h2>
                <p>
                  Our Site and services are provided "as is" without warranties of any kind, either
                  express or implied. We do not guarantee that our services will produce specific results.
                </p>
                <p>
                  Coaching and speaking services are educational and advisory in nature. We are not
                  providing legal, financial, medical, or other professional advice. You are responsible
                  for your own decisions and actions.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, George B. Thomas shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages, or any loss of
                  profits or revenues, whether incurred directly or indirectly, or any loss of data,
                  use, goodwill, or other intangible losses resulting from:
                </p>
                <ul>
                  <li>Your use or inability to use our services</li>
                  <li>Any decisions or actions you take based on our coaching or content</li>
                  <li>Unauthorized access to or alteration of your data</li>
                  <li>Any third-party conduct on our Site</li>
                </ul>
                <p>
                  Our total liability for any claims arising from your use of our services shall not
                  exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless George B. Thomas, his affiliates, and their
                  respective officers, directors, employees, and agents from any claims, damages, losses,
                  or expenses (including reasonable attorneys' fees) arising from your use of our services
                  or violation of these Terms.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the
                  United States, without regard to conflict of law principles. Any disputes arising
                  from these Terms or your use of our services shall be resolved in the appropriate
                  courts.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of
                  significant changes by posting a notice on our Site or sending you an email. Your
                  continued use of our services after changes indicates your acceptance of the updated
                  Terms.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable, the remaining provisions
                  will continue in full force and effect.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in">
                <h2>Contact Us</h2>
                <p>
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <p>
                  <strong>George B. Thomas</strong><br />
                  Email: <a href="mailto:george@georgebthomas.com">george@georgebthomas.com</a><br />
                  Website: <Link href="/contact">georgebthomas.com/contact</Link>
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" className="legal-page__nav">
                <Link href="/privacy" className="btn btn--secondary">
                  View Privacy Policy
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
