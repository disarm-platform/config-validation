import { TConfig } from '../config_types/TConfig';
import { TForm } from '../config_types/TForm';
import { TIrsRecordPoint } from '../config_types/TIrsRecordPoint';
import { form_fields } from '../helper_functions/form_helpers';
import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';

export function irs_record_point_form(_config: TConfig): TCustomEdgeResponses {
  const form = _config.form as TForm;
  const fields = form_fields(form);
  const irs_record_point = _config.applets.irs_record_point as TIrsRecordPoint;

  // If given, check filter_field in form fields
  const filter_field_given = irs_record_point.filter_field;
  const filter_field_exists = irs_record_point.filter_field && fields.includes(irs_record_point.filter_field);

  if (filter_field_given && !filter_field_exists) {
    return [{
      message: 'filter_field is given but missing from form',
      status: ECustomEdgeStatus.Red
    }]
  }

  return [{
    message: 'Form, required by irs_record_point, is available.',
    status: ECustomEdgeStatus.Green
  }];
}