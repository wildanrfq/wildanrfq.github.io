// Loads Umami analytics only when a website id is configured.
// Umami is used because it's privacy friendly, cookieless, and has a free
// hosted tier at umami.is (or self host it). Skips loading entirely in dev.

export function initAnalytics() {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  const scriptSrc =
    import.meta.env.VITE_UMAMI_SCRIPT_URL ||
    "https://cloud.umami.is/script.js";

  if (!websiteId || import.meta.env.DEV) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = scriptSrc;
  script.setAttribute("data-website-id", websiteId);
  document.head.appendChild(script);
}
