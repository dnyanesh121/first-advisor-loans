import { useEffect } from "react";

const SITE = "First Advisors Loans";

/** Sets the browser tab title. Pass `full` to use the title as-is. */
export default function useDocumentTitle(title, full = false) {
  useEffect(() => {
    document.title = !title ? SITE : full ? title : `${title} | ${SITE}`;
  }, [title, full]);
}
