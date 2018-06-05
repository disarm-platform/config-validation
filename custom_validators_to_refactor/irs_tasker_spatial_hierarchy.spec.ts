// tslint:disable:no-expression-statement
import {test} from 'ava';
import {TConfig} from '../src/lib/config_types/TConfig'
import {ECustomEdgeStatus, TCustomEdgeResponse} from "../src/lib/TCustomEdgeResponse";
import {irs_tasker_spatial_hierarchy} from "./irs_tasker_spatial_hierarchy";


test('planning_level  available', t => {
  // @ts-ignore
  const config: TConfig = {
    "applets": {
      "irs_plan": {}
    },
    "spatial_hierarchy": {
      "markers": {
        "planning_level_name": "village"
      }
    }
  }

  const result: TCustomEdgeResponse = irs_tasker_spatial_hierarchy(config);
  t.is(result.status, ECustomEdgeStatus.Green)
})

test('planing level available, map focus not availble', t => {
  // @ts-ignore
  const config: TConfig = {
    "applets": {
      "irs_plan": {}
    },
    "spatial_hierarchy": {
      "markers": {}
    }
  }

  const result: TCustomEdgeResponse = irs_tasker_spatial_hierarchy(config);
  t.is(result.status, ECustomEdgeStatus.Yellow)
})
