import { Applet } from "./applet";

export interface TableOutput {
  display_name: string;
  source_field: string;
}

export interface IrsPlan extends Applet {
  table_output: TableOutput[];
}