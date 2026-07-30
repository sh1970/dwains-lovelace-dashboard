"use strict";

const DEVICES_PATH = "/dwains-dashboard/devices";
const HOME_PATH = "/dwains-dashboard/home";
const MORE_PAGES_PATH = "/dwains-dashboard/more_page";
const MORE_PAGE_PREFIX = `${MORE_PAGES_PATH}_`;

function normalizePathname(value) {
  const pathname = String(value || "").split("#", 1)[0].split("?", 1)[0];
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function normalizeHash(value) {
  const hash = String(value || "").replace(/^#/, "");
  try {
    return decodeURIComponent(hash);
  } catch (_error) {
    return hash;
  }
}

function morePageRoutePath(foldername) {
  const routeName = String(foldername || "")
    .toLowerCase()
    .replace(/'/g, "_")
    .replace(/ /g, "_");
  return `${MORE_PAGE_PREFIX}${routeName}`;
}

function navigationLocationPath(location, fallback = "") {
  if (!location?.pathname) return String(fallback || "");
  return `${location.pathname}${location.search || ""}${location.hash || ""}`;
}

function currentLocation(currentPath, fallbackHash = "") {
  const value = String(currentPath || "");
  const hashIndex = value.indexOf("#");
  return {
    pathname: normalizePathname(value),
    hash: normalizeHash(hashIndex === -1 ? fallbackHash : value.slice(hashIndex)),
  };
}

function createNavigationActiveState({
  currentPath,
  fallbackHash,
  devices = {},
  morePages = {},
}) {
  const { pathname, hash } = currentLocation(currentPath, fallbackHash);
  const visibleDevice = Object.entries(devices).find(
    ([key, device]) => device?.show_in_navbar && normalizeHash(key) === hash,
  )?.[0];
  const visibleMorePage = Object.entries(morePages).find(
    ([key, page]) => page?.show_in_navbar
      && morePageRoutePath(key) === pathname,
  )?.[0];
  const isDevicesRoute = pathname === DEVICES_PATH;
  const isMorePageRoute = pathname === MORE_PAGES_PATH
    || pathname.startsWith(MORE_PAGE_PREFIX);

  return {
    home: pathname === HOME_PATH,
    devices: isDevicesRoute && visibleDevice === undefined,
    device: (key) => isDevicesRoute && visibleDevice === key,
    morePages: isMorePageRoute && visibleMorePage === undefined,
    morePage: (key) => isMorePageRoute && visibleMorePage === key,
  };
}

module.exports = {
  createNavigationActiveState,
  morePageRoutePath,
  navigationLocationPath,
};
