import { TApplet } from './TApplet';

export interface TTableOutput {
  display_name: string;
  source_field: string;
}

export interface TIrsPlan extends TApplet {
  table_output: TTableOutput[];
}
