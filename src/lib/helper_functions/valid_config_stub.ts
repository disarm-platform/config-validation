import { TConfig } from '../config_types/TConfig';

// Minimum required properties for a valid config
const valid_config_stub: TConfig = {
  instance_id: 'an_id',
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
  }
};

export { valid_config_stub };
