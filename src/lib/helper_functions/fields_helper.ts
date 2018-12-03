import { TConfig } from '../config_types/TConfig';
import { TDecorators } from '../config_types/TDecorators';
import { form_fields } from './form_helpers';

export type TFields = string[];

export function decorator_fields(decorators: TDecorators): string[] {
  return Object.keys(decorators);
}

export function all_fields(config: TConfig): TFields {
  let all_the_fields: string[] = [];

  if (config.form) {
    all_the_fields = form_fields(config.form);
  }

  if (config.decorators) {
    all_the_fields = [
      ...all_the_fields,
      ...decorator_fields(config.decorators)
    ];
  }

  return all_the_fields;
}
