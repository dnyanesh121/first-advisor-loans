import Icon from "../../assets/icons/Icon";

/** Icon + title + content card (.info-card). */
export default function InfoCard({ icon, title, children, className = "", index = 0, step = 0.08, cols = 3 }) {
  return (
    <div className={`info-card reveal ${className}`.trim()} style={{ "--d": (index % cols) * step + "s" }}>
      <span className="ic"><Icon name={icon} /></span>
      <div><b>{title}</b>{children}</div>
    </div>
  );
}
