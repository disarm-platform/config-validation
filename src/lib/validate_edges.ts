import { Graph } from 'graphlib';
import { TConfig } from '../definitions/TConfig';
import { THash } from './helpers/path_map';
import { EEdgeStatus, TEdgeResponse } from './TEdgeResponse';

export function validate_edges(config: TConfig, path_map: THash): TEdgeResponse[] {
  // Find edges you need to check - start from the sources, and work along the graph from there
  const graph = create_graph(config, path_map);

  const sources = graph.sources()

  const result = sources.map(source => {
    console.log(source)
  })

  return [
    {
      messages: ['A-OK'],
      status: EEdgeStatus.Green
    }
  ];
}


function create_graph(config: TConfig, path_map: THash): Graph {
  const nodes = flat_nodes(config, path_map);
  return new Graph;
}

function flat_nodes(config: TConfig, path_map: THash): {} {
  return {
    instance: config.instance,
    irs_monitor: config.applets.irs_monitor
  };
}