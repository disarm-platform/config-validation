// tslint:disable:no-expression-statement
import {test} from 'ava';
import {Config} from '../../definitions'
import {EdgeStatus, TEdgeResponse} from "../EdgeResponse";
import {irs_tasker_spatial_hierarchy_validations} from "./irs_tasker_spatial_hierarchy";


test('planning_level  available', t => {
  // @ts-ignore
  const config: Config = {
    "applets": {
      "irs_plan": {}
    },
    "spatial_hierarchy": {
      "markers": {
        "planning_level_name": "village"
      }
    }
  }

  const result: TEdgeResponse = irs_tasker_spatial_hierarchy_validations(config);
  t.is(result.status, EdgeStatus.Green)
})

test('planing level available, map focus not availble', t => {
  // @ts-ignore
  const config: Config = {
    "applets": {
      "irs_plan": {}
    },
    "spatial_hierarchy": {
      "markers": {}
    }
  }

  const result: TEdgeResponse = irs_tasker_spatial_hierarchy_validations(config);
  t.is(result.status, EdgeStatus.Yellow)
})
