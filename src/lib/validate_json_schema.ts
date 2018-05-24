// tslint:disable:no-submodule-imports
// @ts-ignore
import Ajv from 'ajv';
// @ts-ignore
import draft_6 from 'ajv/lib/refs/json-schema-draft-06.json';

import schemaDefinitions from '../schema';
// @ts-ignore
// tslint:disable:no-expression-statement
// tslint:disable:no-object-mutation
// tslint:disable:no-string-literal

// We need to add the $id, so we can reference it below
schemaDefinitions['$id'] = 'defs.json';

const ajv = new Ajv();

// tslint:disable:no-expression-statement
ajv.addMetaSchema(draft_6);
ajv.addSchema(schemaDefinitions);

export function validateJsonSchema(schemaName: string, data: any): boolean {
  const schema = { $ref: `defs.json#/definitions/${schemaName}` };
  const validate = ajv.compile(schema);
  return validate(data) as boolean;
}
