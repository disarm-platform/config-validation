import { TConfig } from "../config_types/TConfig";
import {TValidations} from '../config_types/TValidations';
import { decorators_fields_helper } from './decorators_fields_helper';
import { get_form_fields_for_validations } from './expression_helpers';
import { all_fields, decorator_fields } from './fields_helper';
import { form_fields } from './form_helpers';

export interface THelpers {
  [k: string]: string[]
}

export function create_helpers(config: TConfig): THelpers{
  return {
    all_fields: all_fields(config),
    form_fields:  get_form_fields_for_validations(config.validations ? config.validations as TValidations : []),
  }
}