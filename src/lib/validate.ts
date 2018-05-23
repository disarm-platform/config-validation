import { TConfig } from './config';
import { EStatus, TNodeResponse, TUnifiedResponse } from './responses';

export function validate(config: TConfig): TUnifiedResponse {
  return {
    messages: [{ description: 'thing' }],
    status: EStatus.Green
  };
}
