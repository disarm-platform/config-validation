// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EEdgeStatus } from '../TEdgeResponse';
import { irs_monitor_aggregations } from './irs_monitor_aggregations';

test('returns Blue status if no irs_monitor', t => {
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_monitor_aggregations(config)

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Blue status if no aggregations', t => {
  const config = {
    aggregations: [],
    applets: {
      irs_monitor: {}
    }
  }
  // @ts-ignore
  const result = irs_monitor_aggregations(config)

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Yellow status if aggregation in map is not in aggregations', t => {
  const config = {
    aggregations: [{
      "name": "number of rooms sprayed",
      "numerator_expr": "number_sprayed"
    }],
    applets: {
      irs_monitor: {
        charts: [],
        "map": {
          "aggregation_names": [
            "number of rooms sprayed",
            "room spray coverage (%)"
          ],
          "bin_by": "location.selection.id",
          "chart_type": "map",
          "property_layers": [
            {
              "label": "Risk",
              "property": "risk",
            },
            {
              "label": "Number of rooms",
              "property": "Num_Rooms",
            }
          ],
          "response_point_fields": [
            "recorded_on",
            "form_data.number_of_buildings_in_homesteads",
            "form_data.number_of_rooms",
            "_decorated.sprayed_status",
            "form_data.number_sprayed",
            "form_data.number_of_rooms_not_sprayed"
          ]
        },
        table: {
          "aggregation_names": []
        }
      }
    }
  }
  // @ts-ignore
  const result = irs_monitor_aggregations(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})


test('returns Yellow status if aggregation in table is not in aggregations', t => {
  const config = {
    aggregations: [{
      "name": "number of rooms sprayed",
      "numerator_expr": "number_sprayed"
    }],
    applets: {
      irs_monitor: {
        charts: [],
        "map": {
          "aggregation_names": []
        },
        table: {
          "aggregation_names": [
            "number of people in homestead (total)"
          ],
          "bin_by": "location.selection.id",
          "chart_type": "table",
          "property_layers": [
            {
              "label": "Name",
              "property": "__disarm_geo_name",
            },
            {
              "label": "Number of rooms",
              "property": "Num_Rooms",
            }
          ],
          
        }
      }
    }
  }
  // @ts-ignore
  const result = irs_monitor_aggregations(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})


test('returns Yellow status if aggregation in multiseries chart is not in aggregations', t => {
  const config = {
    aggregations: [{
      "name": "number of rooms sprayed",
      "numerator_expr": "number_sprayed"
    }],
    applets: {
      irs_monitor: {
        charts: [
          {
            "id": "room_coverage",
            "options": {
              "bin_by": "recorded_on",
              "chart_type": "line",
              "cumulative": true,
              "geographic_level_refactor_this_key_name": "location.selection.id",
              "layout": {
                "showlegend": true,
                "title": "Room coverage as % of target",
                "xaxis": {
                  "title": "Period commencing"
                },
                "yaxis": {
                  "title": "% coverage"
                },
              },
              "multi_series": [
                {
                  "aggregation_name": "room spray coverage (%)"
                }
              ],
              "time_series": true
            },
            "style": {
              "height_constraint": "none",
              "width_constraint": "half"
            }
          }
        ],
        "map": {
          "aggregation_names": []
        },
        table: {
          "aggregation_names": []
        },
      }
    }
  }
  // @ts-ignore
  const result = irs_monitor_aggregations(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})

test('returns Yellow status if aggregation in singleseries chart is not in aggregations', t => {
  const config = {
    aggregations: [{
      "name": "number of rooms sprayed",
      "numerator_expr": "number_sprayed"
    }],
    applets: {
      irs_monitor: {
        charts: [
          {
            "id": "spray_status_absolute",
            "options": {
              "bin_by": "_decorated.sprayed_status",
              "chart_type": "bar",
              "layout": {
                "showlegend": true,
                "title": "Spray status",
                "xaxis": {
                  "title": "Spray status"
                },
                "yaxis": {
                  "title": "# of households"
                }
              },
              "single_series": {
                "aggregation_name": "count"
              }
            },
            "style": {
              "height_constraint": "none",
              "width_constraint": "half"
            }
          }
        ],
        "map": {
          "aggregation_names": []
        },
        table: {
          "aggregation_names": []
        }
      }
    }
  }
  // @ts-ignore
  const result = irs_monitor_aggregations(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})