import { TConfig } from "../config_types/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";


export function irs_record_point_form(config: TConfig): TEdgeResponse {
  if (!config.applets.irs_record_point) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  if (!config.form) {
    return {
      messages: ['Form missing, is required for irs_record_point.'],
      status: EEdgeStatus.Yellow
    }
  }

  if (config.form.pages.length === 0) {
    return {
      messages: ['Form has no pages, is required for irs_record_point.'],
      status: EEdgeStatus.Yellow
    }
  }

  // TODO: can probably check validity of form using surveyjs

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}