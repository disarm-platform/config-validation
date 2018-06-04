import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";


export function irs_record_point_form(config: TConfig): TCustomEdgeResponse {
  if (!config.applets.irs_record_point) {
    return {
      messages: [],
      status: ECustomEdgeStatus.Blue
    }
  }

  if (!config.form) {
    return {
      messages: ['Form missing, is required for irs_record_point.'],
      status: ECustomEdgeStatus.Yellow
    }
  }

  if (config.form.pages.length === 0) {
    return {
      messages: ['Form has no pages, is required for irs_record_point.'],
      status: ECustomEdgeStatus.Yellow
    }
  }

  // TODO: can probably check validity of form using surveyjs

  return {
    messages: [],
    status: ECustomEdgeStatus.Green
  }
}
