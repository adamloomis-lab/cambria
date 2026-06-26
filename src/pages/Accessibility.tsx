import LegalLayout from '../components/LegalLayout'
import { company } from '../data/site'

export default function Accessibility() {
  return (
    <LegalLayout title="Accessibility Statement" updated="May 2026">
      <p>
        {company.name} is committed to making our website accessible and welcoming to everyone, including
        people with disabilities. We want every guest, online and in our dining room, to be able to find
        our menu, hours, and location with ease.
      </p>

      <h2>Our Commitment</h2>
      <p>
        We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines
        explain how to make web content more accessible for people with a wide range of disabilities. We
        build this Site with semantic markup, descriptive alternative text for images, keyboard-navigable
        controls, and color choices intended to meet contrast standards.
      </p>

      <h2>Ongoing Effort</h2>
      <p>
        Accessibility is an ongoing effort. We periodically review the Site and work to improve it. Some
        content provided by third parties (such as embedded maps or social media) may not be fully under
        our control, and we encourage those providers to maintain accessible experiences.
      </p>

      <h2>Known Limitations</h2>
      <p>
        Despite our efforts, some portions of the Site may not yet be fully accessible. If you encounter a
        barrier, please let us know, your feedback helps us improve.
      </p>

      <h2>Contact Us About Accessibility</h2>
      <p>
        If you have trouble accessing any part of this Site, or have a suggestion, please call us at{' '}
        <a href={company.phoneHref}>{company.phone}</a> or visit us at {company.addressOneLine}. We&rsquo;ll
        do our best to provide the information you need in a way that works for you, and to address the
        issue promptly.
      </p>
    </LegalLayout>
  )
}
