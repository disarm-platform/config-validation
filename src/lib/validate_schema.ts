// tslint:disable
// tslint:disable:no-submodule-imports
// @ts-ignore
import Ajv from 'ajv';
// @ts-ignore
import draft_6 from 'ajv/lib/refs/json-schema-draft-06.json';
import { TConfig } from '../definitions/TConfig';
import { ESchemaStatus, TSchemaResponse } from './TSchemaResponse';
import { JSONSchema6 } from 'json-schema';

const ajv = new Ajv();
// tslint:disable:no-expression-statement
ajv.addMetaSchema(draft_6); // TODO: Is required?

export function validate_schema(config: TConfig, config_schema: JSONSchema6): TSchemaResponse {
  const valid = ajv.validate(config_schema, config);

  switch (valid) {
    case (true):
      return {
        status: ESchemaStatus.Green,
        errors: 'No errors'
      };
    case (false):
      return {
        status: ESchemaStatus.Red,
        errors: ajv.errorsText()
      };
    default:
      return {
        status: ESchemaStatus.Red,
        errors: 'Unknown schema status'
      };
  }
}
