export interface TPathMap {
  name: string;
  path: string;
}

const PathMap: TPathMap[] = [
  { name: 'aggregations', path: 'aggregations' },
  { name: 'decorators', path: 'decorators' },
  { name: 'instance', path: 'instance' },
  { name: 'irs_monitor', path: 'applets.irs_monitor' },
  { name: 'irs_plan', path: 'applets.irs_plan' },
  { name: 'irs_record_point', path: 'applets.irs_record_point' },
  { name: 'irs_tasker', path: 'applets.irs_tasker' },
  { name: 'location_selection', path: 'location_selection' },
  { name: 'map_focus', path: 'map_focus' },
  { name: 'meta', path: 'applets.meta' },
  { name: 'spatial_hierarchy', path: 'spatial_hierarchy' },
  { name: 'validations', path: 'validations' }
];

export default PathMap;
