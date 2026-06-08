import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "./privacy-policy";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Aurum Interiors" },
      {
        name: "description",
        content:
          "The terms governing your use of the Aurum Interiors boutique, bespoke design services and client account.",
      },
      { property: "og:title", content: "Terms of Service — Aurum Interiors" },
      {
        property: "og:description",
        content:
          "Read the terms that apply to purchases, commissions and the use of the Aurum Interiors website.",
      },
      { property: "og:url", content: "/terms-of-service" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/terms-of-service" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="Updated 1 January 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of
        the Aurum Interiors website, online boutique and related services. By placing
        an order or using our site you agree to be bound by these Terms.
      </p>

      <h2>1. About us</h2>
      <p>
        Aurum Interiors is a European atelier specialising in handcrafted furniture,
        bespoke commissions and interior design services. References to &ldquo;we&rdquo;
        and &ldquo;our&rdquo; refer to Aurum Interiors and its affiliates.
      </p>

      <h2>2. Eligibility &amp; account</h2>
      <p>
        You must be at least 18 years old and able to enter a binding contract. You are
        responsible for the accuracy of your account information and for safeguarding
        your credentials.
      </p>

      <h2>3. Orders &amp; commissions</h2>
      <ul>
        <li>All orders are subject to acceptance and availability of materials.</li>
        <li>Prices, lead times and product specifications are indicative and may change without notice prior to order confirmation.</li>
        <li>Bespoke commissions are governed by an additional written brief and may require a non-refundable deposit.</li>
        <li>Natural materials such as leather, marble, travertine and wood exhibit unique variations — these are an inherent feature of artisanal craftsmanship.</li>
      </ul>

      <h2>4. Pricing, payment &amp; taxes</h2>
      <p>
        Prices are displayed in the applicable currency and may exclude duties, taxes
        and delivery charges, which are calculated at checkout. Payment is processed
        through certified providers; we never store your full card details.
      </p>

      <h2>5. Delivery &amp; white-glove service</h2>
      <p>
        Delivery timelines are estimates. Title and risk of loss pass to you upon
        delivery. White-glove placement, installation and packaging removal are
        included on eligible items as indicated at checkout.
      </p>

      <h2>6. Returns &amp; cancellations</h2>
      <p>
        Stocked pieces may be returned within 14 days of delivery in their original
        condition, subject to inspection. Bespoke, custom-finished or made-to-order
        commissions are non-returnable except where faulty. Please contact client
        services to arrange a return.
      </p>

      <h2>7. Warranty</h2>
      <p>
        Aurum pieces are accompanied by a lifetime craftsmanship warranty against
        manufacturing defects under normal residential use. The warranty does not cover
        natural ageing, misuse, accidental damage or commercial environments unless
        otherwise specified.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        All content on this site — including imagery, designs, drawings, copy and
        trademarks — is owned by Aurum Interiors or licensed to us. You may not copy,
        reproduce or commercially exploit this content without prior written consent.
      </p>

      <h2>9. Acceptable use</h2>
      <p>
        You agree not to misuse the site, attempt to interfere with its operation, or
        use it for any unlawful purpose. We reserve the right to suspend access for
        breach of these Terms.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Aurum Interiors will not be liable for
        indirect, consequential or incidental losses arising from use of the site or
        our products. Nothing in these Terms excludes liability that cannot be
        excluded by law.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These Terms are governed by the laws of the European jurisdiction in which
        Aurum Interiors is established. Disputes will be submitted to the exclusive
        jurisdiction of the competent courts of that jurisdiction, subject to your
        mandatory consumer rights.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update these Terms from time to time. The version in force at the time
        of your order will apply to that order.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions? Please write to{" "}
        <a href="mailto:clientservices@auruminteriors.com">
          clientservices@auruminteriors.com
        </a>{" "}
        or visit our <Link to="/account">client portal</Link>.
      </p>
    </LegalLayout>
  );
}
