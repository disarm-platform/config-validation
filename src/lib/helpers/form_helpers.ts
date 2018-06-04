import { TForm } from "../../config_types/TForm";

// Copied from douma

export interface TFormElement {
  page: number;
  name: string;
  type: string;
}

function get_form_elements(form: TForm): TFormElement[] {
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

function form_fields(form: TForm) : string[] {
  return get_form_elements(form).map(e => e.name)
}

export { get_form_elements, form_fields }
