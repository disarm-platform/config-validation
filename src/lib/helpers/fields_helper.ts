import { TDecorators } from "../../definitions/TDecorators";
import { TConfig } from "../../definitions/TConfig";
import { get_form_fields } from "./form_helpers";

export function get_decorator_field_names(decorators: TDecorators) : string[] {
  return Object.keys(decorators)
}

export function get_all_field_names(config: TConfig) : string[] {
  const formFields = get_form_fields(config.form)
  const decoratorFields = get_decorator_field_names(config.decorators)

  return [...formFields, ...decoratorFields]
}