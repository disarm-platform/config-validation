import { TAggregations } from './TAggregations';
import { TApplets } from './TApplets';
import { TDecorators } from './TDecorators';
import { TForm } from './TForm';
import { TLocationSelection } from './TLocationSelection';
import { TMapFocus } from './TMapFocus';
import { TSpatialHierarchy } from './TSpatialHierarchy';
import { TValidations } from './TValidations';

export interface TConfig {
  applets: TApplets;
  map_focus?: TMapFocus;

  spatial_hierarchy?: TSpatialHierarchy;
  form?: TForm;
  aggregations?: TAggregations;
  fake_form?: any[];
  validations?: TValidations;
  decorators?: TDecorators;
  location_selection?: TLocationSelection;
}
