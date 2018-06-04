import ConfigSchema from '../config_schema.json';
import { TConfig } from '../definitions/TConfig';
import { determine_unified_response } from './determine_unified_response';
import PathMap from './helpers/path_map';
import { ESchemaStatus } from './TSchemaResponse';
import { EUnifiedStatus, TUnifiedResponse } from './TUnifiedResponse';
import { validate_edges } from './validate_edges';
import { validate_schema } from './validate_schema';


export function validate(config: TConfig): TUnifiedResponse {
  // Step 0: gather what you need
  const config_schema = ConfigSchema;
  const path_map = PathMap;

  //
  // STEP 1: Schema validation
  // Ensure that config meets basic schema validation requirements
  //
  const schema_response = validate_schema(config, config_schema);
  // Return early if failing schema validation
  if (schema_response.status === ESchemaStatus.Red) {
    return {
      messages: ['Schema validation failed', ...schema_response.errors],
      status: EUnifiedStatus.Red
    };
  }

  //
  // STEP 2: Edges validation
  // Check that requirements are met for all required edges
  //
  const edge_responses = validate_edges(config, path_map);

  //
  // STEP 3: Combine responses, and determine unified response
  // Put it all together, and what have you got?
  // TODO: Decide if want to return early for failing schema?
  //
  return determine_unified_response(edge_responses);
}

