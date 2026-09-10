import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Rainbow Agency",
  description: "How Rainbow Agency collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm mb-8 transition-colors"
        >
          ← Back to Rainbow
        </Link>

        <div className="mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-violet-400">Legal</span>
          <h1 className="font-display font-extrabold text-4xl text-white mt-2 mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm">Last updated: September 10, 2026</p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-slate-400">
          {[
            {
              title: "1. Information We Collect",
              body: `We collect information you provide directly to us, such as when you fill out a contact form, apply for a job, or subscribe to our newsletter. This includes name, email address, company name, and project details. We also collect usage data automatically when you visit our website, including IP address, browser type, pages visited, and time spent on each page via cookies and analytics tools.`,
            },
            {
              title: "2. How We Use Your Information",
              body: `We use the information collected to respond to inquiries, process job applications, send newsletters (only with your explicit consent), improve our website experience, and comply with legal obligations. We never sell your personal data to third parties.`,
            },
            {
              title: "3. Cookies",
              body: `We use essential cookies for website functionality and analytics cookies (with your consent) to understand how visitors interact with our site. You can manage cookie preferences at any time via our Cookie Settings page or your browser settings.`,
            },
            {
              title: "4. Data Sharing",
              body: `We may share your data with trusted service providers (e.g., email platforms, cloud hosting) who process data on our behalf under strict data processing agreements. We do not share your data with advertisers or unrelated third parties.`,
            },
            {
              title: "5. Data Retention",
              body: `We retain your personal data only as long as necessary for the purpose it was collected. Contact inquiries are retained for 24 months. Newsletter subscribers' data is retained until you unsubscribe. Job application data is kept for 12 months.`,
            },
            {
              title: "6. Your Rights (GDPR / CCPA)",
              body: `Depending on your jurisdiction, you have rights including: access to your data, rectification of inaccurate data, erasure ('right to be forgotten'), restriction of processing, data portability, and the right to object. To exercise these rights, email us at privacy@rainbow.agency.`,
            },
            {
              title: "7. Security",
              body: `We implement industry-standard security measures including TLS encryption in transit, AES-256 encryption at rest, and regular security audits. No method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
            },
            {
              title: "8. Third-Party Links",
              body: `Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their privacy policies.`,
            },
            {
              title: "9. Children's Privacy",
              body: `Our services are not directed to children under 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, please contact us immediately.`,
            },
            {
              title: "10. Changes to This Policy",
              body: `We may update this Privacy Policy periodically. We will notify you of material changes by updating the date at the top of this page and, where appropriate, sending an email notification.`,
            },
            {
              title: "11. Contact Us",
              body: `For privacy-related questions or requests: Rainbow Agency Inc., privacy@rainbow.agency. We aim to respond to all requests within 30 days.`,
            },
          ].map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-white font-display font-bold text-lg mb-2">{title}</h2>
              <p className="leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
