(function () {
  "use strict";

  if (window.__dd_route_loader_installed) return;
  window.__dd_route_loader_installed = true;

  const isDwainsRoute = () => {
    const path = window.location.pathname || "";
    return path === "/dwains-dashboard" || path.startsWith("/dwains-dashboard/");
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
