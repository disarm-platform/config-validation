// tslint:disable:no-expression-statement
import {test} from 'ava';
import {TConfig} from '../src/lib/config_types/TConfig'
import {ECustomEdgeStatus , TCustomEdgeResponse} from "../src/lib/TCustomEdgeResponse";
import {irs_tasker_map_focus} from "../src/lib/custom_edge_validators/irs_tasker_map_focus";


test('map focus not available', t => {
  // @ts-ignore
  const config: TConfig = {
    "applets": {
      "irs_plan": {}
    }
  }

  const result: TCustomEdgeResponse =  irs_tasker_map_focus(config);
  t.is(result.status,ECustomEdgeStatus.Blue)
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

  const result: TCustomEdgeResponse =  irs_tasker_map_focus(config);
  t.is(result.status,ECustomEdgeStatus.Green)
})
