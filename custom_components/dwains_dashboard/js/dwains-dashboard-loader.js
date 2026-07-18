(function () {
  "use strict";

  if (window.__dd_route_loader_installed) return;
  window.__dd_route_loader_installed = true;

  const isDwainsRoute = () => {
    const path = window.location.pathname || "";
    return path === "/dwains-dashboard" || path.startsWith("/dwains-dashboard/");
  };

  const restoreDwainsRouteIfNeeded = () => {
    if (isDwainsRoute()) return false;
    try {
      const restoreUntil = Number(localStorage.getItem("dwains_dashboard_restore_until"));
      if (!restoreUntil || Date.now() > restoreUntil) return false;
      const stored = localStorage.getItem("dwains_dashboard_last_url");
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
    if (!isDwainsRoute() || window.__dd_route_bundle_requested) return;
    window.__dd_route_bundle_requested = true;
    import(bundleUrl()).catch((err) => {
      window.__dd_route_bundle_requested = false;
      console.error("Dwains Dashboard: failed to load route bundle", err);
    });
  };

  load();
  window.addEventListener("location-changed", load);
  window.addEventListener("popstate", load);
})();
