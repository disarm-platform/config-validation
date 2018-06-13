import { JSONSchema6 } from 'json-schema';
import ConfigSchema from '../config_schema.json';
import { EdgeDefinitions } from '../EdgeDefinitions';
import { TConfig } from './config_types/TConfig';
import { determine_unified_response } from './determine_unified_response';
import { PathMap } from './helper_functions/path_mapping';
import { ESchemaStatus } from './TSchemaResponse';
import { EUnifiedStatus, TUnifiedResponse } from './TUnifiedResponse';
import { validate_edges } from './validate_edges';
import { validate_schema } from './validate_schema';

/**
 * Validate the given `config` object
 * @param {TConfig} config
 * @returns {TUnifiedResponse}
 */
export function validate(config: TConfig): TUnifiedResponse {
  //
  // STEP 0: gather what you need - after this point, no data/config is imported
  //
  const config_schema: JSONSchema6 = ConfigSchema;
  const path_map = PathMap;
  const edge_definitions = EdgeDefinitions;

  //
  // STEP 1: Schema validation
  // Ensure that config meets basic schema validation requirements
  //
  const schema_response = validate_schema(config, config_schema);
  // Return early if failing schema validation. End of the road.
  if (schema_response.status === ESchemaStatus.Red) {
    return {
      message: 'Schema validation failed',
      status: EUnifiedStatus.Red,
      edge_messages:[],
      support_messages: [schema_response.errors],
    };
  }

  //
  // STEP 2: Edges validation
  // Check that requirements are met for all required edges
  //
  const edge_responses = validate_edges(config, path_map, edge_definitions);

  //
  // STEP 3: Combine responses, and determine unified response
  // Put it all together, and what have you got?
  //
  return determine_unified_response(edge_responses);
}

