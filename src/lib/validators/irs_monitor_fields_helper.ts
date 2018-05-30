import { Config } from "../../definitions";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";
import { get_decorator_field_names } from "../helper_functions/fields_helper";
import { get_form_fields } from "../helper_functions/form_helpers";


export function irs_monitor_fields_helper(config: Config) : TEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  const fields = config.applets.irs_monitor.map.response_point_fields

  const decorators = fields
    .filter(field => {
      return field.startsWith('_decorated.')
    })
    .map(field => {
      return field.replace('_decorated.', '')
    })
  
  const decoratorsFromConfig = get_decorator_field_names(config.decorators)

  for (const decorator of decorators) {
    if (!decoratorsFromConfig.includes(decorator)) {
      return {
        messages: [{ description: `The field '_decorated.${decorator}' in map configuration is not in the decorators` }],
        status: EEdgeStatus.Yellow
      }
    }
  }

  const formFieldsFromConfig = get_form_fields(config.form)

  const formFields = fields
    .filter(field => {
      return field.startsWith('form_data.')
    })
    .map(field => {
      return field.replace('form_data.', '')
    })

  for (const formField of formFields) {
    if (!formFieldsFromConfig.includes(formField)) {
      return {
        messages: [{ description: `The field 'form_data.${formField}' in map configuration is not in the form` }],
        status: EEdgeStatus.Yellow
      }
    }
  }


  const generateSeriesFromFields = config.applets.irs_monitor.charts
    .filter(chartConfig => {
      // only get charts with this property
      return chartConfig.options.generate_series_from
    })
    .map(chartConfig => {
      // grab that property
      return chartConfig.options.generate_series_from as string
    })
    .filter(generateSeriesFrom=> {
      // TODO: Check other fields like 'location.selection.id` and 'recorded_on'
      // @ts-ignore
      // only get the ones that reference data we can check against.
      return generateSeriesFrom.startsWith('form_data.') || generateSeriesFrom.startsWith('_decorated.')
    })


  const generateSeriesFromFieldsForm = generateSeriesFromFields
    .filter(field => {
      return field.startsWith('form_data.')
    })
    .map(field => {
      return field.replace('form_data.', '')
    })

  for (const formField of generateSeriesFromFieldsForm) {
    if (!formFieldsFromConfig.includes(formField)) {
      return {
        messages: [{ description: `The field 'form_data.${formField}' in chart configuration with is not in the form` }],
        status: EEdgeStatus.Yellow
      }
    }
  }
  
  
  const generateSeriesFromFieldsDecorated = generateSeriesFromFields
    .filter(field => {
      return field.startsWith('_decorated.')
    })
    .map(field => {
      return field.replace('_decorated.', '')
    })

  for (const decorator of generateSeriesFromFieldsDecorated) {
    if (!decoratorsFromConfig.includes(decorator)) {
      return {
        messages: [{ description: `The field '_decorated.${decorator}' in map configuration is not in the decorators` }],
        status: EEdgeStatus.Yellow
      }
    }
  }

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}