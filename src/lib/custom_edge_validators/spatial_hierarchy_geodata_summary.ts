import { flatten, get } from 'lodash'
import { TConfig } from "../config_types/TConfig";
import { EFieldType, TFieldSummary, TGeodataSummary, TLevel, TSpatialHierarchy  } from "../config_types/TSpatialHierarchy";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";


export interface TValidationResponse {
  support_messages: string[];
  message: string;
  status: ECustomEdgeStatus;
}

export function spatial_hierarchy_geodata_summary(config: TConfig): TCustomEdgeResponses {
  const spatial_hierarchy = config.spatial_hierarchy as TSpatialHierarchy
  const geodata_summary = spatial_hierarchy.geodata_summary as TGeodataSummary;
  const planning_level_name = spatial_hierarchy.markers.planning_level_name
  const record_location_selection_level_name = spatial_hierarchy.markers.record_location_selection_level_name
  const level_names = spatial_hierarchy.levels.map(l => l.name)
  

  const responses: TCustomEdgeResponses = []

  if (!level_names.includes(planning_level_name)) {
    responses.push({
      message: `planning_level_name (${planning_level_name}) missing from spatial_hierarchy.levels`,
      status: ECustomEdgeStatus.Red
    })
  }

  if (!level_names.includes(record_location_selection_level_name)) {
    responses.push({
      message: `record_location_selection_level_name (${record_location_selection_level_name}) missing from spatial_hierarchy.levels`,
      status: ECustomEdgeStatus.Red
    })
  }


  // insert validate_spatial_hierarchy_function here

  // TODO: Check every spatial_hierarchy level exists in the geodata_summary

  // Every property given in spatial_hierarchy level exists in the geodata
  const required_properties_on_all_levels = spatial_hierarchy.levels.map(level => {
    const fields_summary = geodata_summary[level.name];
    return required_properties_on_sh_level(level, fields_summary);
  });

  if (!required_properties_on_all_levels.every(l => l.status === ECustomEdgeStatus.Green)) {
    const support_messages = flatten(required_properties_on_all_levels.map(v => v.support_messages));
    responses.push({
      message: 'Some fields missing from the level definition: ' + support_messages.join(', '),
      status: ECustomEdgeStatus.Red,
    })
  }

  // Check `markers` properties are valid
  const markers_are_valid = markers_valid(spatial_hierarchy, geodata_summary);
  if (markers_are_valid.status !== ECustomEdgeStatus.Green) {
    responses.push({
      message: 'Some fields missing from the level definition: ' + markers_are_valid.support_messages.join(', '),
      status: ECustomEdgeStatus.Red
    });
  }

  // The given ID fields are unique, exist on all features, and are of consistent type
  const id_fields_are_valid = valid_id_fields(spatial_hierarchy, geodata_summary)
  if (!id_fields_are_valid.every(l => l.status === ECustomEdgeStatus.Green)) {
    const support_messages = flatten(id_fields_are_valid.map(v => v.support_messages));
    responses.push({
      message: 'Problems with fields used as IDs:' + support_messages.join(', '),
      status: ECustomEdgeStatus.Red,
    })
  }

  if (responses.length) {
    return responses
  } 
    
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}


export function required_properties_on_sh_level(spatial_hierarchy_level: TLevel, geodata_properties_summary: TFieldSummary[]): TValidationResponse {
  const required_fields = ['group_by_field', 'field_name']
    .map(n => get(spatial_hierarchy_level, n))
    .filter(i => i);

  const all_required_fields_exist = required_fields.map((field_name): TValidationResponse => {
    const found = geodata_properties_summary.find(s => s.field_name === field_name);
    if (found) {
      return {
        message: 'Found',
        status: ECustomEdgeStatus.Green,
        support_messages: []
      };
    } else {
      return {
        message: `${field_name} missing`,
        status: ECustomEdgeStatus.Red,
        support_messages: [`${field_name} missing from geodata properties`]
      };
    }
  });

  if (all_required_fields_exist.every(e => e.status === ECustomEdgeStatus.Green)) {
    return {
      message: 'All required fields exist',
      status: ECustomEdgeStatus.Green,
      support_messages: []
    };
  } else {
    return {
      message: 'Missing fields',
      status: ECustomEdgeStatus.Red,
      support_messages: flatten(all_required_fields_exist.map(e => e.support_messages))
    };
  }
}

