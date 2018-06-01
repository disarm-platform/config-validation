import { TIrsMonitor } from './irs_monitor'
import { TIrsPlan } from './irs_plan';
import { TIrsRecordPoint } from './irs_record_point';
import { TIrsTasker } from './irs_tasker';
import { TApplet } from './TApplet';

export interface Applets {
  irs_monitor?: TIrsMonitor;
  irs_plan?: TIrsPlan;
  irs_record_point?: TIrsRecordPoint;
  irs_tasker?: TIrsTasker;
  meta: TApplet;
  seasons?: TApplet;
  debug?: TApplet;
}
