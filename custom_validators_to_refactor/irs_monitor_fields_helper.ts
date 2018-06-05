import { TConfig } from "../config_types/TConfig";
import { decorator_fields, form_fields } from "../helpers/index";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";
import { TIrsMonitor } from "../config_types/TIrsMonitor";
import { THelpers } from "../helpers/create_helper_objects";

// Where are fields used
export function irs_monitor_fields_helper(irs_monitor_config: TIrsMonitor, target: object, helpers: THelpers) : TCustomEdgeResponses {
  const required_fields = irs_monitor_config.map.response_point_fields

  const decorators = required_fields
    .map(field => {
      return field.replace(/^_decorated\./, '')
    })

  const decoratorsFromConfig = helpers.decorator_fields

  for (const decorator of decorators) {
    if (!decoratorsFromConfig.includes(decorator)) {
      return {
        messages: [`The field '_decorated.${decorator}' in map configuration is not in the decorators` ],
        status: ECustomEdgeStatus.Yellow
      }
    }
  }

  const formFieldsFromConfig = form_fields(config.form)

  const formFields = required_fields
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
        status: ECustomEdgeStatus.Yellow
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
        status: ECustomEdgeStatus.Yellow
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
        status: ECustomEdgeStatus.Yellow
      }
    }
  }

  return {
    messages: [],
    status: ECustomEdgeStatus.Green
  }
}