export function markers_valid(spatial_hierarchy: TSpatialHierarchy, geodata_summary: TGeodataSummary): TValidationResponse {
  const markers = spatial_hierarchy.markers;
  const geodata_layer_names = Object.keys(geodata_summary);

  // planning_level_name is a level
  const planning_level_name_valid = geodata_layer_names.includes(markers.planning_level_name);
  if (!planning_level_name_valid) {
    return {
      message: 'planning_level_name invalid',
      status: ECustomEdgeStatus.Red,
      support_messages: [`Cannot find ${markers.planning_level_name} in markers ${JSON.stringify(markers)}`]
    }
  }
  // record_location_selection_level_name is a level
  const record_location_selection_level_name_valid = geodata_layer_names.includes(markers.record_location_selection_level_name);
  if (!record_location_selection_level_name_valid) {
    return {
      message: 'record_location_selection_level_name invalid',
      status: ECustomEdgeStatus.Red,
      support_messages: [`Cannot find ${markers.planning_level_name} in markers ${JSON.stringify(markers)}`]
    }
  }

  // denominator_fields exist on the planning_level_name level
  // Only check these if the planning_level_name is valid
  const denominator_fields = Object.values(markers.denominator_fields);
  const denominator_level = geodata_summary[markers.planning_level_name];
  const level_fields = denominator_level.map(l => l.field_name);
  const denominator_fields_valid = denominator_fields.every(f => level_fields.includes(f));
  if (!denominator_fields_valid) {
    return {
      message: 'Denominator fields invalid',
      status: ECustomEdgeStatus.Red,
      support_messages: [`Looking for: ${denominator_fields}`, `Found: ${level_fields}`]
    }
  } else {
    return {
      message: 'Markers valid',
      status: ECustomEdgeStatus.Green,
      support_messages: [],
    }
  }

}

export function valid_id_fields(spatial_hierarchy: TSpatialHierarchy, geodata_summary: TGeodataSummary): TValidationResponse[] {
  return spatial_hierarchy.levels.map(level => {
    const level_summary = geodata_summary[level.name]
    // level.field_name needs to exist_on_all, be unique, consistent type
    // level.display_field_name needs to exist_on_all, 
    // level.group_by_field if given, needs to exists in summary_fields

    const support_messages = [`Level: ${JSON.stringify(level)}`, `Summary: ${JSON.stringify(level_summary)}`];

    const valid_level_field_name = unique_omnipresent_reliable(find(level.field_name, level_summary));
    if (!valid_level_field_name) {
      return {
        message: 'Invalid level field_name',
        status: ECustomEdgeStatus.Red,
        support_messages
      }
    }

    const valid_level_display_field_name = unique_omnipresent_reliable(find(level.display_field_name, level_summary));
    if (!valid_level_display_field_name) {
      return {
        message: 'Invalid level display_field_name',
        status: ECustomEdgeStatus.Red,
        support_messages
      }
    }

    const valid_level_group_by_field = level.group_by_field ? omnipresent_reliable(find(level.group_by_field, level_summary)) : true;
    if (!valid_level_group_by_field) {
      return {
        message: 'Invalid level group_by_field',
        status: ECustomEdgeStatus.Red,
        support_messages
      }
    }

    return {
      message: `Valid level fields`,
      status: ECustomEdgeStatus.Green,
      support_messages
    }
  })
}

function unique_omnipresent_reliable(found: TFieldSummary): boolean {
  return found.unique && found.exists_on_all && valid_type(found.type)
}

function omnipresent_reliable(found: TFieldSummary): boolean {
  return found.exists_on_all && valid_type(found.type)
}

function valid_type(type: EFieldType): boolean {
  return (type !== EFieldType.Unreliable) && (type !== EFieldType.NotSet);
}

function find(field_name: string, level_summary: TFieldSummary[]): TFieldSummary {
  return level_summary.find(l => l.field_name === field_name) as TFieldSummary;
}