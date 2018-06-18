// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { TDecorators } from '../config_types/TDecorators';
import { TForm } from '../config_types/TForm';
import { TIrsMonitor } from '../config_types/TIrsMonitor';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { irs_monitor_fields_helper } from './irs_monitor_fields_helper';

test('returns Red status if response_point_fields from form are missing', t => {
  const form: TForm = {
    pages: [
      {
        elements: [
          {
            name: 'question1',
            type: 'text'
          }
        ],
        name: 'page1'
      }
    ]
  };

  const irs_monitor: TIrsMonitor = {
    charts: [],
    map: {
      aggregation_names: [],
      bin_by: '',
      property_layers: [],
      response_point_fields: ['form_data.not_there']
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: '',
      property_layers: []
    }
  };

  const config = {
    applets: {
      irs_monitor
    },
    decorators: {},
    form
  };

  const result = irs_monitor_fields_helper(config as TConfig);

  t.is(result.length, 1);
  t.is(result[0].status, ECustomEdgeStatus.Red);
});

test('returns Red status if response_point_fields from decorators are missing', t => {
  const irs_monitor: TIrsMonitor = {
    charts: [],
    map: {
      aggregation_names: [],
      bin_by: '',
      property_layers: [],
      response_point_fields: ['_decorated.not_there']
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: '',
      property_layers: []
    }
  };

  const form: TForm = {
    pages: [
      {
        elements: [
          {
            name: 'question1',
            type: 'text'
          }
        ],
        name: 'page1'
      }
    ]
  };

  const config = {
    applets: {
      irs_monitor
    },
    decorators: {},
    form
  };

  const result = irs_monitor_fields_helper(config as TConfig);

  t.is(result.length, 1);
  t.is(result[0].status, ECustomEdgeStatus.Red);
});

test('returns Red status if generate_series_from from decorators are missing', t => {
  const irs_monitor: TIrsMonitor = {
    charts: [
      {
        id: 'spray_status_pie',
        options: {
          chart_type: 'pie',
          generate_series_from: '_decorated.sprayed_status',
          layout: {
            title: 'Sprayed status proportion'
          }
        },
        style: {
          height_constraint: 'none',
          width_constraint: 'half'
        }
      }
    ],
    map: {
      aggregation_names: [],
      bin_by: '',
      property_layers: [],
      response_point_fields: []
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: '',
      property_layers: []
    }
  };

  const form: TForm = {
    pages: [
      {
        elements: [
          {
            name: 'question1',
            type: 'text'
          }
        ],
        name: 'page1'
      }
    ]
  };

  const config = {
    applets: {
      irs_monitor
    },
    decorators: {},
    form
  };

  const result = irs_monitor_fields_helper(config as TConfig);

  t.is(result.length, 1);
  t.is(result[0].status, ECustomEdgeStatus.Red);
});

test('returns Red status if generate_series_from from form are missing', t => {
  const irs_monitor: TIrsMonitor = {
    charts: [
      {
        id: 'spray_status_pie',
        options: {
          chart_type: 'pie',
          generate_series_from: 'form_data.sprayed_status',
          layout: {
            title: 'Sprayed status proportion'
          }
        },
        style: {
          height_constraint: 'none',
          width_constraint: 'half'
        }
      }
    ],
    map: {
      aggregation_names: [],
      bin_by: '',
      property_layers: [],
      response_point_fields: []
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: '',
      property_layers: []
    }
  };

  const form: TForm = {
    pages: [
      {
        elements: [
          {
            name: 'question1',
            type: 'text'
          }
        ],
        name: 'page1'
      }
    ]
  };

  const config = {
    applets: {
      irs_monitor
    },
    decorators: {},
    form
  };

  const result = irs_monitor_fields_helper(config as TConfig);

  t.is(result.length, 1);
  t.is(result[0].status, ECustomEdgeStatus.Red);
});

test('returns Green status if all fields are available', t => {
  const irs_monitor: TIrsMonitor = {
    charts: [
      {
        id: 'spray_status_pie',
        options: {
          chart_type: 'pie',
          generate_series_from: 'form_data.question1',
          layout: {
            title: 'Sprayed status proportion'
          }
        },
        style: {
          height_constraint: 'none',
          width_constraint: 'half'
        }
      }
    ],
    map: {
      aggregation_names: [],
      bin_by: '',
      property_layers: [],
      response_point_fields: ['form_data.question1', '_decorated.status']
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: '',
      property_layers: []
    }
  };

  const decorators: TDecorators = {
    status: [
      {
        red: 'question1 == 0'
      },
      {
        green: 'question1 > 0'
      }
    ]
  };

  const form: TForm = {
    pages: [
      {
        elements: [
          {
            name: 'question1',
            type: 'text'
          }
        ],
        name: 'page1'
      }
    ]
  };

  const config = {
    applets: {
      irs_monitor
    },
    decorators,
    form
  };

  const result = irs_monitor_fields_helper(config as TConfig);

  t.is(result.length, 3);
  t.is(result[0].status, ECustomEdgeStatus.Green);
  t.is(result[1].status, ECustomEdgeStatus.Green);
  t.is(result[2].status, ECustomEdgeStatus.Green);
});
