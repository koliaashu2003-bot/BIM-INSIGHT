export function TermsPage() {
  return (
    <main className="page">
      <p className="eyebrow reveal">Legal</p>
      <h1 className="section-title reveal">Terms &amp; Conditions</h1>
      <div className="prose reveal-2">
        <p style={{ color: 'var(--muted)' }}>
          <em>Template text — replace with your reviewed legal copy before launch.</em>
        </p>

        <h2>1. Beta &amp; free use</h2>
        <p>
          BIM Insight is currently offered as a free beta. Access to the quiz and the Dynamo script
          library is provided at no cost and without warranty. Features and availability may change.
        </p>

        <h2>2. Accounts</h2>
        <p>
          You are responsible for the information you provide and for activity under your account.
          Provide accurate details and keep your credentials secure.
        </p>

        <h2>3. Scripts &amp; content</h2>
        <p>
          Scripts are shared by the community and by BIM Insight. Always review and test any script in
          a non-production model before use. You are responsible for how you use downloaded scripts. By
          uploading a script you confirm you have the right to share it and grant other users a licence
          to download and use it during the beta.
        </p>

        <h2>4. Acceptable use</h2>
        <p>
          Do not upload malicious code, infringing content, or material you do not have rights to.
          Ratings and comments must be respectful and relevant.
        </p>

        <h2>5. Liability</h2>
        <p>
          BIM Insight is provided “as is.” To the maximum extent permitted by law, we are not liable for
          any loss or damage arising from use of the platform or any script obtained through it.
        </p>

        <h2>6. Changes &amp; future paid tiers</h2>
        <p>
          We may introduce paid/premium tiers in future. Any paid features and their terms will be
          presented clearly before purchase. Continued use after changes constitutes acceptance.
        </p>

        <h2>7. Privacy</h2>
        <p>
          We collect the account details you provide to operate the service. A full privacy policy will
          accompany the production release.
        </p>
      </div>
    </main>
  )
}
