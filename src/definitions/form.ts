export interface Page {
  // TODO: Write schema for elements
  elements: any[];
  name: string;
}

export interface Form {
  pages: Page[];
}