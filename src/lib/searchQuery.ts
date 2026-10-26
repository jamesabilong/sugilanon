// Match the public API validator: surrogate pairs count once and presentation
// selectors do not add a character to an emoji's display form.
export const searchQueryLength = (query: string) =>
  [...query.trim().replace(/[\uFE0E\uFE0F]/g, "")].length;
