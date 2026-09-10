import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Rainbow Agency",
  description: "Terms and conditions governing use of Rainbow Agency services.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-slate-500 text-sm">Last updated: September 10, 2026</p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-slate-400">
          {[
            {
              title: "1. Acceptance of Terms",
              body: `By accessing or using the Rainbow Agency website and services, you agree to be bound by these Terms of Service. If you do not agree to all terms, please do not use our services. These terms apply to all visitors, clients, and others who access the service.`,
            },
            {
              title: "2. Services Description",
              body: `Rainbow Agency provides creative and technology services including web development, mobile app development, AI solutions, UI/UX design, cloud infrastructure, SEO & marketing, and DevOps. Specific service terms are outlined in individual client agreements (Statements of Work).`,
            },
            {
              title: "3. Client Obligations",
              body: `Clients agree to provide accurate project information, timely feedback within agreed review windows, and payment in accordance with invoicing terms. Delays caused by client feedback or approvals will extend project timelines proportionally.`,
            },
            {
              title: "4. Payment Terms",
              body: `Project fees are outlined in the relevant Statement of Work. Monthly retainer fees are invoiced on the 1st of each month and due within 14 days. Project payments typically follow a 50% deposit / 50% completion structure unless otherwise agreed. Late payments accrue interest at 1.5% per month.`,
            },
            {
              title: "5. Intellectual Property",
              body: `Upon full payment, clients receive full ownership of deliverables created specifically for their project. Rainbow Agency retains the right to display work in our portfolio unless otherwise agreed in writing. We retain ownership of all pre-existing tools, frameworks, and methodologies used in delivery.`,
            },
            {
              title: "6. Confidentiality",
              body: `Both parties agree to maintain confidentiality of proprietary information shared during the engagement. We will not disclose client information to third parties without prior written consent, except as required by law.`,
            },
            {
              title: "7. Limitation of Liability",
              body: `To the maximum extent permitted by law, Rainbow Agency's total liability to any client for any claim arising from services shall not exceed the total fees paid by that client in the 3 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.`,
            },
            {
              title: "8. Warranties",
              body: `We warrant that our services will be performed with reasonable skill and care. We do not warrant that deliverables will be error-free or uninterrupted. We provide a 90-day bug-fix warranty on all development deliverables.`,
            },
            {
              title: "9. Termination",
              body: `Either party may terminate an engagement with 30 days written notice. Clients are responsible for fees incurred up to the termination date. In cases of material breach, either party may terminate immediately with written notice.`,
            },
            {
              title: "10. Governing Law",
              body: `These terms are governed by the laws of the State of New York, USA, without regard to conflict of law principles. Any disputes will be resolved in the courts of New York County.`,
            },
            {
              title: "11. Changes to Terms",
              body: `We reserve the right to update these terms. We will provide reasonable notice of material changes. Continued use of our services after changes constitutes acceptance.`,
            },
            {
              title: "12. Contact",
              body: `For questions about these terms: legal@rainbow.agency — Rainbow Agency Inc., New York, NY.`,
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
