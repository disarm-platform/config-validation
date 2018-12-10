// tslint:disable:no-expression-statement
import test from 'ava';
import {
  EFieldType,
  TSpatialHierarchy
} from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { valid_id_fields } from './valid_id_fields';

test('basic', t => {
  const sh: TSpatialHierarchy = {
    data_version: 0,
    geodata_summary: {
      villages: [
        {
          exists_on_all: true,
          field_name: 'id',
          type: EFieldType.Number,
          unique: true
        }
      ]
    },
    levels: [
      {
        level_id: 'id',
        display_field_name: 'id',
        field_name: 'id',
        name: 'villages'
      }
    ],
    markers: {
      denominator_fields: {
        denominator_fields1: 'id'
      },
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages'
    }
  };

  const actual = valid_id_fields(sh).map(a => a.status);
  const expected = [ECustomEdgeStatus.Green];
  t.deepEqual(actual, expected);
});

test('fail with duplicate ids', t => {
  const sh: TSpatialHierarchy = {
    data_version: 0,
    geodata_summary: {
      villages: [
        {
          exists_on_all: true,
          field_name: 'id',
          type: EFieldType.Number,
          unique: false
        }
      ]
    },
    levels: [
      {
        level_id: 'id',
        display_field_name: 'id',
        field_name: 'id',
        name: 'villages'
      }
    ],
    markers: {
      denominator_fields: {
        denominator_fields1: 'id'
      },
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages'
    }
  };

  const actual = valid_id_fields(sh).map(a => a.status);
  const expected = [ECustomEdgeStatus.Red];
  t.deepEqual(actual, expected);
});
