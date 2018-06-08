import { TConfig } from "../config_types/TConfig";
import { all_fields as the_all_fields, decorator_fields } from './fields_helper';
import { form_fields } from "./form_helpers";

export interface THelpers {
  all_fields: string[];
  form_fields: string[];
  decorator_fields: string[];
}

export function create_helper_objects(config: TConfig): THelpers{
  return {
    all_fields: the_all_fields(config),
    decorator_fields: config.decorators ? decorator_fields(config.decorators) : [],
    form_fields: config.form ? form_fields(config.form): [],
  }
}