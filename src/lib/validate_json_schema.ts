// tslint:disable:no-submodule-imports
// @ts-ignore
import Ajv from 'ajv';
// @ts-ignore
import draft_6 from 'ajv/lib/refs/json-schema-draft-06.json';
import schemaDefinitions from '../config_schema';

const ajv = new Ajv();

// tslint:disable:no-expression-statement
ajv.addMetaSchema(draft_6);

export function validateJsonSchema(data: any): boolean {
  const validate = ajv.compile(schemaDefinitions);
  return validate(data) as boolean;
}
