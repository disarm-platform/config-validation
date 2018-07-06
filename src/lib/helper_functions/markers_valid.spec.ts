// tslint:disable:no-expression-statement
import test from 'ava';
import { EFieldType, TGeodataSummary, TSpatialHierarchy } from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { markers_valid } from './markers_valid';


test('planning_level_name is a level in geodata', t => {
  const geodata_summary: TGeodataSummary = {
    villages: [{ field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number }]
  }

  const sh: TSpatialHierarchy = {
    data_version: 0,
    geodata_summary,
    levels: [],
    markers: {
      denominator_fields: {
        denominator1: 'denominator_field'
      },
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
    }
  };

  const actual = markers_valid(sh);
  const expected = ECustomEdgeStatus.Green;
  t.is(actual.status, expected)
});

test('planning_level_name is NOT a level in geodata', t => {
  const geodata_summary: TGeodataSummary = {
    not_villages: [{ field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number }]
  }

  const sh: TSpatialHierarchy = {
    data_version: 0,
    geodata_summary,
    levels: [],
    markers: {
      denominator_fields: {
        denominator1: 'denominator_field'
      },
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
    }
  }

  const actual = markers_valid(sh);
  const expected = ECustomEdgeStatus.Red;
  t.is(actual.status, expected)
});

test('record_location_selection_level_name is a level in geodata', t => {
  const geodata_summary: TGeodataSummary = {
    villages: [{ field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number }]
  }

  const sh: TSpatialHierarchy = {
    data_version: 0,
    geodata_summary,
    levels: [],
    markers: {
      denominator_fields: {
        denominator1: 'denominator_field'
      },
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
    }
  }

  const actual = markers_valid(sh);
  const expected = ECustomEdgeStatus.Green;
  t.is(actual.status, expected)
});

test('record_location_selection_level_name is NOT a level in geodata', t => {
  const geodata_summary: TGeodataSummary = {
    not_villages: [{ field_name: 'id', unique: true, exists_on_all: true, type: EFieldType.Number }]
  }

  const sh: TSpatialHierarchy = {
    data_version: 0,
    geodata_summary,
    levels: [],
    markers: {
      denominator_fields: {
        denominator1: 'denominator_field'
      },
      planning_level_name: 'not_villages',
      record_location_selection_level_name: 'villages',
    }
  }

  const actual = markers_valid(sh);
  const expected = ECustomEdgeStatus.Red;
  t.is(actual.status, expected)
});


test('denominator_fields exist on geodata', t => {
  const geodata_summary: TGeodataSummary = {
    villages: [{ field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number }]
  }

  const sh: TSpatialHierarchy = {
    data_version: 0,
    geodata_summary,
    levels: [],
    markers: {
      denominator_fields: {
        denominator1: 'denominator_field'
      },
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
    }
  }

  const actual = markers_valid(sh);
  const expected = ECustomEdgeStatus.Green;
  t.is(actual.status, expected)
});

test('denominator_fields DO NOT exist on geodata', t => {
  const geodata_summary: TGeodataSummary = {
    villages: [{ field_name: 'denominator_field', unique: true, exists_on_all: true, type: EFieldType.Number }]
  }

  const sh: TSpatialHierarchy = {
    data_version: 0,
    geodata_summary,
    levels: [],
    markers: {
      denominator_fields: {
        denominator1: 'different_denominator_field'
      },
      planning_level_name: 'villages',
      record_location_selection_level_name: 'villages',
    }
  }

  const actual = markers_valid(sh);
  const expected = ECustomEdgeStatus.Red;
  t.is(actual.status, expected)
});