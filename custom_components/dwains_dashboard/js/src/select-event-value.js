"use strict";

function readSelectEvent(event) {
  const target = event?.currentTarget || event?.target;
  const field = target?.name || target?.dataset?.field || target?.type;
  let value = event?.detail?.value;

  if (value === undefined && event?.detail?.index !== undefined) {
    const index = event.detail.index;
    value = target?.children?.[index]?.value ?? target?.items?.[index]?.value;
  }
  if (value === undefined && event?.target !== target) {
    value = event?.target?.value;
  }
  value ??= target?.value ?? target?.selectedValue;

  return { field, value };
}

module.exports = { readSelectEvent };
