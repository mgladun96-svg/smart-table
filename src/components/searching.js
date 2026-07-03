import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  const comparator = createComparison({
    rules: {
      ...rules.skipEmptyTargetValues,
      ...rules.searchMultipleFields(
        'search',
        ['date', 'customer', 'seller'],
        false
      )
    }
  });

  return (data, state, action) => {
    // @todo: #5.2 — применить компаратор
    const searchQuery = state[searchField]?.trim().toLowerCase() || '';

    if (!searchQuery) {
      return data;
    }

    return data.filter(item => comparator.compare(item, searchQuery));
  };
}