"use strict";

const MORE_PAGE_SAVED_EVENT = "dwains-dashboard-more-page-saved";
const MORE_PAGE_METADATA_CHANGED_EVENT =
  "dwains-dashboard-more-page-metadata-changed";

function dispatchMorePageSaved(target, page) {
  if (!target || typeof target.dispatchEvent !== "function") {
    throw new TypeError("A More Page event target is required");
  }
  if (!page || typeof page !== "object" || !page.foldername || !page.card) {
    throw new TypeError("A complete saved More Page is required");
  }
  target.dispatchEvent(new CustomEvent(MORE_PAGE_SAVED_EVENT, {
    detail: { page },
  }));
}

function dispatchMorePageMetadataChanged(target, page) {
  if (!target || typeof target.dispatchEvent !== "function") {
    throw new TypeError("A More Page event target is required");
  }
  if (!page || typeof page !== "object" || !page.foldername) {
    throw new TypeError("More Page metadata with a folder name is required");
  }
  target.dispatchEvent(new CustomEvent(MORE_PAGE_METADATA_CHANGED_EVENT, {
    detail: { page },
  }));
}

module.exports = {
  MORE_PAGE_METADATA_CHANGED_EVENT,
  MORE_PAGE_SAVED_EVENT,
  dispatchMorePageMetadataChanged,
  dispatchMorePageSaved,
};
