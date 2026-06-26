import LegalLayout from '../components/LegalLayout'
import { company } from '../data/site'

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="May 2026">
      <p>
        Welcome to cambriasbistro.com (the &ldquo;Site&rdquo;), operated by {company.name}. By
        accessing or using the Site, you agree to these Terms of Service. If you do not agree, please do
        not use the Site.
      </p>

      <h2>Use of the Site</h2>
      <p>
        You may use the Site for your own personal, non-commercial purposes, to view our menu, hours,
        location, and to contact us. You agree not to misuse the Site, interfere with its operation, or use
        it for any unlawful purpose.
      </p>

      <h2>Menu, Pricing &amp; Availability</h2>
      <p>
        We work to keep our menu and prices accurate, but items, prices, and availability are subject to
        change without notice. The menu shown on this Site is for general reference; please call{' '}
        <a href={company.phoneHref}>{company.phone}</a> to confirm current offerings and pricing.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The content on this Site, including text, logos, and images, is the property of {company.name} or
        its licensors and may not be copied or reused without permission.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        The Site may link to third-party websites (such as our Facebook page or map providers). We are not
        responsible for the content or practices of those external sites.
      </p>

      <h2>Disclaimer &amp; Limitation of Liability</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent
        permitted by law, {company.name} is not liable for any damages arising from your use of the Site.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site after changes are posted
        means you accept the updated Terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these Terms? Call us at <a href={company.phoneHref}>{company.phone}</a> or visit{' '}
        {company.addressOneLine}.
      </p>
    </LegalLayout>
  )
}
