import { TConfig } from "../config_types/TConfig";
import { TDecorators } from "../config_types/TDecorators";
import { form_fields } from "./index";

export type TFields = string[]

export function decorator_fields(decorators: TDecorators) : string[] {
  return Object.keys(decorators)
}

export function all_fields(config: TConfig) : TFields {
  if (!config.form || !config.decorators) {
    console.log('Some problem. Bad way to handle it... this looks like an array of fields')
    return []
  }

  const formFields = form_fields(config.form)
  const decoratorFields = decorator_fields(config.decorators)

  return [...formFields, ...decoratorFields]
}
