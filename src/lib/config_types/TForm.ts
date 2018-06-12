export interface Element {
  type: string;
  name: string;
}

export interface Page {
  elements: Element[];
  name: string;
}

export interface TForm {
  pages: Page[];
}