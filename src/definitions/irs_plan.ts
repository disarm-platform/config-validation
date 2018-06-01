import { TApplet } from "./TApplet";

export interface TableOutput {
  display_name: string;
  source_field: string;
}

export interface TIrsPlan extends TApplet {
  table_output: TableOutput[];
}
