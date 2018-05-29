// tslint:disable:no-expression-statement
import {test} from 'ava';
import {Config} from '../../definitions'
import {EEdgeStatus , TEdgeResponse} from "../EdgeResponse";
import {irs_tasker_map_focus_validations} from "./irs_tasker_map_focus";


test('map focus not available', t => {
  // @ts-ignore
  const config: Config = {
    "applets": {
      "irs_plan": {}
    }
  }

  const result: TEdgeResponse =  irs_tasker_map_focus_validations(config);
  t.is(result.status,EEdgeStatus.Blue)
})

test('map focus availble' , t =>{
  // @ts-ignore
  const config: Config = {
    "applets": {
      "irs_plan": {}
    },
    "map_focus": {
      "zoom": 5
    },
  }

  const result: TEdgeResponse =  irs_tasker_map_focus_validations(config);
  t.is(result.status,EEdgeStatus.Green)
})
