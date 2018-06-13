// tslint:disable
// tslint:disable:no-submodule-imports
// @ts-ignore
import Ajv from 'ajv';
// @ts-ignore
import draft_6 from 'ajv/lib/refs/json-schema-draft-06.json';
import { TConfig } from './config_types/TConfig';
import { ESchemaStatus, TSchemaResponse } from './TSchemaResponse';
import { JSONSchema6 } from 'json-schema';

const ajv = new Ajv();
// tslint:disable:no-expression-statement
ajv.addMetaSchema(draft_6);

export function validate_schema(config: TConfig, config_schema: JSONSchema6): TSchemaResponse {
  const schema_valid = ajv.validate(config_schema, config);

  if (schema_valid) {
    return {
      status: ESchemaStatus.Green,
      errors: 'Schema validation passed'
    };
  } else {
    return {
      status: ESchemaStatus.Red,
      errors: `Schema validation errors: ${ajv.errorsText()}`
    };
  }
}
