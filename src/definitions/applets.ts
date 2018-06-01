import { TApplet } from './TApplet';
import { IrsMonitor } from './irs_monitor'
import { IrsPlan } from './irs_plan';
import { IrsRecordPoint } from './irs_record_point';

export interface Applets {
  irs_monitor?: IrsMonitor;
  irs_plan?: IrsPlan;
  irs_record_point?: IrsRecordPoint;
  irs_tasker?: TApplet;
  meta: TApplet;
  seasons?: TApplet;
  debug?: TApplet;
}
