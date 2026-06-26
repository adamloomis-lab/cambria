import LegalLayout from '../components/LegalLayout'
import { company } from '../data/site'

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="May 2026">
      <p>
        This Privacy Policy explains how {company.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) handles information collected through our website at cambriasbistro.com (the
        &ldquo;Site&rdquo;). We&rsquo;re a family-run restaurant, not a data company, we collect as little
        as possible and never sell your information.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We only collect the information you choose to give us. If you use the contact form on our Site, we
        receive the name, phone number, email address, and message you submit so we can respond to your
        inquiry. Our hosting provider may also log standard technical data (such as your browser type and
        IP address) for security and analytics, as is common for most websites.
      </p>

      <h2>How We Use It</h2>
      <ul>
        <li>To respond to your questions, catering requests, and other messages.</li>
        <li>To operate, maintain, and improve the Site.</li>
        <li>To protect against fraud, spam, and abuse.</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We do not sell or rent your personal information. We may share it with trusted service providers
        who help us run the Site and our form submissions (for example, our website host), and only as
        needed to provide those services or when required by law.
      </p>

      <h2>Cookies</h2>
      <p>
        The Site may use basic cookies or similar technologies needed for it to function and to understand
        general usage. You can control cookies through your browser settings.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may request that we access, correct, or delete the personal information you&rsquo;ve submitted
        to us. To do so, contact us using the details below.
      </p>

      <h2>Children&rsquo;s Privacy</h2>
      <p>
        The Site is intended for a general audience and is not directed to children under 13, and we do
        not knowingly collect personal information from them.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about this policy? Call us at <a href={company.phoneHref}>{company.phone}</a> or visit us
        at {company.addressOneLine}. You can also reach us through our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  )
}
