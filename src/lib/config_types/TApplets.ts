import { TApplet } from './TApplet';
import { TIrsMonitor } from './TIrsMonitor';
import { TIrsPlan } from './TIrsPlan';
import { TIrsRecordPoint } from './TIrsRecordPoint';
import { TIrsTasker } from './TIrsTasker';

export interface TApplets {
  irs_monitor?: TIrsMonitor;
  irs_plan?: TIrsPlan;
  irs_record_point?: TIrsRecordPoint;
  irs_tasker?: TIrsTasker;
  meta: TApplet;
  seasons?: TApplet;
  debug?: TApplet;
}
