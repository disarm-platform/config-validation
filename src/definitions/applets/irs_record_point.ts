import { Applet } from "./applet";

export interface MetaData {
  show: boolean;
  optional_fields: string[];
}

export interface IrsRecordPoint extends Applet {
  metadata: MetaData
}