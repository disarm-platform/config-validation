// tslint:disable:no-expression-statement
import {test} from 'ava';
import {Config} from '../../definitions'
import {EEdgeStatus , TEdgeResponse} from "../EdgeResponse";
import {irs_plan_validations} from './irs_plan'


test('planning_level And Map focus available', t => {
  const config: Config = JSON.parse(JSON.stringify({
    "applets": {
      "irs_plan": {}
    },
    "config_id": "",
    "config_version": "",
    "map_focus": {
      "zoom": 5
    },
    "spatial_hierarchy": {
      "markers": {
        "planning_level_name": "village"
      }
    }
  }))

  const result: TEdgeResponse =  irs_plan_validations(config);
  t.is(result.status,EEdgeStatus.Green)
})

test('planing level available, map focus not availble' , t =>{
  const config: Config = JSON.parse(JSON.stringify({
    "applets": {
      "irs_plan": {}
    },
    "config_id": "",
    "config_version": "",
    "spatial_hierarchy": {
      "markers": {
        "planning_level_name": "village"
      }
    }
  }))

  const result: TEdgeResponse =  irs_plan_validations(config);
  t.is(result.status,EEdgeStatus.Blue)
})

test('planing level not available, map focus available', t => {
    const config: Config = JSON.parse(JSON.stringify({
      "applets": {
        "irs_plan": {}
      },
      "config_id": "",
      "config_version": "",
      "map_focus": {
        "zoom": 5
      },
      "spatial_hierarchy": {
        "markers": {
        }
      }
    }))


    const result: TEdgeResponse =  irs_plan_validations(config);
    t.is(result.status,EEdgeStatus.Yellow)

})

test('both planing level and map focus are not available', t => {
    const config: Config = JSON.parse(JSON.stringify({
      "applets": {
        "irs_plan": {}
      },
      "config_id": "",
      "config_version": "",
      "spatial_hierarchy": {
        "markers": {
        }
      }
    }))

    const result: TEdgeResponse =  irs_plan_validations(config);
    t.is(result.status,EEdgeStatus.Yellow)
})
