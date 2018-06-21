import { flatten } from 'lodash'
import { TConfig } from "../config_types/TConfig";
import { EFieldType, TFieldSummary, TGeodataSummary, TSpatialHierarchy } from "../config_types/TSpatialHierarchy";
import { markers_valid } from '../helper_functions/markers_valid';
import { required_properties_on_sh_level } from '../helper_functions/required_properties_spatial_hierarchy_level';
import { ECustomEdgeStatus, TCustomEdgeResponse, TCustomEdgeResponses } from "../TCustomEdgeResponse";




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
    const support_messages = required_properties_on_all_levels.map(v => v.message);
    responses.push({
      message: 'Some fields missing from the level definition: ' + support_messages.join(', '),
      status: ECustomEdgeStatus.Red,
    })
  }

  // Check `markers` properties are valid
  const markers_are_valid = markers_valid(spatial_hierarchy, geodata_summary);
  if (markers_are_valid.status !== ECustomEdgeStatus.Green) {
    responses.push({
      message: 'Some fields missing from the level definition: ' + markers_are_valid.message,
      status: ECustomEdgeStatus.Red
    });
  }

  // The given ID fields are unique, exist on all features, and are of consistent type
  const id_fields_are_valid = valid_id_fields(spatial_hierarchy, geodata_summary)
  if (!id_fields_are_valid.every(l => l.status === ECustomEdgeStatus.Green)) {
    const support_messages = flatten(id_fields_are_valid.map(v => v.message));
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


export function valid_id_fields(spatial_hierarchy: TSpatialHierarchy, geodata_summary: TGeodataSummary): TCustomEdgeResponse[] {
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