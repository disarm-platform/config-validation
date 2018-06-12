// tslint:disable:no-mixed-interface
export interface Element {
  type: string;
  name: string;
  [k: string]: any;
}

export interface Page {
  elements: Element[];
  name: string;
}

export interface TForm {
  pages: Page[];
}