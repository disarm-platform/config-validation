import { TApplet } from "./TApplet";

export interface MetaData {
  show: boolean;
  optional_fields: string[];
}

export interface TIrsRecordPoint extends TApplet {
  metadata: MetaData
}
