// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EEdgeStatus } from '../TEdgeResponse';
import { irs_monitor_fields_helper } from './irs_monitor_fields_helper';

test('returns Blue status if no irs_monitor', t => {
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_monitor_fields_helper(config)

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Yellow status if response_point_fields from form are missing', t => {
  const config = {
    applets: {
      irs_monitor: {
        map: {
          response_point_fields: [
            'form_data.not_there',
          ]
        }
      }
    },
    decorators: {},
    form: {
      pages: [
        {
          elements: [
            {
              name: "question1",
              type: "text"
            }
          ],
          name: "page1"
        }
      ]
    }
  }
  // @ts-ignore
  const result = irs_monitor_fields_helper(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})

test('returns Yellow status if response_point_fields from decorators are missing', t => {
  const config = {
    applets: {
      irs_monitor: {
        map: {
          response_point_fields: [
            '_decorated.not_there',
          ]
        }
      }
    },
    decorators: {},
    form: {
      pages: [
        {
          elements: [
            {
              name: "question1",
              type: "text"
            }
          ],
          name: "page1"
        }
      ]
    }
  }
  // @ts-ignore
  const result = irs_monitor_fields_helper(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})

test('returns Yellow status if generate_series_from from decorators are missing', t => {
  const config = {
    applets: {
      irs_monitor: {
        charts: [
          {
            "id": "spray_status_pie",
            "options": {
              "chart_type": "pie",
              "generate_series_from": "_decorated.sprayed_status",
              "layout": {
                "title": "Sprayed status proportion"
              },
            },
            "style": {
              "height_constraint": "none",
              "width_constraint": "half"
            }
          }
        ],
        map: {
          response_point_fields: [
          ]
        }
      }
    },
    decorators: {},
    form: {
      pages: [
        {
          elements: [
            {
              name: "question1",
              type: "text"
            }
          ],
          name: "page1"
        }
      ]
    }
  }
  // @ts-ignore
  const result = irs_monitor_fields_helper(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})

test('returns Yellow status if generate_series_from from form are missing', t => {
  const config = {
    applets: {
      irs_monitor: {
        charts: [
          {
            "id": "spray_status_pie",
            "options": {
              "chart_type": "pie",
              "generate_series_from": "form_data.sprayed_status",
              "layout": {
                "title": "Sprayed status proportion"
              },
            },
            "style": {
              "height_constraint": "none",
              "width_constraint": "half"
            }
          }
        ],
        map: {
          response_point_fields: [
          ]
        }
      }
    },
    decorators: {},
    form: {
      pages: [
        {
          elements: [
            {
              name: "question1",
              type: "text"
            }
          ],
          name: "page1"
        }
      ]
    }
  }
  // @ts-ignore
  const result = irs_monitor_fields_helper(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})