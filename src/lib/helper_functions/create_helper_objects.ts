import { TConfig } from "../config_types/TConfig";
import {TValidations} from '../config_types/TValidations';
import { get_form_fields_for_validations } from './expression_helpers';
import { all_fields as the_all_fields } from './fields_helper';

export interface THelpers {
  [k: string]: string []
}

export function create_helper_objects(config: TConfig): THelpers{

  return {
    all_fields: the_all_fields(config),
    form_fields: get_form_fields_for_validations(config.validations ? config.validations as TValidations : []),
  }
}