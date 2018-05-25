import {Applets} from './applets'
import { Instance } from './instance';
import { MapFocus } from './map_focus';
import { SpatialHierarchy } from './spatial_hierarchy';

export interface Config {
  config_id: string;
  config_version: string;

  applets: Applets;
  map_focus: MapFocus;
  instance: Instance;

  spatial_hierarchy: SpatialHierarchy;
  form: any;
  aggregations: any;
  fake_form: any;
  validations: any;
  presenters: any;
  decorators: any;
  location_selection: any;
}