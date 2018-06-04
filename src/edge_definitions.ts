// tslint:disable:object-literal-sort-keys // So you can have name, from and to in correct order.
import { TEdgeDefinition } from './lib/TEdgeDefinition';

/**
 * TODO: Should be generated from the graph
 * @type {{name: string; from: string; to: string}[]}
 */
export const edge_definitions: TEdgeDefinition[] = [
  {
    name: 'irs_monitor_aggregations',
    from: 'irs_monitor',
    to: 'aggregations'
  },
  {
    name: 'a_b',
    from: 'a',
    to: 'b'
  }
];