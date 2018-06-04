// TODO: Group applets? Put them out of alpha order
export interface THash {
  [k: string] : string;
}

const path_map: THash = {
  aggregations: 'aggregations',
  decorators: 'decorators',
  instance: 'instance',
  irs_monitor: 'applets.irs_monitor',
  irs_plan: 'applets.irs_plan',
  irs_record_point: 'applets.irs_record_point',
  irs_tasker: 'applets.irs_tasker',
  location_selection: 'location_selection',
  map_focus: 'map_focus',
  meta: 'applets.meta',
  spatial_hierarchy: 'spatial_hierarchy',
  validations: 'validations'
}

export default path_map