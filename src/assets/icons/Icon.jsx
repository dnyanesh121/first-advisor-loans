import { ICON_PATHS } from "./iconPaths";

/**
 * 24px stroke icon from the site's icon set.
 * <Icon name="heart" />  <Icon name="chevron" className="caret" />  <Icon name="star2" fill="currentColor" />
 */
export default function Icon({ name, size, className, style, fill = "none", strokeWidth = 1.8 }) {
  const s = size ? { width: size, height: size, ...style } : style;
  return (
    <svg
      className={className}
      style={s}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || "" }}
    />
  );
}
