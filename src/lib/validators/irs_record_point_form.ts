import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";


export function irs_record_point_form(config: Config): TEdgeResponse {
  if (!config.applets.irs_record_point) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  if (!config.form) {
    return {
      messages: [{ description: 'Form missing, is required for irs_record_point.' }],
      status: EdgeStatus.Yellow
    }
  }

  if (config.form.pages.length === 0) {
    return {
      messages: [{ description: 'Form has no pages, is required for irs_record_point.' }],
      status: EdgeStatus.Yellow
    }
  }

  // TODO: can probably check validity of form using surveyjs

  return {
    messages: [],
    status: EdgeStatus.Green
  }
}