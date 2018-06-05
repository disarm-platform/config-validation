import {get} from 'lodash'
import { TConfig } from './config_types/TConfig';
import { TPathMap } from './helpers/path_mapping';

export interface MappedNode {
  name: string;
  node: object;
}

export function mapped_nodes(config: TConfig, path_map: TPathMap[]): MappedNode[] {
  return path_map.map(el => {
    return {
      name: el.name,
      node: get(config, el.path)
    };
  });
}