import { TForm } from "../config_types/TForm";

export interface TFormElement {
  page: number;
  name: string;
  type: string;
}

export function get_form_elements(form: TForm): TFormElement[] {
  // TODO: Should rewrite with .map().filter() instead of forEach, then enable tslint again.
  // tslint:disable
  if (!form.pages) {
    return []
  }

  let arr: TFormElement[] = []
  form.pages.forEach((page, i) => {
    if (page.elements)
      page.elements.forEach(element => {
        if (arr.find(i => i.name === element.name)) return

        arr.push({
          page: i,
          name: element.name,
          type: element.type
        })
      })
  })
  return arr
}

export function form_fields(form: TForm) : string[] {
  return get_form_elements(form).map(e => e.name)
}

