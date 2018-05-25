import { Applet } from './applets/applet';
import { IrsMonitor } from './applets/irs_monitor'
import { IrsPlan } from './applets/irs_plan';
import { IrsRecordPoint } from './applets/irs_record_point';

export interface Applets {
  irs_monitor: IrsMonitor;
  irs_plan: IrsPlan;
  irs_record_point: IrsRecordPoint;
  irs_tasker: Applet;
  meta: Applet;
  seasons: Applet;
  debug: Applet;
}