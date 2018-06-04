// tslint:disable:no-expression-statement
import {test} from 'ava';
import {TConfig} from '../config_types/TConfig'
import {EEdgeStatus , TEdgeResponse} from "../TEdgeResponse";
import {irs_tasker_map_focus} from "./irs_tasker_map_focus";


test('map focus not available', t => {
  // @ts-ignore
  const config: TConfig = {
    "applets": {
      "irs_plan": {}
    }
  }

  const result: TEdgeResponse =  irs_tasker_map_focus(config);
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

  const result: TEdgeResponse =  irs_tasker_map_focus(config);
  t.is(result.status,EEdgeStatus.Green)
})
