import type { Metadata } from "next";
import { Prose } from "@/components/visual/Prose";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Crypto Bot",
  description:
    "How we process minimal technical data cookies and analytics Transparency and user control",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Prose>
        <h1>Privacy Policy</h1>

        <p>
          We respect your privacy and only collect minimal technical data
          necessary for site operation and basic analytics No personal data
          is collected without your consent
        </p>

        <h2 id="data-we-collect">What data we collect</h2>
        <ul>
          <li>Anonymous visit statistics page views events</li>
          <li>Technical error logs anonymized</li>
          <li>
            Data from forms name email message only if you submit them
          </li>
        </ul>

        <h2 id="cookies">Cookies</h2>
        <p>
          We use minimal cookies to remember consent choices and enable
          analytics only with your agreement You can change your choice in
          the banner
        </p>

        <h2 id="analytics">Analytics</h2>
        <p>
          We may use lightweight analytics eg Plausible or Google Analytics 4
          only after your consent in the cookie banner Data is anonymized
        </p>

        <h2 id="storage-and-deletion">Storage and deletion</h2>
        <p>
          Contact data from forms is stored as long as needed to process the
          request and then deleted You can request deletion of your data by
          contacting us via the <a href="/contact">Contact</a> page
        </p>

        <h2 id="contacts">Contacts</h2>
        <p>
          Send privacy related questions via the{" "}
          <a href="/contact">Contact</a> page
        </p>
      </Prose>
    </div>
  );
}
