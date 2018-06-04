// tslint:disable:no-expression-statement
import {test} from 'ava';
import {TConfig} from '../config_types/TConfig'
import {EEdgeStatus , TEdgeResponse} from "../TEdgeResponse";
import {irs_plan_map_focus} from "./irs_plan_map_focus";


test('map focus not available', t => {
  // @ts-ignore
  const config: TConfig = {
    "applets": {
      "irs_plan": {}
    }
  }

  const result: TEdgeResponse =  irs_plan_map_focus(config);
  t.is(result.status,EEdgeStatus.Blue)
})

test('Unavailble irs_plan applet should return Blue Status for missing optional node', t => {
  // @ts-ignore
  const config: TConfig = {
    "applets": {
    }
  }

  const result: TEdgeResponse =  irs_plan_map_focus(config);
  t.is(result.status,EEdgeStatus.Blue)
})

test('map focus availble' , t =>{
  // @ts-ignore
  const config: TConfig = {
    "applets": {
      "irs_plan": {}
    },
    "map_focus": {
      "zoom": 5
    },
  }

  const result: TEdgeResponse =  irs_plan_map_focus(config);
  t.is(result.status,EEdgeStatus.Green)
})
