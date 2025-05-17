export type SortKey = 'ascending' | 'descending' | 'rating';

export interface SortOption {
  label: string;
  value: SortKey;
}

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Price: Ascending', value: 'ascending' },
  { label: 'Price: Descending', value: 'descending' },
  { label: 'Rating', value: 'rating' }
];
