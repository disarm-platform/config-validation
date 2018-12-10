// tslint:disable:no-expression-statement
import test from 'ava';
import {
  EFieldType,
  TFieldSummary,
  TLevel
} from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { required_properties_on_sh_level } from './required_properties_spatial_hierarchy_level';

test('basic', t => {
  const sh_level: TLevel = {
    level_id: 'id',
    display_field_name: 'display',
    field_name: 'id',
    name: 'name'
  };

  const layer_summary: TFieldSummary[] = [
    {
      exists_on_all: true,
      field_name: 'id',
      type: EFieldType.Number,
      unique: true
    }
  ];

  const actual = required_properties_on_sh_level(sh_level, layer_summary);
  const expected = ECustomEdgeStatus.Green;

  t.is(actual.status, expected);
});

test('two, both present', t => {
  const sh_level: TLevel = {
    level_id: 'id',
    display_field_name: 'display',
    field_name: 'id',
    group_by_field: 'group_by_this',
    name: 'name'
  };

  const layer_summary: TFieldSummary[] = [
    {
      exists_on_all: true,
      field_name: 'id',
      type: EFieldType.Number,
      unique: true
    },
    {
      exists_on_all: true,
      field_name: 'group_by_this',
      type: EFieldType.Number,
      unique: false
    }
  ];

  const actual = required_properties_on_sh_level(sh_level, layer_summary);
  const expected = ECustomEdgeStatus.Green;

  t.is(actual.status, expected);
});

test('two, one missing', t => {
  const sh_level: TLevel = {
    level_id: 'id',
    display_field_name: 'display',
    field_name: 'id',
    group_by_field: 'group_by_this',
    name: 'name'
  };

  const layer_summary: TFieldSummary[] = [
    {
      exists_on_all: true,
      field_name: 'id',
      type: EFieldType.Number,
      unique: true
    }
  ];

  const actual = required_properties_on_sh_level(sh_level, layer_summary);
  const expected = ECustomEdgeStatus.Red;

  t.is(actual.status, expected);
});
