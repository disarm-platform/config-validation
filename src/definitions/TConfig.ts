import { Aggregations } from './aggregations';
import { Applets } from './applets'
import { Decorators } from './decorators';
import { Form } from './form';
import { Instance } from './instance';
import { LocationSelection } from './location_selection';
import { MapFocus } from './map_focus';
import { SpatialHierarchy } from './spatial_hierarchy';
import { Validations } from './validations';

export interface TConfig {
  config_id: string;
  config_version: string;

  applets: Applets;
  map_focus: MapFocus;
  instance: Instance;

  spatial_hierarchy: SpatialHierarchy;
  form: Form;
  aggregations: Aggregations;
  fake_form: any[];
  validations: Validations;
  decorators: Decorators;
  location_selection: LocationSelection;
}