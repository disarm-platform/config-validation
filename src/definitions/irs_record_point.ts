import { TApplet } from "./TApplet";

export interface MetaData {
  show: boolean;
  optional_fields: string[];
}

export interface IrsRecordPoint extends TApplet {
  metadata: MetaData
}