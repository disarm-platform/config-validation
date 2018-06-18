import { TConfig } from '../config_types/TConfig';

// Minimum required properties for a valid config
const valid_config_stub: TConfig = {
  applets: {
    irs_plan: {
      table_output: [
        {
          display_name: 'name',
          source_field: 'field_name'
        }
      ]
    },
    meta: {}
  },
  config_id: 'id',
  config_version: 'version',
  instance: {
    location_name: 'Location',
    slug: 'loc',
    title: 'title'
  }
};

export { valid_config_stub };
