import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — AI Crypto Bot",
  description:
    "Website usage rules educational nature of materials disclaimer of warranties and limitation of liability",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 prose prose-invert">
      <h1>Terms of Use</h1>

      <p>
        This site is provided “as is” The materials are for educational purposes only and{" "}
        <strong>do not constitute investment advice</strong>
      </p>

      <h2>Permitted use</h2>
      <ul>
        <li>Viewing marketing materials demo data and documentation</li>
        <li>Any copying only with attribution to the source</li>
        <li>Reverse engineering unauthorized access or spam is prohibited</li>
      </ul>

      <h2>Disclaimer of warranties</h2>
      <p>
        We do not guarantee profitability continuity or error free operation of the
        site or the data
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The team is not responsible for any losses related to the use of the site
        materials
      </p>

      <h2>Contacts</h2>
      <p>
        For questions please use the <a href="/contact">Contact</a> page
      </p>
    </div>
  );
}
