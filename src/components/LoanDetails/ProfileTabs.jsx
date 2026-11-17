import { useState } from "react";

/**
 * Tabs by applicant profile (Salaried / Self-employed / …) used for eligibility and documents.
 * data: { [profile]: rows } · render(rows) → body. Tabs are hidden when there is only one profile.
 */
export default function ProfileTabs({ data, render }) {
  const keys = Object.keys(data);
  const [k, setK] = useState(keys[0]);
  return (
    <>
      <div className="tabs" role="tablist" hidden={keys.length < 2}>
        {keys.map((x) => <button type="button" role="tab" key={x} aria-selected={x === k} onClick={() => setK(x)}>{x}</button>)}
      </div>
      {render(data[k])}
    </>
  );
}
