import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field from "../Forms/Field";

/** Navy sidebar newsletter box (Learn and guide pages). */
export default function SubscribeBox({ id }) {
  return (
    <div className="panel" style={{ background: "var(--grad-navy)", color: "#fff" }}>
      <b style={{ fontSize: 17 }}>Rate updates &amp; offers</b>
      <p style={{ fontSize: 13, opacity: 0.85, margin: "6px 0 12px" }}>Rate changes, festive offers and borrowing tips. One email a month.</p>
      <ValidatedForm className="stack" successTitle="Subscribed" success="You're subscribed.">
        <Field id={id} sm type="email" required aria-label="Email" placeholder="Your email" />
        <SubmitButton className="btn btn--primary btn--sm btn--block">Subscribe</SubmitButton>
      </ValidatedForm>
    </div>
  );
}
