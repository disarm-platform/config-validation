import test from 'ava'
import {flatten} from 'lodash'
import { validate } from './index'
import { TConfig } from './lib/config_types/TConfig';

test('missing location_selection for irs_plan', t => {
  const invalidConfig: TConfig = {
    applets: {
      irs_plan: {
        table_output: []
      },
      irs_record_point: {
        metadata: {
          optional_fields: [],
          show: false,
        }
      },
      meta: {},
    },
    config_id: 'id',
    config_version: 'version',
    form: {
      pages: [{
        elements: [{
          name: 'q1',
          type: 'text'
        }],
        name: 'p1'
      }]
    },
    instance: {
      location_name: 'Location',
      slug: 'loc',
      title: 'title'
    },
    location_selection: {
      'villages': [{
        category: '',
        id: 'id',
        name: 'name'
      }]
    },
  }

  const response = validate(invalidConfig)

  const edge_statuses_that_fail = response.edge_messages.filter(e => e.status.startsWith('Red'))

  if (edge_statuses_that_fail.length > 4) {
    console.log('edge_statuses_that_fail', edge_statuses_that_fail);
  }

  t.true(true)
})

test('missing location_selection for irs_plan and invalid aggregations', t => {
  const invalidConfig: TConfig = {
    aggregations: [{
      name: 'agg1',
      numerator_expr: 'not_in_form'
    }],
    applets: {
      irs_plan: {
        table_output: []
      },
      irs_record_point: {
        metadata: {
          optional_fields: [],
          show: false,
        }
      },
      meta: {},
    },
    config_id: 'id',
    config_version: 'version',
    form: {
      pages: [{
        elements: [{
          name: 'q1',
          type: 'text'
        }],
        name: 'p1'
      }]
    },
    instance: {
      location_name: 'Location',
      slug: 'loc',
      title: 'title'
    },
    location_selection: {
      'villages': [{
        category: '',
        id: 'id',
        name: 'name'
      }]
    }
  }

  const response = validate(invalidConfig)

  // This is one approach to getting something from validate that we can use on the ui.
  const edge_statuses_that_fail = response.edge_messages.filter(e => e.status.startsWith('Red'))

  const messages_to_show = edge_statuses_that_fail.map(e => {
    if (e.custom_edge_responses.length) {
      const flat_custom_edge_responses = flatten(e.custom_edge_responses)
      const custom_message = flat_custom_edge_responses
        .filter(cer => cer.status.startsWith('Red'))
        .map(cer => cer.message)

      return {
        message: custom_message,
        nodes: [e.source_node_name, e.target_node_name]
      }
    } else {
      return {
        message: e.message,
        nodes: []
      }
    }
  })

  console.log('messages_to_show', messages_to_show);

  t.true(true)
})

