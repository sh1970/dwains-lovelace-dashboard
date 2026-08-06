"use strict";

function attachDeferredCard(item, createCard) {
  if (!item || typeof createCard !== "function") {
    throw new TypeError("Deferred cards require an item and a card factory");
  }

  let inFlight;
  item.cardFactory = () => {
    if (item.card) return Promise.resolve(item.card);
    if (!inFlight) {
      inFlight = Promise.resolve()
        .then(createCard)
        .then((card) => {
          item.card = card;
          inFlight = undefined;
          return card;
        })
        .catch((error) => {
          inFlight = undefined;
          throw error;
        });
    }
    return inFlight;
  };
  return item;
}

module.exports = { attachDeferredCard };
