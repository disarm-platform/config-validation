export interface TPathMap {
  name: string;
  path: string;
}

export const AvailableApplets = [
  'irs_monitor',
  'irs_plan',
  'irs_record_point',
  'irs_tasker',
]

export const PathMap: TPathMap[] = [
  ...AvailableApplets.map(applet => {
    return {
      name: applet,
      path: `applets.${applet}`
    }
  }),
  { name: 'applets', path: 'applets'},
  { name: 'meta', path: 'applets.meta' },

  { name: 'aggregations', path: 'aggregations' },
  { name: 'decorators', path: 'decorators' },
  { name: 'instance', path: 'instance' },

  { name: 'fields_helper', path: 'form' }, // this needs to be a node that is always there
  { name: 'form', path: 'form' },
  { name: 'geodata_levels', path: 'spatial_hierarchy.levels' },
  { name: 'location_selection', path: 'location_selection' },
  { name: 'map_focus', path: 'map_focus' },
  { name: 'spatial_hierarchy', path: 'spatial_hierarchy' },
  { name: 'geodata_summary', path: 'spatial_hierarchy.geodata_summary' },
  { name: 'validations', path: 'validations' }
];
