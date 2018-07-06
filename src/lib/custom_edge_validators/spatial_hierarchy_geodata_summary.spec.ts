// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { EFieldType, TSpatialHierarchy,  } from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { spatial_hierarchy_geodata_summary } from './spatial_hierarchy_geodata_summary';


test('should return Green when spatial_hierarchy is valid', t => {
  const spatial_hierarchy: TSpatialHierarchy =  {
    "data_version": 4,
    geodata_summary: {
      constituencies: [
        {
          exists_on_all: true,
          field_name: 'CONST',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'OBJECTID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'REGION',
          type: EFieldType.String,
          unique: true
        }
      ],
      villages: [
        {
          exists_on_all: true,
          field_name: 'mp_NAME',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'uID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'CONSTIT',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'NumStructu',
          type: EFieldType.Number,
          unique: true
        }
      ],
    },
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "villages",
      "record_location_selection_level_name": "villages",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_summary(config as TConfig)
  t.is(result.length, 1)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})

test('should return Red when planning_level_name is missing', t => {
  const spatial_hierarchy: TSpatialHierarchy = {
    "data_version": 4,
    geodata_summary: {
      constituencies: [
        {
          exists_on_all: true,
          field_name: 'CONST',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'OBJECTID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'REGION',
          type: EFieldType.String,
          unique: true
        }
      ],
      villages: [
        {
          exists_on_all: true,
          field_name: 'mp_NAME',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'uID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'CONSTIT',
          type: EFieldType.String,
          unique: true
        }
      ],
    },
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "clusters",
      "record_location_selection_level_name": "villages",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_summary(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})

test('should return Red when record_location_selection_level_name is missing', t => {
  const spatial_hierarchy: TSpatialHierarchy = {
    "data_version": 4,
    geodata_summary: {
      constituencies: [
        {
          exists_on_all: true,
          field_name: 'CONST',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'OBJECTID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'REGION',
          type: EFieldType.String,
          unique: true
        }
      ],
      villages: [
        {
          exists_on_all: true,
          field_name: 'mp_NAME',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'uID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'CONSTIT',
          type: EFieldType.String,
          unique: true
        }
      ],
    },
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "villages",
      "record_location_selection_level_name": "clusters",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_summary(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})

test('should return Red when spatial_hierarchy level is missing from geodata_summary', t => {
  const spatial_hierarchy: TSpatialHierarchy = {
    "data_version": 4,
    geodata_summary: {
      // constituencies is missing
      villages: [
        {
          exists_on_all: true,
          field_name: 'mp_NAME',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'uID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'CONSTIT',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'NumStructu',
          type: EFieldType.Number,
          unique: true
        }
      ],
    },
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "villages",
      "record_location_selection_level_name": "villages",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_summary(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})

test('should return Red when id fields are not unique', t => {
  const spatial_hierarchy: TSpatialHierarchy = {
    "data_version": 4,
    geodata_summary: {
      constituencies: [
        {
          exists_on_all: true,
          field_name: 'CONST',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'OBJECTID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'REGION',
          type: EFieldType.String,
          unique: true
        }
      ],
      villages: [
        {
          exists_on_all: true,
          field_name: 'mp_NAME',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'uID',
          type: EFieldType.String,
          unique: false // this is not unique
        },
        {
          exists_on_all: true,
          field_name: 'CONSTIT',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'NumStructu',
          type: EFieldType.Number,
          unique: true
        }
      ],
    },
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "villages",
      "record_location_selection_level_name": "villages",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_summary(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})

test('should return Red when id fields are not on all features', t => {
  const spatial_hierarchy: TSpatialHierarchy = {
    "data_version": 4,
    geodata_summary: {
      constituencies: [
        {
          exists_on_all: true,
          field_name: 'CONST',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'OBJECTID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'REGION',
          type: EFieldType.String,
          unique: true
        }
      ],
      villages: [
        {
          exists_on_all: true,
          field_name: 'mp_NAME',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: false, // should exist on all features
          field_name: 'uID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'CONSTIT',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'NumStructu',
          type: EFieldType.Number,
          unique: true
        }
      ],
    },
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "villages",
      "record_location_selection_level_name": "villages",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_summary(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})

test('should return Red when id fields are not all of same type', t => {
  const spatial_hierarchy: TSpatialHierarchy = {
    "data_version": 4,
    geodata_summary: {
      constituencies: [
        {
          exists_on_all: true,
          field_name: 'CONST',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'OBJECTID',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'REGION',
          type: EFieldType.String,
          unique: true
        }
      ],
      villages: [
        {
          exists_on_all: true,
          field_name: 'mp_NAME',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'uID',
          type: EFieldType.Unreliable, // should be of one type
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'CONSTIT',
          type: EFieldType.String,
          unique: true
        },
        {
          exists_on_all: true,
          field_name: 'NumStructu',
          type: EFieldType.Number,
          unique: true
        }
      ],
    },
    "levels": [
      {
        "display_field_name": "CONST",
        "field_name": "OBJECTID",
        "group_by_field": "REGION",
        "name": "constituencies"
      },
      {
        "display_field_name": "mp_NAME",
        "field_name": "uID",
        "group_by_field": "CONSTIT",
        "name": "villages"
      }
    ],
    "markers": {
      "denominator_fields": {
        "structures": "NumStructu"
      },
      "planning_level_name": "villages",
      "record_location_selection_level_name": "villages",
    }
  }

  const config = {
    spatial_hierarchy
  }

  const result = spatial_hierarchy_geodata_summary(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})