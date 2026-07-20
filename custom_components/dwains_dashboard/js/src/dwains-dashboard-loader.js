(function () {
  "use strict";

  if (window.__dd_route_loader_installed) return;
  window.__dd_route_loader_installed = true;

  const LAST_URL_KEY = "dwains_dashboard_last_url";
  const RESTORE_UNTIL_KEY = "dwains_dashboard_restore_until";
  const RESUME_PENDING_KEY = "dwains_dashboard_resume_pending";

  const isDwainsRoute = () => {
    const path = window.location.pathname || "";
    return path === "/dwains-dashboard" || path.startsWith("/dwains-dashboard/");
  };

  const rememberDwainsRouteForResume = () => {
    if (!isDwainsRoute()) return;
    try {
      const url = `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
      localStorage.setItem(LAST_URL_KEY, url);
      localStorage.setItem(RESUME_PENDING_KEY, "1");
    } catch (_) {}
  };

  const restoreDwainsRouteIfNeeded = () => {
    if (isDwainsRoute()) return false;
    try {
      const resumePending = localStorage.getItem(RESUME_PENDING_KEY) === "1";
      const restoreUntil = Number(localStorage.getItem(RESTORE_UNTIL_KEY));
      const legacyRestorePending = Boolean(restoreUntil && Date.now() <= restoreUntil);
      if (!resumePending && !legacyRestorePending) return false;
      const stored = localStorage.getItem(LAST_URL_KEY);
      if (!stored) return false;
      const storedUrl = new URL(stored, window.location.origin);
      if (
        storedUrl.origin !== window.location.origin
        || (storedUrl.pathname !== "/dwains-dashboard" && !storedUrl.pathname.startsWith("/dwains-dashboard/"))
      ) {
        return false;
      }
      history.replaceState(history.state || null, "", `${storedUrl.pathname}${storedUrl.search}${storedUrl.hash}`);
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: true } }));
      return true;
    } catch (_) {
      return false;
    }
  };

  const bundleUrl = () => {
    const url = new URL("/dwains_dashboard/js/dwains-dashboard.js", window.location.origin);
    try {
      const scripts = document.querySelectorAll('script[src*="/dwains_dashboard/js/dwains-dashboard-loader.js"]');
      const script = scripts[scripts.length - 1];
      const version = script && script.src ? new URL(script.src).searchParams.get("version") : "";
      if (version) url.searchParams.set("version", version);
    } catch (_) {}
    return url.href;
  };

  const load = () => {
    restoreDwainsRouteIfNeeded();
    if (!isDwainsRoute()) return;
    if (window.dwains_dashboard && typeof window.dwains_dashboard.resume === "function") {
      window.dwains_dashboard.resume();
    }
    if (window.__dd_route_bundle_requested) return;
    window.__dd_route_bundle_requested = true;
    window.__dd_route_bundle_promise = import(bundleUrl())
      .then(() => {
        if (window.dwains_dashboard && typeof window.dwains_dashboard.resume === "function") {
          return window.dwains_dashboard.resume();
        }
      })
      .catch((err) => {
        window.__dd_route_bundle_requested = false;
        window.__dd_route_bundle_promise = undefined;
        console.error("Dwains Dashboard: failed to load route bundle", err);
      });
  };

  load();
  window.addEventListener("location-changed", load);
  window.addEventListener("popstate", load);
  window.addEventListener("pagehide", rememberDwainsRouteForResume);
  window.addEventListener("freeze", rememberDwainsRouteForResume);
  window.addEventListener("pageshow", load);
  window.addEventListener("online", load);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") rememberDwainsRouteForResume();
    else if (document.visibilityState === "visible") load();
  });
})();
