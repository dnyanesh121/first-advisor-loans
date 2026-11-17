import Modal from "../common/Modal";
import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field, { CheckLabel } from "../Forms/Field";

/** Mobile + OTP login (frontend only). */
export default function LoginModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} id="loginModal" title={<>Login to <em className="hl">First Advisors</em></>} subtitle="Track applications, download statements and raise service requests.">
      <ValidatedForm className="stack" successTitle="OTP requested" success="An OTP would be sent to your mobile on the live site.">
        <Field id="lg-phone" label="Registered mobile number" phone required placeholder="10-digit mobile number" />
        <CheckLabel id="lg-terms" required>I agree to the Terms of Use and Privacy Policy</CheckLabel>
        <SubmitButton className="btn btn--primary btn--block btn--lg">Get OTP</SubmitButton>
        <p className="muted center" style={{ fontSize: 12.5, margin: 0 }}>For loan account servicing, you can also log in to your lender's portal.</p>
      </ValidatedForm>
    </Modal>
  );
}
