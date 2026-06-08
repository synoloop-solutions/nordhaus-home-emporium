import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Aurum Interiors" },
      {
        name: "description",
        content:
          "How Aurum Interiors collects, uses and safeguards your personal information across our atelier, online boutique and bespoke design services.",
      },
      { property: "og:title", content: "Privacy Policy — Aurum Interiors" },
      {
        property: "og:description",
        content:
          "Our commitment to privacy, data protection and the responsible handling of client information.",
      },
      { property: "og:url", content: "/privacy-policy" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <LegalLayout title="Privacy Policy" updated="Updated 1 January 2026"><PrivacyBody /></LegalLayout>;
}

function PrivacyBody() {
  return (
    <>
      <p>
        Aurum Interiors (&ldquo;Aurum&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is
        committed to protecting the privacy of every client, design partner and visitor
        to our atelier and digital boutique. This Privacy Policy explains what personal
        information we collect, how we use it and the rights you hold over your data.
      </p>

      <h2>1. Information we collect</h2>
      <p>We collect information necessary to provide our furniture, bespoke design and concierge services, including:</p>
      <ul>
        <li>Contact details such as name, email address, postal address and telephone number.</li>
        <li>Order, billing and shipping information required to fulfil a purchase or commission.</li>
        <li>Account credentials, wishlist and saved preferences when you create an account.</li>
        <li>Communications with our atelier, design studio or client services team.</li>
        <li>Technical information including device, browser, IP address and pages visited, collected through cookies and similar technologies.</li>
      </ul>

      <h2>2. How we use your information</h2>
      <p>Your information is used to:</p>
      <ul>
        <li>Process orders, payments, deliveries and after-sales care, including white-glove logistics.</li>
        <li>Manage bespoke commissions, design consultations and trade accounts.</li>
        <li>Send editorial dispatches and collection previews when you have opted in.</li>
        <li>Improve our boutique, materials library and client experience.</li>
        <li>Comply with our legal, tax and regulatory obligations.</li>
      </ul>

      <h2>3. Legal bases for processing</h2>
      <p>
        We process personal data on the basis of contractual necessity (to fulfil your
        order), legitimate interests (to operate and improve our business), legal
        obligation, and consent (for marketing and non-essential cookies). You may
        withdraw consent at any time.
      </p>

      <h2>4. Sharing your information</h2>
      <p>
        We share information only with carefully selected partners who help us deliver
        our services — including payment processors, logistics and white-glove delivery
        partners, IT providers and professional advisors. Each partner is bound by
        contractual confidentiality and data-protection obligations. We do not sell your
        personal data.
      </p>

      <h2>5. International transfers</h2>
      <p>
        Aurum Interiors operates from Europe and may transfer data internationally where
        necessary. Such transfers are protected by appropriate safeguards including
        Standard Contractual Clauses.
      </p>

      <h2>6. Retention</h2>
      <p>
        We retain personal information for as long as necessary to provide our services,
        comply with our legal obligations, and resolve disputes. Order records are
        typically retained for ten years for accounting and warranty purposes.
      </p>

      <h2>7. Your rights</h2>
      <p>Subject to applicable law, you have the right to:</p>
      <ul>
        <li>Access, correct or delete your personal information.</li>
        <li>Object to or restrict certain processing.</li>
        <li>Request data portability.</li>
        <li>Withdraw consent for marketing or non-essential cookies at any time.</li>
        <li>Lodge a complaint with your local data-protection authority.</li>
      </ul>

      <h2>8. Cookies</h2>
      <p>
        We use cookies and similar technologies as described in our{" "}
        <Link to="/cookie-policy">Cookie Policy</Link>. You can manage your preferences
        at any time from the footer of the site.
      </p>

      <h2>9. Security</h2>
      <p>
        We employ administrative, technical and physical safeguards designed to protect
        personal information, including encryption in transit, access controls and
        regular security reviews.
      </p>

      <h2>10. Children</h2>
      <p>
        Our services are intended for adults. We do not knowingly collect personal data
        from individuals under the age of 16.
      </p>

      <h2>11. Updates to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be
        communicated through the boutique or by email where appropriate.
      </p>

      <h2>12. Contact</h2>
      <p>
        For privacy enquiries, please write to{" "}
        <a href="mailto:privacy@auruminteriors.com">privacy@auruminteriors.com</a> or
        contact our client services team via your <Link to="/account">account</Link>.
      </p>
    </>
  );
}

function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:py-28">
      <header className="border-b border-border/60 pb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-accent">
          Legal
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{updated}</p>
      </header>
      <div className="legal-prose mt-10 text-foreground/85">
        {children}
      </div>

    </article>
  );
}

export { LegalLayout };
