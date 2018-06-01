import { TForm } from "../../definitions/TForm";

// Copied from douma

export interface FormElement {
  page: number;
  name: string;
  type: string;
}

function get_form_elements(form: TForm): FormElement[] {
  // TODO: Should rewrite with .map().filter() instead of forEach, then enable tslint again.
  // tslint:disable
  if (!form.pages) {
    return []
  }

  let arr: FormElement[] = []
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

function get_form_fields(form: TForm) : string[] {
  return get_form_elements(form).map(e => e.name)
}

export { get_form_elements, get_form_fields }
