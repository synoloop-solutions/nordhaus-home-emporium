import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LegalLayout } from "./privacy-policy";
import { openCookieSettings } from "@/components/CookieConsent";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Aurum Interiors" },
      {
        name: "description",
        content:
          "How Aurum Interiors uses cookies and similar technologies, and how you can manage your preferences.",
      },
      { property: "og:title", content: "Cookie Policy — Aurum Interiors" },
      {
        property: "og:description",
        content:
          "Details of the cookie categories used on the Aurum Interiors website and how to control them.",
      },
      { property: "og:url", content: "/cookie-policy" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="Updated 1 January 2026">
      <p>
        This Cookie Policy explains how Aurum Interiors uses cookies and similar
        technologies on our website. It should be read alongside our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website.
        They enable essential functionality, remember preferences and help us
        understand how the boutique is used.
      </p>

      <h2>2. Categories of cookies we use</h2>
      <ul>
        <li>
          <strong>Strictly necessary</strong> — required for core functionality such as
          your cart, checkout, security and load balancing. These cannot be switched off.
        </li>
        <li>
          <strong>Analytics</strong> — help us measure aggregate traffic patterns so we
          can refine the editorial experience. Data is anonymised wherever possible.
        </li>
        <li>
          <strong>Marketing</strong> — enable tailored editorial content and collection
          previews across selected partner platforms.
        </li>
        <li>
          <strong>Preferences</strong> — remember region, language and recently viewed
          pieces to personalise your visit.
        </li>
      </ul>

      <h2>3. Managing your preferences</h2>
      <p>
        You can change your cookie preferences at any time using the button below or
        the &ldquo;Cookie Settings&rdquo; link in the footer. You may also control
        cookies through your browser settings; please note that disabling strictly
        necessary cookies may affect site functionality.
      </p>
      <p>
        <Button onClick={openCookieSettings} className="tracking-[0.16em]">
          Open cookie settings
        </Button>
      </p>

      <h2>4. Third-party cookies</h2>
      <p>
        Some cookies are set by trusted third parties (for example analytics or
        payment providers). These partners are contractually bound to safeguard your
        data and use it only for the purposes we authorise.
      </p>

      <h2>5. Retention</h2>
      <p>
        Cookies are retained for varying durations depending on their purpose, from
        the length of your session to up to 24 months. Your consent record is stored
        for up to 12 months, after which we will ask you again.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about cookies? Please write to{" "}
        <a href="mailto:privacy@auruminteriors.com">privacy@auruminteriors.com</a>.
      </p>
    </LegalLayout>
  );
}
