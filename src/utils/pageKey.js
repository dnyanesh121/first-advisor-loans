/** Route identity for page transitions and scroll reset: Apply and Track share one screen. */
export const pageKey = (pathname) => (pathname.startsWith("/apply") ? "/apply" : pathname);
