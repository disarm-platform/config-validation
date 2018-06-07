import { TConfig } from "../config_types/TConfig";
import { all_fields as the_all_fields } from './fields_helper';

export interface THelpers {
  [k: string]: string []
}

export function create_helper_objects(config: TConfig): THelpers{

  return {
    all_fields: the_all_fields(config),
    // TODO: Think: Do we need the form_fields as a helper, below? It's also named incorrectly, should be form_fields_from_validations
    // form_fields: get_form_fields_for_validations(config.validations ? config.validations as TValidations : []),
  }
}