import { TApplet } from "./TApplet";

export interface TableOutput {
  display_name: string;
  source_field: string;
}

export interface IrsPlan extends TApplet {
  table_output: TableOutput[];
}