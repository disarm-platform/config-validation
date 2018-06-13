import { TForm } from "../config_types/TForm";

export interface TFormElement {
  page: number;
  name: string;
  type: string;
}

export function get_form_elements(form: TForm): TFormElement[] {  
  if (!form.pages) {
    return []
  }

  const arr: TFormElement[] = []
  form.pages.forEach((page, i) => {
    if (page.elements) {
      page.elements.forEach(element => {
        if (arr.find(j => j.name === element.name)) {
          return
        }

        arr.push({
          name: element.name,
          page: i,
          type: element.type
        })
      })
    }
  })
  return arr
}

export function form_fields(form: TForm) : string[] {
  return get_form_elements(form).map(e => e.name)
}

