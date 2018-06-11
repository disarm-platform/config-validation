// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { TSpatialHierarchy } from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { spatial_hierarchy_geodata_levels } from './spatial_hierarchy_geodata_levels';

test('should return Green status', t => {
  const empty_object = {}
  const result = spatial_hierarchy_geodata_levels(empty_object as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})

test('should return Green when spatial_hierarchy is valid', t => {
  const spatial_hierarchy: TSpatialHierarchy =  {
    "data_version": 4,
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "villages",
      "record_location_selection_level_name": "villages",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_levels(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})

test('should return Red when planning_level_name is missing', t => {
  const spatial_hierarchy: TSpatialHierarchy = {
    "data_version": 4,
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "clusters",
      "record_location_selection_level_name": "villages",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_levels(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})

test('should return Red when planning_level_name is missing', t => {
  const spatial_hierarchy: TSpatialHierarchy = {
    "data_version": 4,
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "villages",
      "record_location_selection_level_name": "clusters",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_levels(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})