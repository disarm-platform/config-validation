// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { config_stub } from '../helpers/config_stub';
import { ECustomEdgeStatus, TCustomEdgeResponse } from '../TCustomEdgeResponse';
import { irs_plan_spatial_hierarchy } from './irs_plan_spatial_hierarchy';


test('planning_level  available', t => {
  // @ts-ignore
  const config: TConfig = {
    ...config_stub,
    spatial_hierarchy: {
      markers: {
        planning_level_name: 'village'
      }
    }
  };

  const result: TCustomEdgeResponse = irs_plan_spatial_hierarchy(config);
  t.is(result.status, ECustomEdgeStatus.Green);
});

test('Unavailble irs plan applet should return blue status for unavailble optional node', t => {
  // @ts-ignore
  const config: TConfig = {
    ...config_stub,
    'spatial_hierarchy': {
      'markers': {
        'planning_level_name': 'village'
      }
    }
  };

  const result: TCustomEdgeResponse = irs_plan_spatial_hierarchy(config);
  t.is(result.status, ECustomEdgeStatus.Blue);
});

test('planing level available, map focus not availble', t => {
  // @ts-ignore
  const config: TConfig = {
    'applets': {
      'irs_plan': {}
    },
    'spatial_hierarchy': {
      'markers': {}
    }
  };

  const result: TCustomEdgeResponse = irs_plan_spatial_hierarchy(config);
  t.is(result.status, ECustomEdgeStatus.Yellow);
});
