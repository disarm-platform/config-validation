import { TApplet } from './TApplet';

export interface TMetaData {
  show: boolean;
  optional_fields: string[];
}

export interface TIrsRecordPoint extends TApplet {
  metadata: TMetaData;
  filter_field?: string;
}
