import Modal from "../common/Modal";
import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field from "../Forms/Field";
import { LOANS } from "../../data/loans";

const OPTIONS = [...LOANS.map((l) => l.name), "Not sure yet"];

/** "Talk to a Loan Advisor" callback request. */
export default function ConsultModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} id="consultModal" title={<>Talk to a <em className="hl">Loan Advisor</em></>} subtitle="Share a few details and an advisor will call you back.">
      <ValidatedForm className="stack" successTitle="Request received" success="An advisor will call you within one working day.">
        <Field id="cm-name" label="Full Name" name="name" required />
        <Field id="cm-phone" label="Mobile Number" phone required />
        <Field id="cm-loan" label="Loan you need" as="select" options={OPTIONS} />
        <SubmitButton className="btn btn--primary btn--block btn--lg">Request Callback</SubmitButton>
      </ValidatedForm>
    </Modal>
  );
}
