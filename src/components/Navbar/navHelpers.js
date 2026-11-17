/* Small helpers for the header. */
import { getLoan, loanUrl } from "../../utils/lookup";
import { rate } from "../../utils/format";

export { getLoan, loanUrl };
export const rateLabel = (key) => rate(getLoan(key).rate);
