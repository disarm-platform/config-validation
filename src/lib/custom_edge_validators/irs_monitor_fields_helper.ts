import { TConfig } from "../config_types/TConfig";
import { decorator_fields, form_fields } from "../helpers";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";


export function irs_monitor_fields_helper(config: TConfig) : TEdgeResponse {
  if (!config.decorators) {
    return {
      messages: ['Could be BLue'],
      status: EEdgeStatus.Red
    }
  }

  if (!config.form) {
    return {
      messages: ['Could be BLue'],
      status: EEdgeStatus.Red
    }
  }

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
  
  const decoratorsFromConfig = decorator_fields(config.decorators)

  for (const decorator of decorators) {
    if (!decoratorsFromConfig.includes(decorator)) {
      return {
        messages: [`The field '_decorated.${decorator}' in map configuration is not in the decorators` ],
        status: EEdgeStatus.Yellow
      }
    }
  }

  const formFieldsFromConfig = form_fields(config.form)

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
        messages: [`The field 'form_data.${formField}' in map configuration is not in the form` ],
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
        messages: [`The field 'form_data.${formField}' in chart configuration with is not in the form` ],
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
        messages: [`The field '_decorated.${decorator}' in map configuration is not in the decorators` ],
        status: EEdgeStatus.Yellow
      }
    }
  }

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}