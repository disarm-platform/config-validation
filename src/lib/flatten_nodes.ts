import { get } from 'lodash'
import { TAggregation } from './config_types/TAggregations';
import { TConfig } from './config_types/TConfig';
import { TDecorators } from './config_types/TDecorators';
import { TForm } from './config_types/TForm';
import { TInstance } from './config_types/TInstance';
import { TIrsMonitor } from './config_types/TIrsMonitor';
import { TIrsPlan } from './config_types/TIrsPlan';
import { TIrsRecordPoint } from './config_types/TIrsRecordPoint';
import { TIrsTasker } from './config_types/TIrsTasker';
import { TLocationSelection } from './config_types/TLocationSelection';
import { TMapFocus } from './config_types/TMapFocus';
import { TSpatialHierarchy } from './config_types/TSpatialHierarchy';
import { TValidation } from './config_types/TValidations';
import { TPathMap } from './helper_functions/path_mapping';

export interface MappedNode {
  name: string;
  node: TDecorators &
  TAggregation[] &
  TForm &
  TInstance &
  TIrsMonitor &
  TIrsPlan &
  TIrsRecordPoint &
  TIrsTasker &
  TLocationSelection &
  TMapFocus &
  TSpatialHierarchy &
  TValidation[];
}

export function mapped_nodes(config: TConfig, path_map: TPathMap[]): MappedNode[] {
  return path_map.map(el => {
    return {
      name: el.name,
      node: get(config, el.path)
    };
  });
}