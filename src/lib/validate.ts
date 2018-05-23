import {
  TConfig,
  TInstanceConfig,
  TNumberConfig,
  TStringConfig
} from './Config';
import { ENodeStatus, TNodeResponse } from './NodeResponse';
import { EUnifiedStatus, TUnifiedResponse } from './UnifiedResponse';

/**
 * Take the whole config and figure if it's valid.
 * @param {TConfig} config
 * @returns {TUnifiedResponse}
 */
export function validate(config: TConfig): TUnifiedResponse {
  // Figure all the parts needed
  // Validate each in turn
  const description = `${
    config.number_config ? config.number_config.number : 0
  }`;

  return {
    messages: [{ description }],
    status: EUnifiedStatus.Green
  };
}

/**
 * Take individual nodes of the config, and figure if they are valid.
 * @param {TNumberConfig | TStringConfig} node
 * @returns {TNodeResponse}
 */
export function validate_node(
  node: TNumberConfig | TStringConfig | TInstanceConfig
): TNodeResponse {
  const description = (node as TNumberConfig).number ? 'one' : 'zero';

  return {
    messages: [{ description }],
    status: ENodeStatus.Blue
  };
}
