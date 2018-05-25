export interface LocationSelectionOption {
  id: number | string;
  name: string;
  category: string;
}

export interface LocationSelection {
  [k: string]: LocationSelectionOption;
}