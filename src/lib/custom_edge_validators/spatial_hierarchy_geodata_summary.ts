import { flatten } from 'lodash';
import { TConfig } from '../config_types/TConfig';
import {
  TGeodataSummary,
  TSpatialHierarchy
} from '../config_types/TSpatialHierarchy';
import { markers_valid } from '../helper_functions/markers_valid';
import { required_properties_on_sh_level } from '../helper_functions/required_properties_spatial_hierarchy_level';
import { valid_id_fields } from '../helper_functions/valid_id_fields';
import {
  ECustomEdgeStatus,
  TCustomEdgeResponses
} from '../TCustomEdgeResponse';

export function spatial_hierarchy_geodata_summary(
  config: TConfig
): TCustomEdgeResponses {
  const spatial_hierarchy = config.spatial_hierarchy as TSpatialHierarchy;
  const geodata_summary = spatial_hierarchy.geodata_summary as TGeodataSummary;
  const responses: TCustomEdgeResponses = [];

  const all_levels_exist_on_geodata_summary = spatial_hierarchy.levels.every(
    level => {
      return geodata_summary.hasOwnProperty(level.name);
    }
  );

  if (!all_levels_exist_on_geodata_summary) {
    // we need to return early as the functions below rely on all things being present
    return [
      {
        message: 'Levels on spatial_hierarchy are missing geodata_summaries',
        status: ECustomEdgeStatus.Red
      }
    ];
  }

  // Every property given in spatial_hierarchy level exists in the geodata
  const required_properties_on_all_levels = spatial_hierarchy.levels.map(
    level => {
      const fields_summary = geodata_summary[level.name];
      return required_properties_on_sh_level(level, fields_summary);
    }
  );

  if (
    !required_properties_on_all_levels.every(
      l => l.status === ECustomEdgeStatus.Green
    )
  ) {
    const support_messages = required_properties_on_all_levels.map(
      v => v.message
    );
    responses.push({
      message:
        'Some fields missing from the level definition: ' +
        support_messages.join(', '),
      status: ECustomEdgeStatus.Red
    });
  }

  // Check `markers` properties are valid
  const markers_are_valid = markers_valid(spatial_hierarchy);
  if (markers_are_valid.status !== ECustomEdgeStatus.Green) {
    responses.push({
      message:
        'Some fields missing from the level definition: ' +
        markers_are_valid.message,
      status: ECustomEdgeStatus.Red
    });
  }

  // The given ID fields are unique, exist on all features, and are of consistent type
  const id_fields_are_valid = valid_id_fields(spatial_hierarchy);
  if (!id_fields_are_valid.every(l => l.status === ECustomEdgeStatus.Green)) {
    const support_messages = flatten(id_fields_are_valid.map(v => v.message));
    responses.push({
      message:
        'Problems with fields used as IDs:' + support_messages.join(', '),
      status: ECustomEdgeStatus.Red
    });
  }

  if (responses.length) {
    return responses;
  }

  return [
    {
      message: 'Nothing to check',
      status: ECustomEdgeStatus.Green
    }
  ];
}
