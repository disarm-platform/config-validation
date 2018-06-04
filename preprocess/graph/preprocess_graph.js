const get = require('lodash.get');
const fs = require('fs');
const path = require('path');

const Parser = require('xml2js').Parser;

async function run(input_filename) {
  const res = await read_graphml(input_filename);
  const result = create_list(res);

  const basename = path.basename(input_filename);
  const output_filename = path.join('output', `${basename}.json`);
  fs.writeFileSync(output_filename, JSON.stringify(result));
}

function read_graphml(filename) {
  const source = fs.readFileSync(filename);
  const parser = new Parser();
  return new Promise((resolve, reject) => {
    parser.parseString(source, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function create_list(res) {
  const nodes = get(res, 'graphml.graph[0].node');
  const edges = get(res, 'graphml.graph[0].edge');
  console.log(nodes, edges);
  const parsed_nodes = nodes.map(parse_node);
  const parsed_edges = edges.map(parse_edge);

  return functions_needed(parsed_nodes, parsed_edges);
}

function parse_node(node) {
  const id = get(node, '$.id');
  const label = get(
    node,
    'data[0][\'y:ShapeNode\'][0][\'y:NodeLabel\'][0]._',
    'no_id'
  )
    .split('\n')[0]
    .split('*')[0];
  return { id, label };
}

function parse_edge(edge, parsed_nodes) {
  const id = get(edge, '$.id');
  let required = true
  let label = get(
    edge,
    'data[0][\'y:PolyLineEdge\'][0][\'y:EdgeLabel\'][0]._',
    'no_label'
  ).split('\n')[0];
  if (label.match(/^\*/)) {
    label = label.split('*')[1]
    required = false
  }
  const source_node_id = get(edge, '$.source');
  const target_node_id = get(edge, '$.target');

  return { id, label, required, source_node_id, target_node_id };
}

function functions_needed(nodes, edges) {
  return edges.map(edge => {
    const source_node_id = get(
      nodes.find(n => n.id === edge.source_node_id),
      'label',
      'not found'
    );
    const target_node_id = get(
      nodes.find(n => n.id === edge.target_node_id),
      'label',
      'not found'
    );



    return {
      source_node_name: source_node_id,
      target_node_name: target_node_id,
      relationship_hint: edge.label,
      required: edge.required
    };
  });
}

run('./input/config graph v16.graphml');
