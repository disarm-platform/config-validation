import {Applets} from './applets'

export interface Config {
  config_id: string;
  config_version: string;

  applets: Applets;
  map_focus: any;
  instance: any;

  spatial_hierarchy: any;
  form: any;
  aggregations: any;
  fake_form: any;
  validations: any;
  presenters: any;
  decorators: any;
  location_selection: any;
}