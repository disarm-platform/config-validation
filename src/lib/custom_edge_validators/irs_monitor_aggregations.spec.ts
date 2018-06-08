// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { TIrsMonitor } from '../config_types/TIrsMonitor';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { irs_monitor_aggregations } from './irs_monitor_aggregations';
import { TAggregations } from '../config_types/TAggregations';

test('returns Red status if aggregation in map is not in aggregations', t => {
  const irs_monitor: TIrsMonitor = {
    charts: [],
    map: {
      aggregation_names: [
        "number of rooms sprayed",
        "room spray coverage (%)"
      ],
      bin_by: "location.selection.id",
      chart_type: "map",
      property_layers: [],
      response_point_fields: []
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: "location.selection.id",
      chart_type: 'table',
      property_layers: []
    }
  }

  const config = {
    aggregations: [{
      name: "number of rooms sprayed",
      numerator_expr: "number_sprayed"
    }],
    applets: {
      irs_monitor
    }
  }

  const result = irs_monitor_aggregations(config as TConfig)


  t.is(result.length, 2)
  t.is(result[1].status, ECustomEdgeStatus.Red)
  t.is(result[1].message, "Aggregation room spray coverage (%) is required but is not available")

  t.is(result[0].status, ECustomEdgeStatus.Green)
  t.is(result[0].message, "Aggregation number of rooms sprayed is required and is available")
})


test('returns Red status if aggregation in table is not in aggregations', t => {
  const aggregations: TAggregations = [{
    "name": "number of rooms sprayed",
    "numerator_expr": "number_sprayed"
  }]

  const irs_monitor: TIrsMonitor = {
    charts: [],
    map: {
      aggregation_names: [],
      bin_by: "location.selection.id",
      chart_type: "map",
      property_layers: [],
      response_point_fields: []
    },
    season_start_dates: [],
    table: {
      aggregation_names: ["room spray coverage (%)"],
      bin_by: "location.selection.id",
      property_layers: []
    }
  }

  const config = {
    aggregations,
    applets:{
      irs_monitor
    }
  }


  const result = irs_monitor_aggregations(config as TConfig)

  t.is(result.length, 1)
  t.is(result[0].status, ECustomEdgeStatus.Red)
  t.is(result[0].message, "Aggregation room spray coverage (%) is required but is not available")
})

test('returns Red status if aggregation in multiseries chart is not in aggregations', t => {
  const aggregations: TAggregations = [{
    "name": "number of rooms sprayed",
    "numerator_expr": "number_sprayed"
  }]

  const irs_monitor: TIrsMonitor = {
    charts: [{
      id: "room_coverage",
      options: {
        bin_by: "recorded_on",
        chart_type: "line",
        cumulative: true,
        geographic_level_refactor_this_key_name: "location.selection.id",
        layout: {
          showlegend: true,
          title: "Room coverage as % of target",
          xaxis: {
            title: "Period commencing"
          },
          yaxis: {
            title: "% coverage"
          },
        },
        multi_series: [
          {
            aggregation_name: "room spray coverage (%)"
          }
        ],
        time_series: true
      },
      style: {
        height_constraint: "none",
        width_constraint: "half"
      }
    }],
    map: {
      aggregation_names: [],
      bin_by: "location.selection.id",
      chart_type: "map",
      property_layers: [],
      response_point_fields: []
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: "location.selection.id",
      property_layers: []
    }
  }

  const config = {
    aggregations,
    applets:{
      irs_monitor
    }
  }
  const result = irs_monitor_aggregations(config as TConfig)

  t.is(result.length, 1)
  t.is(result[0].status, ECustomEdgeStatus.Red)
  t.is(result[0].message, "Aggregation room spray coverage (%) is required but is not available")
})

test('returns Red status if aggregation in singleseries chart is not in aggregations', t => {
  const aggregations: TAggregations = [{
    "name": "number of rooms sprayed",
    "numerator_expr": "number_sprayed"
  }]

  const irs_monitor: TIrsMonitor = {
    charts: [{
      id: "room_coverage",
      options: {
        bin_by: "recorded_on",
        chart_type: "line",
        cumulative: true,
        geographic_level_refactor_this_key_name: "location.selection.id",
        layout: {
          showlegend: true,
          title: "Room coverage as % of target",
          xaxis: {
            title: "Period commencing"
          },
          yaxis: {
            title: "% coverage"
          },
        },
        single_series: {
          aggregation_name: "count"
        }
      },
      style: {
        height_constraint: "none",
        width_constraint: "half"
      }
    }],
    map: {
      aggregation_names: [],
      bin_by: "location.selection.id",
      chart_type: "map",
      property_layers: [],
      response_point_fields: []
    },
    season_start_dates: [],
    table: {
      aggregation_names: [],
      bin_by: "location.selection.id",
      property_layers: []
    }
  }

  const config = {
    aggregations,
    applets:{
      irs_monitor
    }
  }
  const result = irs_monitor_aggregations(config as TConfig)

  t.is(result.length, 1)
  t.is(result[0].status, ECustomEdgeStatus.Red)
  t.is(result[0].message, "Aggregation count is required but is not available")
})
