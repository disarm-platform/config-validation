import { TAggregations } from './TAggregations';
import { TApplets } from './TApplets';
import { TDecorators } from './TDecorators';
import { TForm } from './TForm';
import { TInstance } from './TInstance';
import { TLocationSelection } from './TLocationSelection';
import { TMapFocus } from './TMapFocus';
import { TSpatialHierarchy } from './TSpatialHierarchy';
import { TValidations } from './TValidations';

export interface TConfig {
  config_id: string;
  config_version: string;

  applets: TApplets;
  map_focus?: TMapFocus;
  instance: TInstance;

  spatial_hierarchy?: TSpatialHierarchy;
  form?: TForm;
  aggregations?: TAggregations;
  fake_form?: any[];
  validations?: TValidations;
  decorators?: TDecorators;
  location_selection?: TLocationSelection;
}
