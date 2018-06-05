// tslint:disable:no-expression-statement
import { test } from 'ava';
import { THeightConstraint, TWidthConstraint } from './config_types/TIrsMonitor';
import { EUnifiedStatus } from './TUnifiedResponse'
import { validate } from './validate'

test('returns Green for a valid config', t => {
  // tslint:disable:object-literal-sort-keys
  const namConfig = {
    "config_id": "nam",
    "config_version": "1.0.3",
    "applets": {
      "irs_monitor": {
        "season_start_dates": [
          "2011-10-01",
          "2017-10-01",
          "2018-01-01"
        ],
        "map": {
          "chart_type": "map",
          "bin_by": "location.selection.id",
          "aggregation_names": [
            "% Coverage",
            "# Sprayed structures"
          ],
          "property_layers": [
            {
              "property": "risk",
              "label": "Risk"
            },
            {
              "property": "NumStructu",
              "label": "Number of structures"
            }
          ],
          "response_point_fields": [
            "recorded_on"
          ]
        },
        "table": {
          "chart_type": "table",
          "bin_by": "location.selection.id",
          "aggregation_names": [
            "# Sprayed structures",
            "% Coverage",
            "% refused",
            "% locked"
          ],
          "property_layers": [
            {
              "property": "REGION",
              "label": "Region"
            },
            {
              "property": "DISTRICT",
              "label": "District"
            },
            {
              "property": "mp_NAME",
              "label": "Village"
            },
            {
              "property": "NumStructu",
              "label": "# Target structures"
            }
          ]
        },
        "charts": [
          {
            "id": "room_coverage_by_week",
            "style": {
              "height_constraint": "none" as THeightConstraint,
              "width_constraint": "half" as TWidthConstraint
            },
            "options": {
              "chart_type": "bar",
              "time_series": true,
              "cumulative": true,
              "bin_by": "recorded_on",
              "layout": {
                "showlegend": true,
                "title": "Spray coverage",
                "yaxis": {
                  "title": "# of structures"
                },
                "xaxis": {
                  "title": "Period commencing"
                },
                "barmode": "stack"
              },
              "multi_series": [
                {
                  "aggregation_name": "# Sprayed structures",
                  "colour": "green"
                },
                {
                  "aggregation_name": "sprayable structures not sprayed",
                  "colour": "red"
                }
              ]
            }
          }
        ]
      },
      "irs_plan": {
        "table_output": [
          {
            "display_name": "Village name",
            "source_field": "mp_NAME"
          },
          {
            "display_name": "Number of structures",
            "source_field": "NumStructu"
          },
          {
            "display_name": "Predicted risk",
            "source_field": "risk"
          }
        ]
      },
      "irs_record_point": {
        "metadata": {
          "show": false,
          "optional_fields": []
        }
      },
      "meta": {},
      "seasons": {
        "title": "Admin"
      },
      "debug": {}
    },
    "map_focus": {
      "centre": {
        "lat": -19.186677697957833,
        "lng": 16.940917968750004
      },
      "zoom": 6
    },
    "instance": {
      "title": "Namibia IRS Tool",
      "location_name": "Namibia",
      "slug": "nam"
    },
    "spatial_hierarchy": {
      "data_version": 4,
      "markers": {
        "planning_level_name": "villages",
        "record_location_selection_level_name": "villages",
        "denominator_fields": {
          "structures": "NumStructu"
        }
      },
      "levels": [
        {
          "group_by_field": "REGION",
          "field_name": "OBJECTID",
          "display_field_name": "CONST",
          "name": "constituencies"
        },
        {
          "group_by_field": "CONSTIT",
          "field_name": "uID",
          "display_field_name": "mp_NAME",
          "name": "villages"
        }
      ]
    },
    "form": {
      "pages": [
        {
          "elements": [
            {
              "type": "text",
              "inputType": "number",
              "isRequired": true,
              "name": "number_sprayable",
              "title": "How many sprayable structures in the household/homestead?",
              "validators": [
                {
                  "type": "numeric",
                  "text": "Minimum Value is Zero"
                }
              ]
            },
            {
              "type": "text",
              "inputType": "number",
              "name": "number_unsprayable",
              "title": "How many unsprayable sleeping structures are in the household/homestead?",
              "validators": [
                {
                  "type": "numeric",
                  "text": "Minimum Value is Zero"
                }
              ]
            }
          ],
          "name": "page1"
        },
        {
          "elements": [
            {
              "type": "text",
              "inputType": "number",
              "isRequired": true,
              "name": "numbersprayed_ddt",
              "title": "How many structures were sprayed with DDT? ( if 0, enter 0)",
              "validators": [
                {
                  "type": "numeric",
                  "text": "Minimum Value is Zero"
                }
              ],
              "visible": false,
              "visibleIf": "{number_sprayable} > 0"
            },
            {
              "type": "text",
              "inputType": "number",
              "isRequired": true,
              "name": "numbersprayed_delta",
              "title": "How many structures were sprayed with Deltamethrin/K-Othrin? ( If 0, enter 0)",
              "validators": [
                {
                  "type": "numeric",
                  "text": "Minimum Value is Zero"
                }
              ],
              "visible": false,
              "visibleIf": "{number_sprayable} > 0"
            }
          ],
          "name": "page2"
        },
        {
          "elements": [
            {
              "type": "text",
              "inputType": "number",
              "isRequired": true,
              "name": "number_unsprayed",
              "title": "How many sprayable structures were not sprayed?",
              "validators": [
                {
                  "type": "numeric",
                  "text": "Minimum Value is Zero"
                }
              ],
              "visible": false,
              "visibleIf": "{number_sprayable} > 0"
            },
            {
              "type": "radiogroup",
              "name": "reasons_for_not_spraying",
              "visible": false,
              "visibleIf": "{number_unsprayed} > 0",
              "title": "Reasons for not spraying",
              "isRequired": true,
              "hasOther": true,
              "choices": [
                {
                  "value": "locked",
                  "text": "Locked"
                },
                {
                  "value": "refused",
                  "text": "Refused"
                },
                {
                  "value": "sick_infant",
                  "text": "Sick person/young infant"
                }
              ]
            }
          ],
          "name": "page3"
        },
        {
          "elements": [
            {
              "type": "text",
              "inputType": "number",
              "isRequired": true,
              "name": "house_population",
              "title": "Total people living in the homestead/house",
              "validators": [
                {
                  "type": "numeric",
                  "text": "Minimum Value is Zero"
                }
              ]
            },
            {
              "type": "text",
              "inputType": "number",
              "isRequired": true,
              "name": "total_population_sprayedrooms",
              "title": "People sleeping in sprayed rooms",
              "validators": [
                {
                  "type": "numeric",
                  "text": "Minimum Value is Zero"
                }
              ]
            }
          ],
          "name": "page4"
        },
        {
          "elements": [
            {
              "type": "text",
              "name": "name_household",
              "title": "Head of Household Name",
              "visible": false,
              "visibleIf": "{number_sprayable} > 0"
            },
            {
              "type": "text",
              "name": "health_number",
              "title": "Household Health Number (Enter the number on the sticker given to the head of household)",
              "visible": false,
              "visibleIf": "{number_sprayable} > 0"
            },
            {
              "type": "text",
              "name": "confirm",
              "title": "Confirm Household Health Number: ",
              "visible": false,
              "visibleIf": "{number_sprayable} > 0"
            },
            {
              "type": "text",
              "isRequired": true,
              "name": "number_bednets",
              "title": "Total Number of Bednets Owned",
              "visible": false,
              "visibleIf": "{number_sprayable} > 0"
            },
            {
              "type": "text",
              "inputType": "number",
              "isRequired": true,
              "name": "Bednets_used",
              "title": "Number of Bednets in Use",
              "validators": [
                {
                  "type": "numeric",
                  "text": "Minimum Value is Zero"
                }
              ],
              "visible": false,
              "visibleIf": "{number_bednets} > 0"
            }
          ],
          "name": "page5"
        }
      ]
    },
    "aggregations": [
      {
        "name": "homesteads found",
        "numerator_expr": "1"
      },
      {
        "name": "structures found",
        "numerator_expr": "number_sprayable + number_unsprayable"
      },
      {
        "name": "structures found %",
        "numerator_expr": "number_sprayable + number_unsprayable",
        "denominator_field": "NumStructu"
      },
      {
        "name": "# Sprayed structures",
        "numerator_expr": "numbersprayed_delta + numbersprayed_ddt"
      },
      {
        "name": "% Coverage",
        "numerator_expr": "numbersprayed_delta + numbersprayed_ddt",
        "denominator_field": "NumStructu"
      },
      {
        "name": "sprayable structures not sprayed",
        "numerator_expr": "number_unsprayed"
      },
      {
        "name": "% refused",
        "numerator_expr": "reasons_for_not_spraying == 'refused' ? number_unsprayed : 0",
        "denominator_field": "NumStructu"
      },
      {
        "name": "% locked",
        "numerator_expr": "reasons_for_not_spraying == 'locked' ? number_unsprayed : 0",
        "denominator_field": "NumStructu"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      },
      {
        "name": "count",
        "numerator_expr": "1"
      }
    ],
    "fake_form": [
      {
        "number_sprayable": 2,
        "number_unsprayable": 2,
        "numbersprayed_ddt": 2,
        "numbersprayed_delta": 0,
        "number_unsprayed": 2,
        "reasons_for_not_spraying": "locked",
        "house_population": 8,
        "total_population_sprayedrooms": 4,
        "name_household": "name",
        "health_number": "129",
        "confirm": "129",
        "number_bednets": "0"
      },
      {
        "number_sprayable": 2,
        "number_unsprayable": 2,
        "numbersprayed_ddt": 2,
        "numbersprayed_delta": 0,
        "number_unsprayed": 2,
        "reasons_for_not_spraying": "refused",
        "house_population": 8,
        "total_population_sprayedrooms": 4,
        "name_household": "name",
        "health_number": "129",
        "confirm": "129",
        "number_bednets": "0"
      },
      {
        "number_sprayable": 1,
        "number_unsprayable": 0,
        "numbersprayed_ddt": 1,
        "numbersprayed_delta": 0,
        "number_unsprayed": 0,
        "house_population": 2,
        "total_population_sprayedrooms": 2,
        "name_household": "name",
        "health_number": "129",
        "confirm": "129",
        "number_bednets": "1",
        "Bednets_used": 1
      }
    ],
    "validations": [
      {
        "name": "sprayed more than total structures",
        "expression": "numbersprayed_ddt + numbersprayed_delta <= number_sprayable",
        "message": "Total sprayed is less than sprayed with ddt + deltamethrin",
        "type": "warning"
      },
      {
        "name": "sprayed more with ddt than total",
        "expression": "numbersprayed_ddt <= number_sprayable",
        "message": "Sprayed more with DDT than total",
        "type": "error"
      },
      {
        "name": "sprayed more with deltamethrin than total",
        "expression": "numbersprayed_delta <= number_sprayable",
        "message": "Sprayed more with deltamethrin than total",
        "type": "warning"
      },
      {
        "name": "missing_sprayed_structures",
        "precondition": "sprayable_unsprayed == 'no'",
        "expression": "numbersprayed_ddt + numbersprayed_delta == number_sprayable",
        "message": "Total sprayed does not equal `ddt`+ `deltamethrin`.",
        "type": "warning"
      },
      {
        "name": "sprayable_unsprayed",
        "precondition": "sprayable_unsprayed == 'no'",
        "expression": "number_sprayable == numbersprayed_ddt + numbersprayed_delta + number_unsprayed",
        "message": "Number of structures doesn't add up",
        "type": "warning"
      },
      {
        "name": "high_number_of_sprayed",
        "precondition": "sprayable == 'yes'",
        "expression": "number_sprayable < 20",
        "message": "Number of sprayable structures seems high. Please check the value.",
        "type": "warning"
      },
      {
        "name": "population",
        "precondition": "sprayable == 'yes'",
        "expression": " total_population_sprayedrooms <= house_population",
        "message": "More people sleeping in sprayed rooms than population of houshold.",
        "type": "warning"
      }
    ],
    "presenters": {
      "popup_description": [
        {
          "title": "Date",
          "field": "recorded_on"
        },
        {
          "title": "Recorded by",
          "field": "user"
        },
        {
          "title": "Sprayable",
          "field": "sprayable"
        },
        {
          "title": "Team leader",
          "field": "team_leader"
        }
      ]
    },
    "decorators": {
      "status": [
        {
          "red": "numbersprayed_ddt + numbersprayed_delta == 0"
        },
        {
          "yellow": "0 < (numbersprayed_ddt + numbersprayed_delta) and (numbersprayed_ddt + numbersprayed_delta) < number_sprayable"
        },
        {
          "green": "number_sprayable == numbersprayed_ddt + numbersprayed_delta"
        }
      ]
    },
    "location_selection": {
      "constituencies": [
        {
          "id": 110,
          "name": "Outapi",
          "category": "Omusati"
        },
        {
          "id": 95,
          "name": "Anamulenge",
          "category": "Omusati"
        },
        {
          "id": 98,
          "name": "Nehale LyaMpingana",
          "category": "Oshikoto"
        },
        {
          "id": 2,
          "name": "Eenhana",
          "category": "Ohangwena"
        },
        {
          "id": 7,
          "name": "Elim",
          "category": "Omusati"
        },
        {
          "id": 89,
          "name": "Endola",
          "category": "Ohangwena"
        },
        {
          "id": 1,
          "name": "Engela",
          "category": "Ohangwena"
        },
        {
          "id": 3,
          "name": "Epembe",
          "category": "Ohangwena"
        },
        {
          "id": 9,
          "name": "Epupa",
          "category": "Kunene"
        },
        {
          "id": 10,
          "name": "Grootfontein",
          "category": "Otjozondjupa"
        },
        {
          "id": 11,
          "name": "Guinas",
          "category": "Oshikoto"
        },
        {
          "id": 84,
          "name": "Kabbe South",
          "category": "Zambezi"
        },
        {
          "id": 76,
          "name": "Tondoro",
          "category": "Kavango West"
        },
        {
          "id": 73,
          "name": "Oshikunde",
          "category": "Ohangwena"
        },
        {
          "id": 13,
          "name": "Kamanjab",
          "category": "Kunene"
        },
        {
          "id": 79,
          "name": "Ncamagoro",
          "category": "Kavango West"
        },
        {
          "id": 77,
          "name": "Musese",
          "category": "Kavango West"
        },
        {
          "id": 74,
          "name": "Mpungu",
          "category": "Kavango West"
        },
        {
          "id": 120,
          "name": "Eengondi",
          "category": "Oshikoto"
        },
        {
          "id": 83,
          "name": "Katima Mulilo Urban",
          "category": "Zambezi"
        },
        {
          "id": 4,
          "name": "Omulonga",
          "category": "Ohangwena"
        },
        {
          "id": 20,
          "name": "Khorixas",
          "category": "Kunene"
        },
        {
          "id": 86,
          "name": "Kongola",
          "category": "Zambezi"
        },
        {
          "id": 87,
          "name": "Judea Lyaboloma",
          "category": "Zambezi"
        },
        {
          "id": 109,
          "name": "Mashare",
          "category": "Kavango East"
        },
        {
          "id": 78,
          "name": "Mankumpi",
          "category": "Kavango West"
        },
        {
          "id": 75,
          "name": "Nkurenkure",
          "category": "Kavango West"
        },
        {
          "id": 108,
          "name": "Mukwe",
          "category": "Kavango East"
        },
        {
          "id": 63,
          "name": "Ndiyona",
          "category": "Kavango East"
        },
        {
          "id": 22,
          "name": "Ogongo",
          "category": "Omusati"
        },
        {
          "id": 69,
          "name": "Ohangwena",
          "category": "Ohangwena"
        },
        {
          "id": 82,
          "name": "Ndonga Linena",
          "category": "Kavango East"
        },
        {
          "id": 24,
          "name": "Okahao",
          "category": "Omusati"
        },
        {
          "id": 25,
          "name": "Okakarara",
          "category": "Otjozondjupa"
        },
        {
          "id": 26,
          "name": "Okaku",
          "category": "Oshana"
        },
        {
          "id": 27,
          "name": "Okalongo",
          "category": "Omusati"
        },
        {
          "id": 114,
          "name": "Okankolo",
          "category": "Oshikoto"
        },
        {
          "id": 5,
          "name": "Okatana",
          "category": "Oshana"
        },
        {
          "id": 28,
          "name": "Okatyali",
          "category": "Oshana"
        },
        {
          "id": 72,
          "name": "Okongo",
          "category": "Ohangwena"
        },
        {
          "id": 29,
          "name": "Olukonda",
          "category": "Oshikoto"
        },
        {
          "id": 66,
          "name": "Opuwo Rural",
          "category": "Kunene"
        },
        {
          "id": 85,
          "name": "Kabbe North",
          "category": "Zambezi"
        },
        {
          "id": 32,
          "name": "Ompundja",
          "category": "Oshana"
        },
        {
          "id": 71,
          "name": "Omundaungilo",
          "category": "Ohangwena"
        },
        {
          "id": 33,
          "name": "Omuntele",
          "category": "Oshikoto"
        },
        {
          "id": 34,
          "name": "Omuthiyagwiipundi",
          "category": "Oshikoto"
        },
        {
          "id": 35,
          "name": "Onayena",
          "category": "Oshikoto"
        },
        {
          "id": 36,
          "name": "Ondangwa Rural",
          "category": "Oshana"
        },
        {
          "id": 70,
          "name": "Ondobe",
          "category": "Ohangwena"
        },
        {
          "id": 37,
          "name": "Onesi",
          "category": "Omusati"
        },
        {
          "id": 67,
          "name": "Ongenga",
          "category": "Ohangwena"
        },
        {
          "id": 38,
          "name": "Ongwediva",
          "category": "Oshana"
        },
        {
          "id": 39,
          "name": "Oniipa",
          "category": "Oshikoto"
        },
        {
          "id": 40,
          "name": "Onyaanya",
          "category": "Oshikoto"
        },
        {
          "id": 64,
          "name": "Opuwo Urban",
          "category": "Kunene"
        },
        {
          "id": 41,
          "name": "Oshakati East",
          "category": "Oshana"
        },
        {
          "id": 42,
          "name": "Oshakati West",
          "category": "Oshana"
        },
        {
          "id": 68,
          "name": "Oshikango",
          "category": "Ohangwena"
        },
        {
          "id": 107,
          "name": "Kapako",
          "category": "Kavango West"
        },
        {
          "id": 43,
          "name": "Otamanzi",
          "category": "Omusati"
        },
        {
          "id": 44,
          "name": "Otavi",
          "category": "Otjozondjupa"
        },
        {
          "id": 111,
          "name": "Etayi",
          "category": "Omusati"
        },
        {
          "id": 46,
          "name": "Otjiwarongo",
          "category": "Otjozondjupa"
        },
        {
          "id": 112,
          "name": "Ondangwa Urban",
          "category": "Oshana"
        },
        {
          "id": 113,
          "name": "Linyanti",
          "category": "Zambezi"
        },
        {
          "id": 48,
          "name": "Outjo",
          "category": "Kunene"
        },
        {
          "id": 117,
          "name": "Oshikuku",
          "category": "Omusati"
        },
        {
          "id": 121,
          "name": "Katima Mulilo Rural",
          "category": "Zambezi"
        },
        {
          "id": 49,
          "name": "Ruacana",
          "category": "Omusati"
        },
        {
          "id": 81,
          "name": "Rundu Rural",
          "category": "Kavango East"
        },
        {
          "id": 80,
          "name": "Ncuncuni",
          "category": "Kavango West"
        },
        {
          "id": 50,
          "name": "Rundu Urban",
          "category": "Kavango East"
        },
        {
          "id": 65,
          "name": "Sesfontein",
          "category": "Kunene"
        },
        {
          "id": 88,
          "name": "Sibbinda",
          "category": "Zambezi"
        },
        {
          "id": 53,
          "name": "Tsandi",
          "category": "Omusati"
        },
        {
          "id": 54,
          "name": "Tsumeb",
          "category": "Oshikoto"
        },
        {
          "id": 55,
          "name": "Tsumkwe",
          "category": "Otjozondjupa"
        },
        {
          "id": 56,
          "name": "Uukwiyu",
          "category": "Oshana"
        },
        {
          "id": 57,
          "name": "Uuvudhiya",
          "category": "Oshana"
        }
      ],
      "villages": [
        {
          "id": 2437,
          "name": "Onaihenda",
          "category": "Omulonga"
        },
        {
          "id": 2418,
          "name": "Edundja",
          "category": "Oshikango"
        },
        {
          "id": 2255,
          "name": "Okanghudi ka Kamati",
          "category": "Oshikango"
        },
        {
          "id": 2400,
          "name": "Ohamwaala",
          "category": "Oshikango"
        },
        {
          "id": 2426,
          "name": "Ongha",
          "category": "Endola"
        },
        {
          "id": 2414,
          "name": "Okelemba",
          "category": "Ohangwena"
        },
        {
          "id": 2274,
          "name": "Omalyata",
          "category": "Ohangwena"
        },
        {
          "id": 2413,
          "name": "Okatope",
          "category": "Ohangwena"
        },
        {
          "id": 2412,
          "name": "Onaame (Engela)",
          "category": "Ohangwena"
        },
        {
          "id": 2398,
          "name": "Omahenge",
          "category": "Oshikango"
        },
        {
          "id": 2253,
          "name": "Onekwaya East",
          "category": "Oshikango"
        },
        {
          "id": 2405,
          "name": "Onamwilwa",
          "category": "Ohangwena"
        },
        {
          "id": 2407,
          "name": "Ondaanya",
          "category": "Oshikango"
        },
        {
          "id": 928,
          "name": "Ondangwa No. 3",
          "category": "Ondangwa Urban"
        },
        {
          "id": 944,
          "name": "Omakango No. 2",
          "category": "Ondangwa Urban"
        },
        {
          "id": 941,
          "name": "Enkono A",
          "category": "Ondangwa Urban"
        },
        {
          "id": 851,
          "name": "Ondukutu",
          "category": "Okaku"
        },
        {
          "id": 869,
          "name": "Ongenga No.2",
          "category": "Okaku"
        },
        {
          "id": 868,
          "name": "Ongenga No.1",
          "category": "Okaku"
        },
        {
          "id": 936,
          "name": "Onawa (ondakwi 2)",
          "category": "Okaku"
        },
        {
          "id": 943,
          "name": "Omakango No. 1",
          "category": "Ondangwa Urban"
        },
        {
          "id": 942,
          "name": "Enkono B",
          "category": "Ondangwa Urban"
        },
        {
          "id": 939,
          "name": "Omahenene",
          "category": "Ondangwa Urban"
        },
        {
          "id": 934,
          "name": "Oshitapo",
          "category": "Ondangwa Urban"
        },
        {
          "id": 2346,
          "name": "Efululula",
          "category": "Endola"
        },
        {
          "id": 2431,
          "name": "Oimbadalunga",
          "category": "Ongenga"
        },
        {
          "id": 2404,
          "name": "Okakwa",
          "category": "Ohangwena"
        },
        {
          "id": 2335,
          "name": "Engela la Shikondongolo",
          "category": "Engela"
        },
        {
          "id": 2250,
          "name": "Ouhongo",
          "category": "Engela"
        },
        {
          "id": 2340,
          "name": "Oshindobe",
          "category": "Ongenga"
        },
        {
          "id": 2439,
          "name": "Ohadiwa A",
          "category": "Ongenga"
        },
        {
          "id": 2268,
          "name": "Olunghono",
          "category": "Oshikango"
        },
        {
          "id": 2349,
          "name": "Epuku",
          "category": "Endola"
        },
        {
          "id": 2353,
          "name": "Omwaalu",
          "category": "Endola"
        },
        {
          "id": 2327,
          "name": "Oshali Sha D  Sheya",
          "category": "Engela"
        },
        {
          "id": 2352,
          "name": "Omaonde",
          "category": "Endola"
        },
        {
          "id": 2433,
          "name": "Onambaba",
          "category": "Ongenga"
        },
        {
          "id": 2423,
          "name": "Onamukalo",
          "category": "Ohangwena"
        },
        {
          "id": 2419,
          "name": "Onhuno",
          "category": "Ohangwena"
        },
        {
          "id": 2266,
          "name": "Omhedi -Ohangwena",
          "category": "Ohangwena"
        },
        {
          "id": 2262,
          "name": "Onghala ya Mutota",
          "category": "Ongenga"
        },
        {
          "id": 2354,
          "name": "Ondjadjaxwi",
          "category": "Endola"
        },
        {
          "id": 2356,
          "name": "Onanghulo",
          "category": "Engela"
        },
        {
          "id": 2348,
          "name": "Omakango-Endola",
          "category": "Endola"
        },
        {
          "id": 2355,
          "name": "Oshomukwiyu",
          "category": "Endola"
        },
        {
          "id": 2351,
          "name": "Endola",
          "category": "Endola"
        },
        {
          "id": 2265,
          "name": "Onambango",
          "category": "Engela"
        },
        {
          "id": 2417,
          "name": "Omatunda -Engela",
          "category": "Engela"
        },
        {
          "id": 2421,
          "name": "Omakango a Kweenda",
          "category": "Ohangwena"
        },
        {
          "id": 2275,
          "name": "Oipanda - Ongobe yaola",
          "category": "Ongenga"
        },
        {
          "id": 2476,
          "name": "Ongudi",
          "category": "Ongenga"
        },
        {
          "id": 2272,
          "name": "Ongobe Yaola",
          "category": "Ongenga"
        },
        {
          "id": 1722,
          "name": "Oikokola",
          "category": "Etayi"
        },
        {
          "id": 1587,
          "name": "Enoleu A & B",
          "category": "Etayi"
        },
        {
          "id": 1584,
          "name": "Onelombo B",
          "category": "Etayi"
        },
        {
          "id": 1585,
          "name": "Onelombo C",
          "category": "Etayi"
        },
        {
          "id": 1582,
          "name": "Otindi",
          "category": "Etayi"
        },
        {
          "id": 1583,
          "name": "Onelombo A",
          "category": "Etayi"
        },
        {
          "id": 1735,
          "name": "Oshivanda",
          "category": "Etayi"
        },
        {
          "id": 1586,
          "name": "Ohembe",
          "category": "Etayi"
        },
        {
          "id": 55,
          "name": "Samate",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 41,
          "name": "Ibuvi",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 148,
          "name": "Kangongo (Kongola constit.)",
          "category": "Kongola"
        },
        {
          "id": 37,
          "name": "Izimwe (Katima Rural)",
          "category": "Kabbe South"
        },
        {
          "id": 36,
          "name": "35 Miles )",
          "category": "Kabbe South"
        },
        {
          "id": 130,
          "name": "Izumba",
          "category": "Kabbe South"
        },
        {
          "id": 100,
          "name": "Masika",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 90,
          "name": "Buluha",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 135,
          "name": "Makoma",
          "category": "Kabbe South"
        },
        {
          "id": 77,
          "name": "Libuyu",
          "category": "Kabbe North"
        },
        {
          "id": 188,
          "name": "Nukwa Village",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 110,
          "name": "Kangongo (Judea Lyaboloma constit.)",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 175,
          "name": "Kasakatau",
          "category": "Sibbinda"
        },
        {
          "id": 82,
          "name": "Mubiza",
          "category": "Kabbe North"
        },
        {
          "id": 138,
          "name": "Muhuluma",
          "category": "Kabbe North"
        },
        {
          "id": 63,
          "name": "Thikundeko",
          "category": "Kongola"
        },
        {
          "id": 173,
          "name": "Kansoko",
          "category": "Linyanti"
        },
        {
          "id": 103,
          "name": "Mbozi",
          "category": "Sibbinda"
        },
        {
          "id": 177,
          "name": "Kaunga",
          "category": "Kongola"
        },
        {
          "id": 76,
          "name": "Libula B",
          "category": "Kabbe North"
        },
        {
          "id": 1655,
          "name": "Omakange",
          "category": "Ruacana"
        },
        {
          "id": 1739,
          "name": "Elamaba",
          "category": "Otamanzi"
        },
        {
          "id": 1699,
          "name": "Okaonde",
          "category": "Ruacana"
        },
        {
          "id": 1740,
          "name": "Onkaankaa",
          "category": "Otamanzi"
        },
        {
          "id": 1763,
          "name": "Otapatapa",
          "category": "Otamanzi"
        },
        {
          "id": 1762,
          "name": "Amarika",
          "category": "Otamanzi"
        },
        {
          "id": 1597,
          "name": "Uutsathima",
          "category": "Okahao"
        },
        {
          "id": 1611,
          "name": "Oshimanya",
          "category": "Okahao"
        },
        {
          "id": 1557,
          "name": "Onaanda",
          "category": "Elim"
        },
        {
          "id": 1606,
          "name": "Uukwalumbe B",
          "category": "Okahao"
        },
        {
          "id": 1598,
          "name": "Ilambo",
          "category": "Okahao"
        },
        {
          "id": 1758,
          "name": "Otamanzi",
          "category": "Otamanzi"
        },
        {
          "id": 1759,
          "name": "Otsalindi",
          "category": "Otamanzi"
        },
        {
          "id": 1592,
          "name": "Onandjira",
          "category": "Okahao"
        },
        {
          "id": 1638,
          "name": "OkathituKambanda",
          "category": "Ogongo"
        },
        {
          "id": 1605,
          "name": "Uukwalumbe A",
          "category": "Okahao"
        },
        {
          "id": 1609,
          "name": "Okahao Side A",
          "category": "Okahao"
        },
        {
          "id": 1569,
          "name": "Etunda (Okahao side)",
          "category": "Okahao"
        },
        {
          "id": 1608,
          "name": "Okahao",
          "category": "Okahao"
        },
        {
          "id": 1614,
          "name": "Oshukwa 3",
          "category": "Okahao"
        },
        {
          "id": 1613,
          "name": "Oshukwa 2",
          "category": "Okahao"
        },
        {
          "id": 1612,
          "name": "Oshukwa 1",
          "category": "Okahao"
        },
        {
          "id": 1610,
          "name": "Okahao Side B",
          "category": "Okahao"
        },
        {
          "id": 1562,
          "name": "Ongongo",
          "category": "Elim"
        },
        {
          "id": 1558,
          "name": "Olwoole",
          "category": "Elim"
        },
        {
          "id": 1559,
          "name": "Ikango-Nawa",
          "category": "Elim"
        },
        {
          "id": 1567,
          "name": "Alusati",
          "category": "Elim"
        },
        {
          "id": 1560,
          "name": "Amadhaala",
          "category": "Elim"
        },
        {
          "id": 1596,
          "name": "Ombwata B",
          "category": "Tsandi"
        },
        {
          "id": 1593,
          "name": "Onandjila",
          "category": "Tsandi"
        },
        {
          "id": 1595,
          "name": "Ombwata A",
          "category": "Tsandi"
        },
        {
          "id": 1738,
          "name": "Efo-etalala",
          "category": "Otamanzi"
        },
        {
          "id": 1737,
          "name": "Onkani",
          "category": "Otamanzi"
        },
        {
          "id": 1607,
          "name": "Oshikuyu",
          "category": "Okahao"
        },
        {
          "id": 881,
          "name": "Iikango No.1",
          "category": "Ongwediva"
        },
        {
          "id": 872,
          "name": "Omale",
          "category": "Ongwediva"
        },
        {
          "id": 965,
          "name": "Oushombo",
          "category": "Ongwediva"
        },
        {
          "id": 973,
          "name": "Adolofi",
          "category": "Ongwediva"
        },
        {
          "id": 1757,
          "name": "Otjipahuriro",
          "category": "Ruacana"
        },
        {
          "id": 1750,
          "name": "Otjaandja",
          "category": "Ruacana"
        },
        {
          "id": 1747,
          "name": "Okatjene",
          "category": "Ruacana"
        },
        {
          "id": 1741,
          "name": "Okazandu",
          "category": "Ruacana"
        },
        {
          "id": 1743,
          "name": "Ombuumbuu",
          "category": "Ruacana"
        },
        {
          "id": 1745,
          "name": "Omuzu Wa Hauwanga",
          "category": "Ruacana"
        },
        {
          "id": 1749,
          "name": "Ovikange",
          "category": "Ruacana"
        },
        {
          "id": 1746,
          "name": "Omumbonde",
          "category": "Ruacana"
        },
        {
          "id": 1755,
          "name": "Okaruano",
          "category": "Ruacana"
        },
        {
          "id": 1748,
          "name": "Ovikenjewe",
          "category": "Ruacana"
        },
        {
          "id": 1752,
          "name": "Otjitho",
          "category": "Ruacana"
        },
        {
          "id": 1754,
          "name": "Omangundi",
          "category": "Ruacana"
        },
        {
          "id": 1566,
          "name": "Ondjindja",
          "category": "Ogongo"
        },
        {
          "id": 1602,
          "name": "Omanogondjamba",
          "category": "Ogongo"
        },
        {
          "id": 1564,
          "name": "Okantaya",
          "category": "Oshikuku"
        },
        {
          "id": 1651,
          "name": "Okapya",
          "category": "Oshikuku"
        },
        {
          "id": 1604,
          "name": "Oshitutuma",
          "category": "Oshikuku"
        },
        {
          "id": 1652,
          "name": "Iithindi",
          "category": "Oshikuku"
        },
        {
          "id": 1568,
          "name": "Iitananga",
          "category": "Ogongo"
        },
        {
          "id": 1561,
          "name": "Olutsiidhi",
          "category": "Ogongo"
        },
        {
          "id": 1565,
          "name": "Oongo",
          "category": "Oshikuku"
        },
        {
          "id": 955,
          "name": "Elombe",
          "category": "Ongwediva"
        },
        {
          "id": 880,
          "name": "Eenghala",
          "category": "Ongwediva"
        },
        {
          "id": 896,
          "name": "Onampinda",
          "category": "Okatana"
        },
        {
          "id": 964,
          "name": "Onambimba",
          "category": "Ongwediva"
        },
        {
          "id": 961,
          "name": "Mbwata",
          "category": "Ongwediva"
        },
        {
          "id": 984,
          "name": "Omahenene (Oshakati)",
          "category": "Oshakati West"
        },
        {
          "id": 998,
          "name": "Sky (Oshakati)",
          "category": "Oshakati East"
        },
        {
          "id": 968,
          "name": "Hanover",
          "category": "Ongwediva"
        },
        {
          "id": 960,
          "name": "Extension 11",
          "category": "Ongwediva"
        },
        {
          "id": 958,
          "name": "Valombola",
          "category": "Ongwediva"
        },
        {
          "id": 972,
          "name": "Mycanos",
          "category": "Ongwediva"
        },
        {
          "id": 970,
          "name": "Mandume Location",
          "category": "Ongwediva"
        },
        {
          "id": 953,
          "name": "Old Ongwediva",
          "category": "Ongwediva"
        },
        {
          "id": 1648,
          "name": "Okathitu konghayi",
          "category": "Okalongo"
        },
        {
          "id": 1633,
          "name": "Uushipu",
          "category": "Okalongo"
        },
        {
          "id": 1695,
          "name": "Onaame",
          "category": "Anamulenge"
        },
        {
          "id": 1627,
          "name": "Okathitu kouvale",
          "category": "Okalongo"
        },
        {
          "id": 1711,
          "name": "Onaipwakola",
          "category": "Etayi"
        },
        {
          "id": 1616,
          "name": "Okathitu- konyama",
          "category": "Okalongo"
        },
        {
          "id": 1615,
          "name": "Epyaliwa",
          "category": "Okalongo"
        },
        {
          "id": 1646,
          "name": "Omagalanga",
          "category": "Oshikuku"
        },
        {
          "id": 1645,
          "name": "Oshikuku",
          "category": "Oshikuku"
        },
        {
          "id": 1589,
          "name": "Oshalembe",
          "category": "Etayi"
        },
        {
          "id": 1580,
          "name": "Omutaku",
          "category": "Etayi"
        },
        {
          "id": 1654,
          "name": "Eenkundi",
          "category": "Oshikuku"
        },
        {
          "id": 1675,
          "name": "Olukekete",
          "category": "Outapi"
        },
        {
          "id": 1653,
          "name": "Okaku",
          "category": "Oshikuku"
        },
        {
          "id": 1622,
          "name": "Onandjaba A",
          "category": "Okalongo"
        },
        {
          "id": 1619,
          "name": "Omatwadiva",
          "category": "Okalongo"
        },
        {
          "id": 1725,
          "name": "Ehafo",
          "category": "Etayi"
        },
        {
          "id": 1617,
          "name": "Oneheke A",
          "category": "Okalongo"
        },
        {
          "id": 1720,
          "name": "Onheleiwa",
          "category": "Etayi"
        },
        {
          "id": 1718,
          "name": "Elakalapwa",
          "category": "Etayi"
        },
        {
          "id": 1780,
          "name": "Oshimangwa",
          "category": "Anamulenge"
        },
        {
          "id": 1778,
          "name": "Oluvango",
          "category": "Anamulenge"
        },
        {
          "id": 1630,
          "name": "Onaizimba",
          "category": "Okalongo"
        },
        {
          "id": 1635,
          "name": "Onembamba",
          "category": "Okalongo"
        },
        {
          "id": 1781,
          "name": "Ehenge Ombeli",
          "category": "Anamulenge"
        },
        {
          "id": 1620,
          "name": "Ondundu",
          "category": "Okalongo"
        },
        {
          "id": 1731,
          "name": "Onepandaulo",
          "category": "Etayi"
        },
        {
          "id": 1623,
          "name": "Onandjaba B",
          "category": "Okalongo"
        },
        {
          "id": 1728,
          "name": "Ongali",
          "category": "Etayi"
        },
        {
          "id": 1727,
          "name": "Ohongo",
          "category": "Etayi"
        },
        {
          "id": 1723,
          "name": "Efalehadi",
          "category": "Etayi"
        },
        {
          "id": 1717,
          "name": "Olyavakala",
          "category": "Etayi"
        },
        {
          "id": 1719,
          "name": "Omunyele",
          "category": "Etayi"
        },
        {
          "id": 1715,
          "name": "Onghuwo",
          "category": "Etayi"
        },
        {
          "id": 1726,
          "name": "Omanghwi",
          "category": "Etayi"
        },
        {
          "id": 1626,
          "name": "Olwiili",
          "category": "Okalongo"
        },
        {
          "id": 1795,
          "name": "Onashitendo A",
          "category": "Tsandi"
        },
        {
          "id": 1797,
          "name": "Onashitendo C",
          "category": "Tsandi"
        },
        {
          "id": 1621,
          "name": "Ongolo",
          "category": "Okalongo"
        },
        {
          "id": 1618,
          "name": "Oneheke B",
          "category": "Okalongo"
        },
        {
          "id": 1714,
          "name": "Ondobe yelao",
          "category": "Etayi"
        },
        {
          "id": 1713,
          "name": "Ohameke",
          "category": "Etayi"
        },
        {
          "id": 1716,
          "name": "Oshatumbala",
          "category": "Etayi"
        },
        {
          "id": 1712,
          "name": "Ohakandu",
          "category": "Etayi"
        },
        {
          "id": 1710,
          "name": "Oshilovafo",
          "category": "Etayi"
        },
        {
          "id": 1724,
          "name": "Oipanda",
          "category": "Etayi"
        },
        {
          "id": 1603,
          "name": "Oshamutemwa",
          "category": "Ogongo"
        },
        {
          "id": 1600,
          "name": "Okapya Kambidhi",
          "category": "Ogongo"
        },
        {
          "id": 1601,
          "name": "Okeeke",
          "category": "Ogongo"
        },
        {
          "id": 1642,
          "name": "Olunkavu",
          "category": "Ogongo"
        },
        {
          "id": 1659,
          "name": "Epangu",
          "category": "Ogongo"
        },
        {
          "id": 1640,
          "name": "Iingapanda",
          "category": "Ogongo"
        },
        {
          "id": 1563,
          "name": "Oshushu",
          "category": "Ogongo"
        },
        {
          "id": 1625,
          "name": "Ohendjeno",
          "category": "Okalongo"
        },
        {
          "id": 1736,
          "name": "Okanwa",
          "category": "Etayi"
        },
        {
          "id": 1590,
          "name": "Ohamuti",
          "category": "Etayi"
        },
        {
          "id": 1644,
          "name": "Okathimakamwe",
          "category": "Oshikuku"
        },
        {
          "id": 1770,
          "name": "Omahalya",
          "category": "Anamulenge"
        },
        {
          "id": 1693,
          "name": "Oshikulufitu",
          "category": "Anamulenge"
        },
        {
          "id": 1692,
          "name": "Okakekete",
          "category": "Anamulenge"
        },
        {
          "id": 1691,
          "name": "Ouholondema",
          "category": "Okalongo"
        },
        {
          "id": 1782,
          "name": "Uulifilo",
          "category": "Anamulenge"
        },
        {
          "id": 1784,
          "name": "Onawa",
          "category": "Anamulenge"
        },
        {
          "id": 1690,
          "name": "Omufitu Wanauyala",
          "category": "Anamulenge"
        },
        {
          "id": 1779,
          "name": "Oshipaya",
          "category": "Anamulenge"
        },
        {
          "id": 1634,
          "name": "Oupale",
          "category": "Okalongo"
        },
        {
          "id": 1649,
          "name": "okando",
          "category": "Okalongo"
        },
        {
          "id": 1783,
          "name": "Onekukumo",
          "category": "Anamulenge"
        },
        {
          "id": 1694,
          "name": "Onkili",
          "category": "Anamulenge"
        },
        {
          "id": 1629,
          "name": "Onambome",
          "category": "Okalongo"
        },
        {
          "id": 1628,
          "name": "Oshiteyatemo",
          "category": "Okalongo"
        },
        {
          "id": 1631,
          "name": "Eengwena",
          "category": "Okalongo"
        },
        {
          "id": 1581,
          "name": "Omutundungu",
          "category": "Etayi"
        },
        {
          "id": 1624,
          "name": "Onandjaba C",
          "category": "Okalongo"
        },
        {
          "id": 1733,
          "name": "Olyavahenge",
          "category": "Etayi"
        },
        {
          "id": 1730,
          "name": "Oshitinamwene",
          "category": "Etayi"
        },
        {
          "id": 1734,
          "name": "Oshiyelekamwenyo",
          "category": "Etayi"
        },
        {
          "id": 1721,
          "name": "Ehanda",
          "category": "Etayi"
        },
        {
          "id": 1637,
          "name": "Orange",
          "category": "Okalongo"
        },
        {
          "id": 1591,
          "name": "Olupandu",
          "category": "Okalongo"
        },
        {
          "id": 1632,
          "name": "Olupito",
          "category": "Okalongo"
        },
        {
          "id": 1732,
          "name": "Okandi",
          "category": "Etayi"
        },
        {
          "id": 1588,
          "name": "Odimbwa",
          "category": "Etayi"
        },
        {
          "id": 1729,
          "name": "Eehongo",
          "category": "Etayi"
        },
        {
          "id": 1771,
          "name": "Oshiputu",
          "category": "Anamulenge"
        },
        {
          "id": 1641,
          "name": "Oluteyi",
          "category": "Ogongo"
        },
        {
          "id": 1643,
          "name": "Uuthima Waameya",
          "category": "Ogongo"
        },
        {
          "id": 1639,
          "name": "Eembwa",
          "category": "Ogongo"
        },
        {
          "id": 1657,
          "name": "Oniimwandi",
          "category": "Tsandi"
        },
        {
          "id": 1658,
          "name": "Onakaheke",
          "category": "Tsandi"
        },
        {
          "id": 1764,
          "name": "Ohama ya Shiunda",
          "category": "Outapi"
        },
        {
          "id": 1773,
          "name": "Omikwaya yanhi",
          "category": "Outapi"
        },
        {
          "id": 1765,
          "name": "Iikokola",
          "category": "Outapi"
        },
        {
          "id": 1767,
          "name": "Oshondo",
          "category": "Outapi"
        },
        {
          "id": 1636,
          "name": "epoko",
          "category": "Okalongo"
        },
        {
          "id": 1647,
          "name": "Okaku Kashiwale",
          "category": "Okalongo"
        },
        {
          "id": 1650,
          "name": "Oshuundje",
          "category": "Okalongo"
        },
        {
          "id": 1742,
          "name": "Oshifo",
          "category": "Ruacana"
        },
        {
          "id": 1572,
          "name": "Etunda (Ruacana)",
          "category": "Ruacana"
        },
        {
          "id": 1753,
          "name": "Okapa",
          "category": "Ruacana"
        },
        {
          "id": 1751,
          "name": "Okapika",
          "category": "Ruacana"
        },
        {
          "id": 1577,
          "name": "Omangolowani",
          "category": "Onesi"
        },
        {
          "id": 1571,
          "name": "Omakuva",
          "category": "Onesi"
        },
        {
          "id": 1570,
          "name": "Omahenene",
          "category": "Onesi"
        },
        {
          "id": 1579,
          "name": "Uukwanangaa",
          "category": "Onesi"
        },
        {
          "id": 1574,
          "name": "Ontoko",
          "category": "Onesi"
        },
        {
          "id": 1790,
          "name": "Okalonda",
          "category": "Tsandi"
        },
        {
          "id": 1786,
          "name": "Onakasati",
          "category": "Tsandi"
        },
        {
          "id": 1575,
          "name": "Eenawa",
          "category": "Ruacana"
        },
        {
          "id": 1756,
          "name": "Oshihanameya",
          "category": "Ruacana"
        },
        {
          "id": 1744,
          "name": "Egundjilo",
          "category": "Ruacana"
        },
        {
          "id": 1706,
          "name": "Oshilemba - Tsandi",
          "category": "Tsandi"
        },
        {
          "id": 1709,
          "name": "Ombugu",
          "category": "Tsandi"
        },
        {
          "id": 1681,
          "name": "Oukwandongo",
          "category": "Outapi"
        },
        {
          "id": 1677,
          "name": "Okahwa Kamayau",
          "category": "Outapi"
        },
        {
          "id": 1662,
          "name": "Oufa Wa Elia",
          "category": "Outapi"
        },
        {
          "id": 1573,
          "name": "Omindamba",
          "category": "Outapi"
        },
        {
          "id": 1666,
          "name": "Okafitu Kakuni",
          "category": "Outapi"
        },
        {
          "id": 1664,
          "name": "Onavivi",
          "category": "Outapi"
        },
        {
          "id": 1672,
          "name": "Akati",
          "category": "Outapi"
        },
        {
          "id": 1663,
          "name": "Onaholongo",
          "category": "Outapi"
        },
        {
          "id": 1665,
          "name": "Oshipumbu",
          "category": "Outapi"
        },
        {
          "id": 1776,
          "name": "Omuthitu Weelo",
          "category": "Outapi"
        },
        {
          "id": 1678,
          "name": "Oiwiwili",
          "category": "Outapi"
        },
        {
          "id": 1660,
          "name": "Omufitu Wenghete",
          "category": "Outapi"
        },
        {
          "id": 1661,
          "name": "Omafa",
          "category": "Outapi"
        },
        {
          "id": 1576,
          "name": "Okakuyu",
          "category": "Outapi"
        },
        {
          "id": 1671,
          "name": "Oishanaputa",
          "category": "Outapi"
        },
        {
          "id": 1682,
          "name": "Ouwananghala",
          "category": "Outapi"
        },
        {
          "id": 1685,
          "name": "Oshitu Kafitu",
          "category": "Outapi"
        },
        {
          "id": 1688,
          "name": "Omalyadhila",
          "category": "Outapi"
        },
        {
          "id": 1673,
          "name": "Okafitu Kakahala",
          "category": "Outapi"
        },
        {
          "id": 1687,
          "name": "Okamwandi Konghwi",
          "category": "Outapi"
        },
        {
          "id": 1670,
          "name": "Omahokwe",
          "category": "Outapi"
        },
        {
          "id": 1674,
          "name": "Onanime",
          "category": "Outapi"
        },
        {
          "id": 1578,
          "name": "Ohambanda",
          "category": "Outapi"
        },
        {
          "id": 1668,
          "name": "Okafa Koushongo",
          "category": "Outapi"
        },
        {
          "id": 1686,
          "name": "Oshiputu Sheendjamba",
          "category": "Outapi"
        },
        {
          "id": 1667,
          "name": "Okafitu Kohonde",
          "category": "Outapi"
        },
        {
          "id": 1669,
          "name": "Omulukila",
          "category": "Outapi"
        },
        {
          "id": 1469,
          "name": "Omikwiyli",
          "category": "Outapi"
        },
        {
          "id": 1785,
          "name": "Ombandjele",
          "category": "Outapi"
        },
        {
          "id": 1683,
          "name": "Okahwa Ka Shangolo",
          "category": "Outapi"
        },
        {
          "id": 1679,
          "name": "Oshinane",
          "category": "Outapi"
        },
        {
          "id": 1680,
          "name": "Omalunda",
          "category": "Outapi"
        },
        {
          "id": 1777,
          "name": "Oikwa Yayi Yezi",
          "category": "Outapi"
        },
        {
          "id": 1766,
          "name": "Onaitembu",
          "category": "Outapi"
        },
        {
          "id": 1774,
          "name": "Oshikwa Nailya",
          "category": "Outapi"
        },
        {
          "id": 1676,
          "name": "Okafitu Kasisiya",
          "category": "Outapi"
        },
        {
          "id": 1769,
          "name": "Oshinua Shaluholo",
          "category": "Outapi"
        },
        {
          "id": 1684,
          "name": "Oipanda ya kashanhu",
          "category": "Outapi"
        },
        {
          "id": 1768,
          "name": "Ohauhwe",
          "category": "Outapi"
        },
        {
          "id": 1775,
          "name": "Oshihua Shekwa",
          "category": "Outapi"
        },
        {
          "id": 348,
          "name": "/abace",
          "category": "Tsumkwe"
        },
        {
          "id": 353,
          "name": "!Om!xom",
          "category": "Tsumkwe"
        },
        {
          "id": 298,
          "name": "Shikalepo plot",
          "category": "Tsumkwe"
        },
        {
          "id": 329,
          "name": "Saamtrek",
          "category": "Tsumkwe"
        },
        {
          "id": 339,
          "name": "Die-start",
          "category": "Grootfontein"
        },
        {
          "id": 356,
          "name": "Baraka",
          "category": "Tsumkwe"
        },
        {
          "id": 351,
          "name": "Maxamisa",
          "category": "Tsumkwe"
        },
        {
          "id": 304,
          "name": "Everyday plot",
          "category": "Tsumkwe"
        },
        {
          "id": 362,
          "name": "Mountain pos",
          "category": "Tsumkwe"
        },
        {
          "id": 361,
          "name": "N/umdi",
          "category": "Tsumkwe"
        },
        {
          "id": 224,
          "name": "Koukas",
          "category": "Grootfontein"
        },
        {
          "id": 334,
          "name": "Nora",
          "category": "Grootfontein"
        },
        {
          "id": 275,
          "name": "Wackies",
          "category": "Grootfontein"
        },
        {
          "id": 270,
          "name": "Nukhuwis",
          "category": "Grootfontein"
        },
        {
          "id": 359,
          "name": "N/ama",
          "category": "Tsumkwe"
        },
        {
          "id": 342,
          "name": "Taranaki",
          "category": "Grootfontein"
        },
        {
          "id": 223,
          "name": "Venadia",
          "category": "Grootfontein"
        },
        {
          "id": 232,
          "name": "Brakkies",
          "category": "Grootfontein"
        },
        {
          "id": 265,
          "name": "Olifantput",
          "category": "Grootfontein"
        },
        {
          "id": 272,
          "name": "Asinib",
          "category": "Grootfontein"
        },
        {
          "id": 250,
          "name": "Alwyn",
          "category": "Grootfontein"
        },
        {
          "id": 242,
          "name": "Meduletu",
          "category": "Tsumkwe"
        },
        {
          "id": 245,
          "name": "Kankudi",
          "category": "Tsumkwe"
        },
        {
          "id": 83,
          "name": "Mwemba",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 352,
          "name": "den/ui",
          "category": "Tsumkwe"
        },
        {
          "id": 260,
          "name": "Verskyn",
          "category": "Tsumkwe"
        },
        {
          "id": 346,
          "name": "Den/ua",
          "category": "Tsumkwe"
        },
        {
          "id": 357,
          "name": "Kaptein pos",
          "category": "Tsumkwe"
        },
        {
          "id": 358,
          "name": "Dou pos",
          "category": "Tsumkwe"
        },
        {
          "id": 174,
          "name": "Kanzinzila",
          "category": "Sibbinda"
        },
        {
          "id": 336,
          "name": "Tranedal",
          "category": "Grootfontein"
        },
        {
          "id": 340,
          "name": "Eldoret",
          "category": "Tsumkwe"
        },
        {
          "id": 267,
          "name": "Begus",
          "category": "Grootfontein"
        },
        {
          "id": 261,
          "name": "Nuitsas",
          "category": "Grootfontein"
        },
        {
          "id": 243,
          "name": "Mungoro",
          "category": "Tsumkwe"
        },
        {
          "id": 344,
          "name": "!Om!o!o",
          "category": "Tsumkwe"
        },
        {
          "id": 233,
          "name": "Detroit",
          "category": "Grootfontein"
        },
        {
          "id": 246,
          "name": "Mparara",
          "category": "Tsumkwe"
        },
        {
          "id": 333,
          "name": "Voorwaarts",
          "category": "Grootfontein"
        },
        {
          "id": 234,
          "name": "Drothein",
          "category": "Grootfontein"
        },
        {
          "id": 228,
          "name": "Sus",
          "category": "Grootfontein"
        },
        {
          "id": 235,
          "name": "Avontuur",
          "category": "Grootfontein"
        },
        {
          "id": 273,
          "name": "Sardo",
          "category": "Grootfontein"
        },
        {
          "id": 157,
          "name": "Mbomande",
          "category": "Kongola"
        },
        {
          "id": 266,
          "name": "Fetselhofen",
          "category": "Grootfontein"
        },
        {
          "id": 345,
          "name": "Makuri",
          "category": "Tsumkwe"
        },
        {
          "id": 219,
          "name": "Kalkfontein",
          "category": "Grootfontein"
        },
        {
          "id": 247,
          "name": "Perspeka",
          "category": "Tsumkwe"
        },
        {
          "id": 221,
          "name": "Olifantsfontein",
          "category": "Grootfontein"
        },
        {
          "id": 253,
          "name": "Swaarwater",
          "category": "Grootfontein"
        },
        {
          "id": 308,
          "name": "Bubi post",
          "category": "Tsumkwe"
        },
        {
          "id": 259,
          "name": "Blystroom",
          "category": "Tsumkwe"
        },
        {
          "id": 271,
          "name": "JumKaub",
          "category": "Grootfontein"
        },
        {
          "id": 252,
          "name": "Voorbegin",
          "category": "Grootfontein"
        },
        {
          "id": 57,
          "name": "Bwabwata",
          "category": "Kongola"
        },
        {
          "id": 169,
          "name": "Circle",
          "category": "Kongola"
        },
        {
          "id": 328,
          "name": "Langlaagte 896",
          "category": "Grootfontein"
        },
        {
          "id": 335,
          "name": "Die End",
          "category": "Grootfontein"
        },
        {
          "id": 171,
          "name": "Kakoma",
          "category": "Sibbinda"
        },
        {
          "id": 262,
          "name": "Aitsas",
          "category": "Grootfontein"
        },
        {
          "id": 274,
          "name": "Wildnis",
          "category": "Tsumkwe"
        },
        {
          "id": 263,
          "name": "Neitsas South",
          "category": "Grootfontein"
        },
        {
          "id": 317,
          "name": "Alexander Farm",
          "category": "Grootfontein"
        },
        {
          "id": 216,
          "name": "Otjozondema",
          "category": "Tsumkwe"
        },
        {
          "id": 248,
          "name": "Sawmill",
          "category": "Tsumkwe"
        },
        {
          "id": 341,
          "name": "Henta",
          "category": "Grootfontein"
        },
        {
          "id": 327,
          "name": "Ontevrede 898",
          "category": "Grootfontein"
        },
        {
          "id": 230,
          "name": "Jagterslus",
          "category": "Grootfontein"
        },
        {
          "id": 254,
          "name": "Klein Huise",
          "category": "Grootfontein"
        },
        {
          "id": 322,
          "name": "Otjikoti",
          "category": "Grootfontein"
        },
        {
          "id": 277,
          "name": "Langverwag",
          "category": "Grootfontein"
        },
        {
          "id": 214,
          "name": "Post 1",
          "category": "Tsumkwe"
        },
        {
          "id": 331,
          "name": "Albanie",
          "category": "Grootfontein"
        },
        {
          "id": 303,
          "name": "kalahari new hope",
          "category": "Tsumkwe"
        },
        {
          "id": 257,
          "name": "Rumara",
          "category": "Tsumkwe"
        },
        {
          "id": 207,
          "name": "Otjiperongo",
          "category": "Tsumkwe"
        },
        {
          "id": 256,
          "name": "Nuwerus",
          "category": "Grootfontein"
        },
        {
          "id": 205,
          "name": "Ondamapehi",
          "category": "Tsumkwe"
        },
        {
          "id": 145,
          "name": "Sigwe",
          "category": "Kabbe South"
        },
        {
          "id": 251,
          "name": "voorpost",
          "category": "Grootfontein"
        },
        {
          "id": 264,
          "name": "Groothuise",
          "category": "Grootfontein"
        },
        {
          "id": 35,
          "name": "34 Miles",
          "category": "Kabbe South"
        },
        {
          "id": 44,
          "name": "Isuma",
          "category": "Kabbe North"
        },
        {
          "id": 229,
          "name": "Guinab",
          "category": "Grootfontein"
        },
        {
          "id": 321,
          "name": "Verwag",
          "category": "Grootfontein"
        },
        {
          "id": 183,
          "name": "Mpacha Village",
          "category": "Sibbinda"
        },
        {
          "id": 302,
          "name": "!Kandu Post",
          "category": "Tsumkwe"
        },
        {
          "id": 360,
          "name": "Assvoelness",
          "category": "Tsumkwe"
        },
        {
          "id": 131,
          "name": "Kabula No.2",
          "category": "Kabbe South"
        },
        {
          "id": 153,
          "name": "Mashekeziba",
          "category": "Kongola"
        },
        {
          "id": 62,
          "name": "Pipo",
          "category": "Kongola"
        },
        {
          "id": 209,
          "name": "Otjiwamapeta",
          "category": "Tsumkwe"
        },
        {
          "id": 66,
          "name": "Kandiyana",
          "category": "Linyanti"
        },
        {
          "id": 168,
          "name": "Chuula",
          "category": "Kongola"
        },
        {
          "id": 337,
          "name": "Toggekry",
          "category": "Grootfontein"
        },
        {
          "id": 350,
          "name": "Dobe Border Post",
          "category": "Tsumkwe"
        },
        {
          "id": 102,
          "name": "Mazoba",
          "category": "Sibbinda"
        },
        {
          "id": 154,
          "name": "Mashosho",
          "category": "Kongola"
        },
        {
          "id": 236,
          "name": "Riet Post",
          "category": "Grootfontein"
        },
        {
          "id": 206,
          "name": "Post 2",
          "category": "Tsumkwe"
        },
        {
          "id": 305,
          "name": "Swart Tak",
          "category": "Tsumkwe"
        },
        {
          "id": 93,
          "name": "Ikoma",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 220,
          "name": "Ilmanau",
          "category": "Grootfontein"
        },
        {
          "id": 269,
          "name": "Malmoe",
          "category": "Grootfontein"
        },
        {
          "id": 347,
          "name": "Namapan",
          "category": "Tsumkwe"
        },
        {
          "id": 210,
          "name": "Otjomihama",
          "category": "Tsumkwe"
        },
        {
          "id": 332,
          "name": "Deovalente",
          "category": "Grootfontein"
        },
        {
          "id": 132,
          "name": "Kabulabula",
          "category": "Kabbe South"
        },
        {
          "id": 300,
          "name": "Grasshoek1",
          "category": "Tsumkwe"
        },
        {
          "id": 212,
          "name": "Otjozombanui",
          "category": "Tsumkwe"
        },
        {
          "id": 59,
          "name": "Kachenje",
          "category": "Kongola"
        },
        {
          "id": 354,
          "name": "Tsumkwe Lodge",
          "category": "Tsumkwe"
        },
        {
          "id": 349,
          "name": "Nhoma",
          "category": "Tsumkwe"
        },
        {
          "id": 222,
          "name": "Abenab",
          "category": "Grootfontein"
        },
        {
          "id": 326,
          "name": "Sonop 903",
          "category": "Grootfontein"
        },
        {
          "id": 56,
          "name": "Shakabuyu",
          "category": "Kabbe North"
        },
        {
          "id": 65,
          "name": "Dinikwe Cattle Post",
          "category": "Sibbinda"
        },
        {
          "id": 70,
          "name": "Lyambotwe",
          "category": "Linyanti"
        },
        {
          "id": 301,
          "name": "Grasshoek 2",
          "category": "Tsumkwe"
        },
        {
          "id": 190,
          "name": "Sachinga Research Station",
          "category": "Kongola"
        },
        {
          "id": 159,
          "name": "Mulanga",
          "category": "Kongola"
        },
        {
          "id": 152,
          "name": "Mabanga",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 2206,
          "name": "Okafaludila",
          "category": "Okongo"
        },
        {
          "id": 255,
          "name": "Dismyne",
          "category": "Grootfontein"
        },
        {
          "id": 249,
          "name": "Maroela Boom",
          "category": "Grootfontein"
        },
        {
          "id": 115,
          "name": "Mambali",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 211,
          "name": "Otjiserandu",
          "category": "Tsumkwe"
        },
        {
          "id": 276,
          "name": "Elandslaagte",
          "category": "Grootfontein"
        },
        {
          "id": 859,
          "name": "Iitananga",
          "category": "Okaku"
        },
        {
          "id": 306,
          "name": "Rooidag Hek",
          "category": "Tsumkwe"
        },
        {
          "id": 155,
          "name": "Mwanzi",
          "category": "Kongola"
        },
        {
          "id": 2232,
          "name": "Elao [Onandjushi]",
          "category": "Okongo"
        },
        {
          "id": 161,
          "name": "Ngonga",
          "category": "Kongola"
        },
        {
          "id": 338,
          "name": "Mururani Gate",
          "category": "Grootfontein"
        },
        {
          "id": 195,
          "name": "Wayawaya",
          "category": "Kongola"
        },
        {
          "id": 185,
          "name": "Mutombwe",
          "category": "Sibbinda"
        },
        {
          "id": 147,
          "name": "Kalomo",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 2211,
          "name": "Onangava",
          "category": "Okongo"
        },
        {
          "id": 194,
          "name": "Sitanta",
          "category": "Linyanti"
        },
        {
          "id": 105,
          "name": "Ngala",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 2277,
          "name": "Okanyandi",
          "category": "Okongo"
        },
        {
          "id": 2215,
          "name": "Oshuudiya 2",
          "category": "Okongo"
        },
        {
          "id": 140,
          "name": "Nakabolelwa",
          "category": "Kabbe South"
        },
        {
          "id": 2360,
          "name": "Okauva",
          "category": "Oshikunde"
        },
        {
          "id": 186,
          "name": "Mutotela",
          "category": "Linyanti"
        },
        {
          "id": 2446,
          "name": "Eenguluve",
          "category": "Okongo"
        },
        {
          "id": 924,
          "name": "Otamutala",
          "category": "Ondangwa Rural"
        },
        {
          "id": 866,
          "name": "Etananga",
          "category": "Uukwiyu"
        },
        {
          "id": 258,
          "name": "Eden",
          "category": "Grootfontein"
        },
        {
          "id": 48,
          "name": "Limai",
          "category": "Kabbe South"
        },
        {
          "id": 225,
          "name": "Boabab",
          "category": "Grootfontein"
        },
        {
          "id": 912,
          "name": "Onkuni 2",
          "category": "Ondangwa Rural"
        },
        {
          "id": 295,
          "name": "Kano Vlei",
          "category": "Tsumkwe"
        },
        {
          "id": 192,
          "name": "Sibuyu Village",
          "category": "Sibbinda"
        },
        {
          "id": 2231,
          "name": "Omuwike",
          "category": "Okongo"
        },
        {
          "id": 296,
          "name": "Omatako area",
          "category": "Tsumkwe"
        },
        {
          "id": 158,
          "name": "Muchimbami",
          "category": "Kongola"
        },
        {
          "id": 867,
          "name": "Efolafo",
          "category": "Okaku"
        },
        {
          "id": 240,
          "name": "Mkata",
          "category": "Tsumkwe"
        },
        {
          "id": 111,
          "name": "Kapani",
          "category": "Linyanti"
        },
        {
          "id": 73,
          "name": "Mukisa",
          "category": "Kabbe North"
        },
        {
          "id": 2228,
          "name": "Eshakeno",
          "category": "Oshikunde"
        },
        {
          "id": 124,
          "name": "Singobeka",
          "category": "Linyanti"
        },
        {
          "id": 2224,
          "name": "Omupembe",
          "category": "Okongo"
        },
        {
          "id": 167,
          "name": "Chantuu",
          "category": "Kongola"
        },
        {
          "id": 61,
          "name": "Omega Iii",
          "category": "Kongola"
        },
        {
          "id": 125,
          "name": "Ihaha",
          "category": "Kabbe South"
        },
        {
          "id": 863,
          "name": "Ondangi",
          "category": "Okaku"
        },
        {
          "id": 227,
          "name": "Juliane",
          "category": "Grootfontein"
        },
        {
          "id": 75,
          "name": "Kalundu",
          "category": "Kabbe North"
        },
        {
          "id": 92,
          "name": "Gunkwe",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 60,
          "name": "Masambo",
          "category": "Kongola"
        },
        {
          "id": 109,
          "name": "Kakiramupepo",
          "category": "Linyanti"
        },
        {
          "id": 96,
          "name": "Kwena",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 97,
          "name": "Machita",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 129,
          "name": "Ivilivinzi",
          "category": "Kabbe South"
        },
        {
          "id": 402,
          "name": "Onyati",
          "category": "Eengondi"
        },
        {
          "id": 107,
          "name": "Zilitene",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 407,
          "name": "Omanyanga",
          "category": "Okankolo"
        },
        {
          "id": 118,
          "name": "Mbilajwe",
          "category": "Linyanti"
        },
        {
          "id": 117,
          "name": "Mbambazi",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 1792,
          "name": "Oshikwambi",
          "category": "Tsandi"
        },
        {
          "id": 165,
          "name": "Singalamwe",
          "category": "Kongola"
        },
        {
          "id": 2241,
          "name": "Oshikuni",
          "category": "Okongo"
        },
        {
          "id": 2220,
          "name": "Oshalunghima",
          "category": "Okongo"
        },
        {
          "id": 919,
          "name": "Onelago C",
          "category": "Ondangwa Rural"
        },
        {
          "id": 164,
          "name": "Sikaunga",
          "category": "Kongola"
        },
        {
          "id": 2444,
          "name": "Onghalulu West",
          "category": "Okongo"
        },
        {
          "id": 952,
          "name": "Ohakweenyanga No. 2",
          "category": "Ondangwa Rural"
        },
        {
          "id": 184,
          "name": "Sabelo",
          "category": "Sibbinda"
        },
        {
          "id": 99,
          "name": "Makolonga",
          "category": "Sibbinda"
        },
        {
          "id": 187,
          "name": "Nampengu",
          "category": "Sibbinda"
        },
        {
          "id": 873,
          "name": "Ongali",
          "category": "Okaku"
        },
        {
          "id": 2290,
          "name": "Emanya",
          "category": "Okongo"
        },
        {
          "id": 405,
          "name": "Onatuwe",
          "category": "Okankolo"
        },
        {
          "id": 470,
          "name": "Okadiva",
          "category": "Okankolo"
        },
        {
          "id": 858,
          "name": "Eendoma",
          "category": "Okaku"
        },
        {
          "id": 2238,
          "name": "Onghuiyu(Ongwiyu)",
          "category": "Okongo"
        },
        {
          "id": 2209,
          "name": "Okashakati",
          "category": "Okongo"
        },
        {
          "id": 122,
          "name": "Sauzuo",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 2257,
          "name": "Okahauyulu",
          "category": "Engela"
        },
        {
          "id": 471,
          "name": "Onamatende",
          "category": "Okankolo"
        },
        {
          "id": 2142,
          "name": "Onanime",
          "category": "Oshikunde"
        },
        {
          "id": 98,
          "name": "Mahundu",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 170,
          "name": "Kahunikwa",
          "category": "Kongola"
        },
        {
          "id": 920,
          "name": "Onelago D",
          "category": "Ondangwa Rural"
        },
        {
          "id": 2294,
          "name": "Eembwanyana",
          "category": "Oshikunde"
        },
        {
          "id": 2243,
          "name": "Eloolo",
          "category": "Okongo"
        },
        {
          "id": 114,
          "name": "Malihela",
          "category": "Linyanti"
        },
        {
          "id": 40,
          "name": "Ibbu",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 87,
          "name": "Saili",
          "category": "Kabbe North"
        },
        {
          "id": 128,
          "name": "Itomba",
          "category": "Kabbe South"
        },
        {
          "id": 163,
          "name": "Sesheke",
          "category": "Kongola"
        },
        {
          "id": 146,
          "name": "Izwi / Kanana",
          "category": "Kongola"
        },
        {
          "id": 966,
          "name": "Ofudheni",
          "category": "Uukwiyu"
        },
        {
          "id": 123,
          "name": "Silonga",
          "category": "Linyanti"
        },
        {
          "id": 151,
          "name": "Lubuta",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 2227,
          "name": "Olukumwa",
          "category": "Okongo"
        },
        {
          "id": 415,
          "name": "Onanyege",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 2205,
          "name": "Elao [Oshinaniki](Oshinanyiki)",
          "category": "Okongo"
        },
        {
          "id": 918,
          "name": "Onelago B",
          "category": "Ondangwa Rural"
        },
        {
          "id": 2214,
          "name": "Ongalangombe",
          "category": "Okongo"
        },
        {
          "id": 52,
          "name": "Mutikitila",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 119,
          "name": "Nongozi",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 967,
          "name": "Oshindilandila",
          "category": "Okatana"
        },
        {
          "id": 923,
          "name": "Olulongo",
          "category": "Okatana"
        },
        {
          "id": 43,
          "name": "Ioma",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 39,
          "name": "Chiseke",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 2140,
          "name": "Oshitayi",
          "category": "Oshikunde"
        },
        {
          "id": 2448,
          "name": "Ekokofi",
          "category": "Okongo"
        },
        {
          "id": 2225,
          "name": "Okamanya",
          "category": "Okongo"
        },
        {
          "id": 933,
          "name": "Oshaadha",
          "category": "Uukwiyu"
        },
        {
          "id": 139,
          "name": "Muzii",
          "category": "Kabbe South"
        },
        {
          "id": 162,
          "name": "Sachona",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 2230,
          "name": "Epangwe [Ohakuyela]",
          "category": "Okongo"
        },
        {
          "id": 106,
          "name": "Sikanjabuka",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 160,
          "name": "Namushasha",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 2474,
          "name": "Onalusheshete",
          "category": "Oshikunde"
        },
        {
          "id": 996,
          "name": "Ontako",
          "category": "Ompundja"
        },
        {
          "id": 204,
          "name": "Gam",
          "category": "Tsumkwe"
        },
        {
          "id": 51,
          "name": "Masikili",
          "category": "Kabbe South"
        },
        {
          "id": 32,
          "name": "25 Miles",
          "category": "Kabbe North"
        },
        {
          "id": 940,
          "name": "Omutala",
          "category": "Uukwiyu"
        },
        {
          "id": 401,
          "name": "Oshongwe",
          "category": "Eengondi"
        },
        {
          "id": 85,
          "name": "Namalubi",
          "category": "Kabbe North"
        },
        {
          "id": 2144,
          "name": "Omitoyaipanda(Omito Yamupanda)",
          "category": "Oshikunde"
        },
        {
          "id": 2397,
          "name": "Okatoo",
          "category": "Oshikango"
        },
        {
          "id": 244,
          "name": "Mangetti Dune",
          "category": "Tsumkwe"
        },
        {
          "id": 120,
          "name": "Samudono",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 42,
          "name": "Ikumwe",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 2147,
          "name": "Onaholongo",
          "category": "Oshikunde"
        },
        {
          "id": 466,
          "name": "Onkumbula",
          "category": "Okankolo"
        },
        {
          "id": 2293,
          "name": "Ondkamba Yafyounghundi (Ondjaba Yafyaonghudi)",
          "category": "Okongo"
        },
        {
          "id": 50,
          "name": "Marasburg",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 2289,
          "name": "Epalala-Onawa",
          "category": "Oshikunde"
        },
        {
          "id": 906,
          "name": "Epuku Noyana",
          "category": "Ondangwa Rural"
        },
        {
          "id": 870,
          "name": "Oshuuga",
          "category": "Okaku"
        },
        {
          "id": 400,
          "name": "Omutonda",
          "category": "Eengondi"
        },
        {
          "id": 144,
          "name": "Schuckmansburg",
          "category": "Kabbe North"
        },
        {
          "id": 142,
          "name": "Nankuntwe",
          "category": "Kabbe South"
        },
        {
          "id": 875,
          "name": "Onyelelo",
          "category": "Okaku"
        },
        {
          "id": 95,
          "name": "Kalumba",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 902,
          "name": "Onhele -Iwa",
          "category": "Ongwediva"
        },
        {
          "id": 2477,
          "name": "Ombuumbu",
          "category": "Oshikunde"
        },
        {
          "id": 2208,
          "name": "Olutwatwa",
          "category": "Okongo"
        },
        {
          "id": 901,
          "name": "Okaandje",
          "category": "Ongwediva"
        },
        {
          "id": 2429,
          "name": "Eexumba",
          "category": "Omulonga"
        },
        {
          "id": 71,
          "name": "Malundu",
          "category": "Sibbinda"
        },
        {
          "id": 917,
          "name": "Onelago A",
          "category": "Ondangwa Rural"
        },
        {
          "id": 150,
          "name": "Lizauli",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 1656,
          "name": "Okanguma",
          "category": "Ruacana"
        },
        {
          "id": 1788,
          "name": "Iikokola yAunty",
          "category": "Tsandi"
        },
        {
          "id": 997,
          "name": "Uudhengelo",
          "category": "Ondangwa Rural"
        },
        {
          "id": 2296,
          "name": "Okwatiwalunga",
          "category": "Oshikunde"
        },
        {
          "id": 91,
          "name": "Chefuzwe",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 69,
          "name": "Lusu",
          "category": "Sibbinda"
        },
        {
          "id": 2198,
          "name": "Oluhapa",
          "category": "Okongo"
        },
        {
          "id": 959,
          "name": "Oidiva",
          "category": "Ongwediva"
        },
        {
          "id": 104,
          "name": "Muyako",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 949,
          "name": "New Reception",
          "category": "Ongwediva"
        },
        {
          "id": 116,
          "name": "Maunga",
          "category": "Linyanti"
        },
        {
          "id": 180,
          "name": "Makusi",
          "category": "Sibbinda"
        },
        {
          "id": 112,
          "name": "Lianshulu",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 86,
          "name": "Nfooma",
          "category": "Kabbe North"
        },
        {
          "id": 2216,
          "name": "Ekangolomuve",
          "category": "Okongo"
        },
        {
          "id": 182,
          "name": "Mpacha",
          "category": "Sibbinda"
        },
        {
          "id": 865,
          "name": "Onekondjelo",
          "category": "Uukwiyu"
        },
        {
          "id": 2219,
          "name": "Omulamba Womungholyo",
          "category": "Okongo"
        },
        {
          "id": 954,
          "name": "Omatando",
          "category": "Ongwediva"
        },
        {
          "id": 166,
          "name": "Bito Village",
          "category": "Sibbinda"
        },
        {
          "id": 2440,
          "name": "Omana",
          "category": "Okongo"
        },
        {
          "id": 2222,
          "name": "Ongolongela",
          "category": "Okongo"
        },
        {
          "id": 2358,
          "name": "Onamiyonga(Onamihonga)",
          "category": "Oshikunde"
        },
        {
          "id": 2223,
          "name": "Oshana-shiwa",
          "category": "Okongo"
        },
        {
          "id": 133,
          "name": "Kasika",
          "category": "Kabbe South"
        },
        {
          "id": 126,
          "name": "Ikaba",
          "category": "Kabbe South"
        },
        {
          "id": 68,
          "name": "Linyanti",
          "category": "Linyanti"
        },
        {
          "id": 909,
          "name": "Onevoya",
          "category": "Ondangwa Rural"
        },
        {
          "id": 2286,
          "name": "Odila",
          "category": "Oshikunde"
        },
        {
          "id": 2292,
          "name": "Onamatadiva/Okalunga",
          "category": "Okongo"
        },
        {
          "id": 88,
          "name": "Sifuha",
          "category": "Kabbe North"
        },
        {
          "id": 932,
          "name": "Oshikweyo",
          "category": "Uukwiyu"
        },
        {
          "id": 911,
          "name": "Onkuni",
          "category": "Ondangwa Rural"
        },
        {
          "id": 74,
          "name": "Kalimbeza",
          "category": "Kabbe North"
        },
        {
          "id": 193,
          "name": "Sikubi",
          "category": "Sibbinda"
        },
        {
          "id": 2221,
          "name": "Omushiyo",
          "category": "Okongo"
        },
        {
          "id": 45,
          "name": "Izimwe (Kabbe South)",
          "category": "Kabbe South"
        },
        {
          "id": 156,
          "name": "Choi",
          "category": "Kongola"
        },
        {
          "id": 397,
          "name": "Owiwi",
          "category": "Eengondi"
        },
        {
          "id": 143,
          "name": "Nsundwa",
          "category": "Kabbe South"
        },
        {
          "id": 2441,
          "name": "Oshalumbu",
          "category": "Okongo"
        },
        {
          "id": 343,
          "name": "Tsumkwe",
          "category": "Tsumkwe"
        },
        {
          "id": 884,
          "name": "Omayanga",
          "category": "Okatana"
        },
        {
          "id": 2365,
          "name": "Onaame - Okahamevona",
          "category": "Okongo"
        },
        {
          "id": 1787,
          "name": "Iiyale",
          "category": "Tsandi"
        },
        {
          "id": 937,
          "name": "Onekaku",
          "category": "Uukwiyu"
        },
        {
          "id": 2445,
          "name": "Onghalulu East",
          "category": "Okongo"
        },
        {
          "id": 181,
          "name": "Masida",
          "category": "Linyanti"
        },
        {
          "id": 89,
          "name": "Sikuzwe",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 2202,
          "name": "Onheleiwa",
          "category": "Okongo"
        },
        {
          "id": 876,
          "name": "Epulangapi",
          "category": "Okaku"
        },
        {
          "id": 94,
          "name": "Iseke",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 113,
          "name": "Malengalenga",
          "category": "Linyanti"
        },
        {
          "id": 72,
          "name": "Muketela",
          "category": "Sibbinda"
        },
        {
          "id": 2285,
          "name": "Oshambada",
          "category": "Oshikunde"
        },
        {
          "id": 34,
          "name": "27 Miles",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 2199,
          "name": "Oshamambo",
          "category": "Okongo"
        },
        {
          "id": 2362,
          "name": "Ohameva",
          "category": "Okongo"
        },
        {
          "id": 887,
          "name": "Okatope (Okatana)",
          "category": "Okatana"
        },
        {
          "id": 416,
          "name": "Otatashe",
          "category": "Eengondi"
        },
        {
          "id": 2141,
          "name": "Efinde",
          "category": "Oshikunde"
        },
        {
          "id": 891,
          "name": "Onanime",
          "category": "Okatana"
        },
        {
          "id": 898,
          "name": "Oshikondiilongo",
          "category": "Okatana"
        },
        {
          "id": 907,
          "name": "Onambango",
          "category": "Okaku"
        },
        {
          "id": 64,
          "name": "Chincimane",
          "category": "Sibbinda"
        },
        {
          "id": 857,
          "name": "Eloolo",
          "category": "Okaku"
        },
        {
          "id": 2288,
          "name": "Epalala La Shipena",
          "category": "Oshikunde"
        },
        {
          "id": 178,
          "name": "Liselo",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 931,
          "name": "Ankambo",
          "category": "Uukwiyu"
        },
        {
          "id": 2237,
          "name": "Oshushu",
          "category": "Okongo"
        },
        {
          "id": 862,
          "name": "Omakolombongo",
          "category": "Okaku"
        },
        {
          "id": 136,
          "name": "Malindi",
          "category": "Kabbe North"
        },
        {
          "id": 926,
          "name": "Omashaka",
          "category": "Ondangwa Urban"
        },
        {
          "id": 2472,
          "name": "Oshilambwili -Oshikunde",
          "category": "Oshikunde"
        },
        {
          "id": 2284,
          "name": "Oshishogolo",
          "category": "Okongo"
        },
        {
          "id": 2470,
          "name": "Oshiti-shiwa",
          "category": "Oshikunde"
        },
        {
          "id": 2359,
          "name": "Onamafila",
          "category": "Oshikunde"
        },
        {
          "id": 2143,
          "name": "Ondombe Yelao(Ondobe Yelao)",
          "category": "Oshikunde"
        },
        {
          "id": 2473,
          "name": "Oshifitu",
          "category": "Oshikunde"
        },
        {
          "id": 903,
          "name": "Eko-Lyanaambo",
          "category": "Ondangwa Rural"
        },
        {
          "id": 2146,
          "name": "Oluwaya",
          "category": "Oshikunde"
        },
        {
          "id": 2337,
          "name": "Okalyafengwa",
          "category": "Ongenga"
        },
        {
          "id": 2239,
          "name": "Ombuudiya",
          "category": "Okongo"
        },
        {
          "id": 2235,
          "name": "Olupale",
          "category": "Okongo"
        },
        {
          "id": 2278,
          "name": "Oshalande",
          "category": "Okongo"
        },
        {
          "id": 475,
          "name": "Onamishu",
          "category": "Eengondi"
        },
        {
          "id": 995,
          "name": "Oshaandja",
          "category": "Oshakati West"
        },
        {
          "id": 993,
          "name": "Onendongo",
          "category": "Oshakati West"
        },
        {
          "id": 2276,
          "name": "Omauni West",
          "category": "Okongo"
        },
        {
          "id": 899,
          "name": "Epya-Eshona",
          "category": "Okatana"
        },
        {
          "id": 396,
          "name": "Oshikukutu",
          "category": "Eengondi"
        },
        {
          "id": 2329,
          "name": "Okapumbu",
          "category": "Ongenga"
        },
        {
          "id": 2416,
          "name": "Ohangwena ya Amon",
          "category": "Ohangwena"
        },
        {
          "id": 951,
          "name": "Ohakweenyanga No. 1",
          "category": "Ondangwa Rural"
        },
        {
          "id": 1707,
          "name": "Okaandi",
          "category": "Onesi"
        },
        {
          "id": 189,
          "name": "Sachinga",
          "category": "Sibbinda"
        },
        {
          "id": 2420,
          "name": "Omaadi",
          "category": "Engela"
        },
        {
          "id": 2236,
          "name": "Ehafo",
          "category": "Okongo"
        },
        {
          "id": 888,
          "name": "Eefa Doukadona",
          "category": "Ongwediva"
        },
        {
          "id": 101,
          "name": "Masokotwane",
          "category": "Sibbinda"
        },
        {
          "id": 2287,
          "name": "Eendobe",
          "category": "Okongo"
        },
        {
          "id": 852,
          "name": "Lilagati",
          "category": "Okaku"
        },
        {
          "id": 922,
          "name": "Omushimani",
          "category": "Ondangwa Rural"
        },
        {
          "id": 982,
          "name": "Oshinyadhila No.2",
          "category": "Ongwediva"
        },
        {
          "id": 2357,
          "name": "Oupili",
          "category": "Oshikunde"
        },
        {
          "id": 2295,
          "name": "Ongumi",
          "category": "Okongo"
        },
        {
          "id": 2291,
          "name": "Ondema",
          "category": "Okongo"
        },
        {
          "id": 999,
          "name": "Omusimboti",
          "category": "Oshakati East"
        },
        {
          "id": 84,
          "name": "Nachisangani",
          "category": "Kabbe North"
        },
        {
          "id": 927,
          "name": "Okangwena",
          "category": "Ondangwa Urban"
        },
        {
          "id": 2279,
          "name": "Okatope Ka Mupupa",
          "category": "Okongo"
        },
        {
          "id": 46,
          "name": "Kabbe",
          "category": "Kabbe North"
        },
        {
          "id": 121,
          "name": "Sangwali",
          "category": "Judea Lyaboloma"
        },
        {
          "id": 914,
          "name": "Omaalala B.",
          "category": "Ondangwa Rural"
        },
        {
          "id": 913,
          "name": "Omaalala A.",
          "category": "Ondangwa Rural"
        },
        {
          "id": 67,
          "name": "Kanono",
          "category": "Sibbinda"
        },
        {
          "id": 108,
          "name": "Batubaja",
          "category": "Linyanti"
        },
        {
          "id": 910,
          "name": "Onakatambili",
          "category": "Ondangwa Rural"
        },
        {
          "id": 2242,
          "name": "Onehanga",
          "category": "Okongo"
        },
        {
          "id": 2201,
          "name": "Ekoka",
          "category": "Okongo"
        },
        {
          "id": 176,
          "name": "Kasheshe",
          "category": "Sibbinda"
        },
        {
          "id": 890,
          "name": "Iiviyongo",
          "category": "Okatana"
        },
        {
          "id": 882,
          "name": "Oikango 2 (Iipundi)",
          "category": "Ongwediva"
        },
        {
          "id": 994,
          "name": "Oshandumbala",
          "category": "Oshakati East"
        },
        {
          "id": 925,
          "name": "Onguta",
          "category": "Ondangwa Urban"
        },
        {
          "id": 2427,
          "name": "Epoli",
          "category": "Omulonga"
        },
        {
          "id": 127,
          "name": "Impalila",
          "category": "Kabbe South"
        },
        {
          "id": 2271,
          "name": "Oikoto",
          "category": "Ongenga"
        },
        {
          "id": 49,
          "name": "Lusese",
          "category": "Kabbe South"
        },
        {
          "id": 2234,
          "name": "Olukula",
          "category": "Okongo"
        },
        {
          "id": 79,
          "name": "Mafuta",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 78,
          "name": "Lisikili",
          "category": "Kabbe North"
        },
        {
          "id": 2200,
          "name": "Oidiva",
          "category": "Okongo"
        },
        {
          "id": 883,
          "name": "Emono",
          "category": "Okatana"
        },
        {
          "id": 2331,
          "name": "Oshali-ongenga",
          "category": "Ongenga"
        },
        {
          "id": 1705,
          "name": "Oshitumbe",
          "category": "Onesi"
        },
        {
          "id": 962,
          "name": "Ekuku",
          "category": "Ongwediva"
        },
        {
          "id": 871,
          "name": "Oshekasheka",
          "category": "Okaku"
        },
        {
          "id": 420,
          "name": "Okambuga",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 2263,
          "name": "Ohaingu",
          "category": "Engela"
        },
        {
          "id": 986,
          "name": "Oshipumbu Makilindidi No 2",
          "category": "Oshakati East"
        },
        {
          "id": 2442,
          "name": "Enyana",
          "category": "Okongo"
        },
        {
          "id": 418,
          "name": "Omutsegwonime A",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 2436,
          "name": "Oshimwaku",
          "category": "Engela"
        },
        {
          "id": 2259,
          "name": "Omuloka",
          "category": "Oshikango"
        },
        {
          "id": 2434,
          "name": "Oipya",
          "category": "Engela"
        },
        {
          "id": 2273,
          "name": "Omhata",
          "category": "Engela"
        },
        {
          "id": 894,
          "name": "Ondjondjo",
          "category": "Okatana"
        },
        {
          "id": 172,
          "name": "Kaliyangile",
          "category": "Sibbinda"
        },
        {
          "id": 149,
          "name": "Kongola",
          "category": "Kongola"
        },
        {
          "id": 2261,
          "name": "Onghala ya fredriks",
          "category": "Engela"
        },
        {
          "id": 854,
          "name": "Onamutayi A",
          "category": "Ongwediva"
        },
        {
          "id": 179,
          "name": "Makanga",
          "category": "Linyanti"
        },
        {
          "id": 191,
          "name": "Sibinda",
          "category": "Sibbinda"
        },
        {
          "id": 2254,
          "name": "Okadiva",
          "category": "Oshikango"
        },
        {
          "id": 2267,
          "name": "Oipapakane",
          "category": "Ohangwena"
        },
        {
          "id": 2425,
          "name": "Onandova",
          "category": "Omulonga"
        },
        {
          "id": 38,
          "name": "Bulako",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 80,
          "name": "Mazauli",
          "category": "Kabbe North"
        },
        {
          "id": 2256,
          "name": "Okatale",
          "category": "Oshikango"
        },
        {
          "id": 2336,
          "name": "Omatangela",
          "category": "Ongenga"
        },
        {
          "id": 2252,
          "name": "Eeshoke",
          "category": "Engela"
        },
        {
          "id": 2339,
          "name": "Ongenga",
          "category": "Ongenga"
        },
        {
          "id": 2264,
          "name": "Eengava",
          "category": "Ongenga"
        },
        {
          "id": 2247,
          "name": "Onengali # 1",
          "category": "Oshikango"
        },
        {
          "id": 2438,
          "name": "Omatunda A Nekundi",
          "category": "Ohangwena"
        },
        {
          "id": 2258,
          "name": "Eemboo",
          "category": "Ongenga"
        },
        {
          "id": 2428,
          "name": "Oilagati",
          "category": "Omulonga"
        },
        {
          "id": 2269,
          "name": "Oyongo",
          "category": "Oshikango"
        },
        {
          "id": 2408,
          "name": "Etomba East",
          "category": "Oshikango"
        },
        {
          "id": 2330,
          "name": "Ohadiwa B.",
          "category": "Ongenga"
        },
        {
          "id": 969,
          "name": "NHE (Ext 14)",
          "category": "Ongwediva"
        },
        {
          "id": 957,
          "name": "Efidilomulunga",
          "category": "Ongwediva"
        },
        {
          "id": 2260,
          "name": "Onengali#2",
          "category": "Oshikango"
        },
        {
          "id": 1704,
          "name": "Ongulumbashe",
          "category": "Tsandi"
        },
        {
          "id": 2332,
          "name": "Omungwelume",
          "category": "Ongenga"
        },
        {
          "id": 2338,
          "name": "Okambebe A.",
          "category": "Ongenga"
        },
        {
          "id": 2334,
          "name": "Ohadiwa ya Kapombo",
          "category": "Endola"
        },
        {
          "id": 990,
          "name": "Omeege",
          "category": "Oshakati East"
        },
        {
          "id": 1599,
          "name": "Oshilulu",
          "category": "Okahao"
        },
        {
          "id": 2341,
          "name": "Onangama",
          "category": "Ongenga"
        },
        {
          "id": 946,
          "name": "Ondiiyala",
          "category": "Okatyali"
        },
        {
          "id": 978,
          "name": "Uupindi",
          "category": "Oshakati West"
        },
        {
          "id": 2415,
          "name": "Ohangwena ya Mukongo",
          "category": "Ohangwena"
        },
        {
          "id": 2212,
          "name": "Okongo",
          "category": "Okongo"
        },
        {
          "id": 976,
          "name": "Evululuko",
          "category": "Oshakati East"
        },
        {
          "id": 2246,
          "name": "Oshikango",
          "category": "Oshikango"
        },
        {
          "id": 979,
          "name": "Oshakati West",
          "category": "Oshakati West"
        },
        {
          "id": 977,
          "name": "Oshakati East",
          "category": "Oshakati East"
        },
        {
          "id": 930,
          "name": "Uupopo",
          "category": "Ondangwa Urban"
        },
        {
          "id": 975,
          "name": "Oneshila",
          "category": "Oshakati East"
        },
        {
          "id": 2251,
          "name": "Onamhinda",
          "category": "Oshikango"
        },
        {
          "id": 947,
          "name": "Kandjengedi",
          "category": "Oshakati East"
        },
        {
          "id": 974,
          "name": "Oshoopala",
          "category": "Oshakati West"
        },
        {
          "id": 2245,
          "name": "Omafo",
          "category": "Engela"
        },
        {
          "id": 237,
          "name": "Ebenezer",
          "category": "Grootfontein"
        },
        {
          "id": 226,
          "name": "Duwib",
          "category": "Grootfontein"
        },
        {
          "id": 330,
          "name": "Saamtrek post",
          "category": "Tsumkwe"
        },
        {
          "id": 268,
          "name": "Baden",
          "category": "Grootfontein"
        },
        {
          "id": 319,
          "name": "Omhul",
          "category": "Grootfontein"
        },
        {
          "id": 307,
          "name": "Kamel Wood",
          "category": "Tsumkwe"
        },
        {
          "id": 299,
          "name": "Omatako Valley",
          "category": "Tsumkwe"
        },
        {
          "id": 297,
          "name": "Nankundu",
          "category": "Tsumkwe"
        },
        {
          "id": 355,
          "name": "!obaha",
          "category": "Tsumkwe"
        },
        {
          "id": 1814,
          "name": "Oshamukweni [Etudilondjaba]",
          "category": "Okongo"
        },
        {
          "id": 2450,
          "name": "Ondengu",
          "category": "Okongo"
        },
        {
          "id": 2229,
          "name": "Omutune",
          "category": "Okongo"
        },
        {
          "id": 2203,
          "name": "Omushakala",
          "category": "Okongo"
        },
        {
          "id": 2233,
          "name": "Okawe",
          "category": "Okongo"
        },
        {
          "id": 2240,
          "name": "Omufimba [Cattle Post]",
          "category": "Okongo"
        },
        {
          "id": 2282,
          "name": "Omauni East",
          "category": "Okongo"
        },
        {
          "id": 853,
          "name": "Okaku",
          "category": "Okaku"
        },
        {
          "id": 877,
          "name": "Okapya",
          "category": "Okaku"
        },
        {
          "id": 860,
          "name": "Okankete",
          "category": "Okaku"
        },
        {
          "id": 861,
          "name": "Okathakekola",
          "category": "Okaku"
        },
        {
          "id": 945,
          "name": "Omwandi",
          "category": "Ondangwa Urban"
        },
        {
          "id": 929,
          "name": "Oluno",
          "category": "Ondangwa Urban"
        },
        {
          "id": 856,
          "name": "Omangela",
          "category": "Ongwediva"
        },
        {
          "id": 886,
          "name": "Oshuulo",
          "category": "Okatana"
        },
        {
          "id": 904,
          "name": "Eko-Lyanaambo No.1",
          "category": "Ondangwa Rural"
        },
        {
          "id": 874,
          "name": "Omaalala",
          "category": "Ongwediva"
        },
        {
          "id": 915,
          "name": "Omaalala C.",
          "category": "Ondangwa Rural"
        },
        {
          "id": 855,
          "name": "Onamutayi B",
          "category": "Ongwediva"
        },
        {
          "id": 908,
          "name": "Onambango No.2",
          "category": "Uukwiyu"
        },
        {
          "id": 878,
          "name": "Okandongwena No.2",
          "category": "Ongwediva"
        },
        {
          "id": 879,
          "name": "Okandongweni No.1",
          "category": "Ongwediva"
        },
        {
          "id": 971,
          "name": "Olushika",
          "category": "Okaku"
        },
        {
          "id": 916,
          "name": "Omaalala West",
          "category": "Ongwediva"
        },
        {
          "id": 935,
          "name": "Onambango No.1",
          "category": "Uukwiyu"
        },
        {
          "id": 893,
          "name": "Onangombe",
          "category": "Okatana"
        },
        {
          "id": 897,
          "name": "Onepungu",
          "category": "Okatana"
        },
        {
          "id": 900,
          "name": "Ontuuli",
          "category": "Okatana"
        },
        {
          "id": 895,
          "name": "Uukwangula",
          "category": "Okatana"
        },
        {
          "id": 963,
          "name": "Omusheshe",
          "category": "Okatana"
        },
        {
          "id": 983,
          "name": "Oshinyadhila No.4",
          "category": "Oshakati East"
        },
        {
          "id": 905,
          "name": "Oshinyadhila 3 (Okaku)",
          "category": "Ongwediva"
        },
        {
          "id": 980,
          "name": "Oshinyadhila N.1 (A)",
          "category": "Oshakati East"
        },
        {
          "id": 892,
          "name": "Othingo",
          "category": "Oshakati West"
        },
        {
          "id": 956,
          "name": "Okatope (Ongwediva))",
          "category": "Ongwediva"
        },
        {
          "id": 981,
          "name": "Oshinyadhila No 2 (B)",
          "category": "Oshakati East"
        },
        {
          "id": 889,
          "name": "Ompumbu",
          "category": "Oshakati West"
        },
        {
          "id": 948,
          "name": "Onawa",
          "category": "Ongwediva"
        },
        {
          "id": 885,
          "name": "Omatando No.3",
          "category": "Ongwediva"
        },
        {
          "id": 991,
          "name": "Ehenye",
          "category": "Oshakati East"
        },
        {
          "id": 992,
          "name": "Ompundja",
          "category": "Ompundja"
        },
        {
          "id": 1000,
          "name": "Omusimboti Oshakati",
          "category": "Oshakati East"
        },
        {
          "id": 938,
          "name": "Ondiamande",
          "category": "Uukwiyu"
        },
        {
          "id": 950,
          "name": "Sky Location",
          "category": "Ongwediva"
        },
        {
          "id": 4219,
          "name": "Thikukutu",
          "category": "Mukwe"
        },
        {
          "id": 4077,
          "name": "Biro",
          "category": "Mukwe"
        },
        {
          "id": 4078,
          "name": "Mamono (Andara district)",
          "category": "Mukwe"
        },
        {
          "id": 4126,
          "name": "Shamapi",
          "category": ""
        },
        {
          "id": 4154,
          "name": "Kambimba",
          "category": "Mukwe"
        },
        {
          "id": 4223,
          "name": "Mukongotji",
          "category": "Mukwe"
        },
        {
          "id": 4222,
          "name": "Shamurombwe",
          "category": "Mukwe"
        },
        {
          "id": 4082,
          "name": "Shayirungu",
          "category": "Mukwe"
        },
        {
          "id": 4155,
          "name": "Dithimba",
          "category": "Mukwe"
        },
        {
          "id": 4554,
          "name": "Shamara",
          "category": "Mukwe"
        },
        {
          "id": 4551,
          "name": "Havo",
          "category": "Mukwe"
        },
        {
          "id": 4152,
          "name": "Shakashi",
          "category": "Mukwe"
        },
        {
          "id": 4544,
          "name": "Dikundhu",
          "category": "Mukwe"
        },
        {
          "id": 4150,
          "name": "Shamambungu",
          "category": "Mukwe"
        },
        {
          "id": 4543,
          "name": "Muthinduko",
          "category": "Mukwe"
        },
        {
          "id": 4069,
          "name": "Mangamba",
          "category": "Mukwe"
        },
        {
          "id": 4545,
          "name": "Shamaturu",
          "category": "Mukwe"
        },
        {
          "id": 4553,
          "name": "Kavitji",
          "category": "Mukwe"
        },
        {
          "id": 4075,
          "name": "Frans Dimbare",
          "category": "Mukwe"
        },
        {
          "id": 4115,
          "name": "Shamundambo",
          "category": "Mukwe"
        },
        {
          "id": 4114,
          "name": "Ndongo",
          "category": "Mukwe"
        },
        {
          "id": 4511,
          "name": "Dimwagha",
          "category": "Mukwe"
        },
        {
          "id": 4549,
          "name": "Shaditunda",
          "category": "Mukwe"
        },
        {
          "id": 4153,
          "name": "Kangundja",
          "category": "Mukwe"
        },
        {
          "id": 4547,
          "name": "Shamunaro",
          "category": "Mukwe"
        },
        {
          "id": 4557,
          "name": "Shamwimbi",
          "category": "Mukwe"
        },
        {
          "id": 4515,
          "name": "Shutu",
          "category": "Mukwe"
        },
        {
          "id": 4151,
          "name": "Shaditata",
          "category": "Mukwe"
        },
        {
          "id": 4555,
          "name": "Shamangumbo",
          "category": "Mukwe"
        },
        {
          "id": 4512,
          "name": "Tapahutha",
          "category": "Mukwe"
        },
        {
          "id": 4158,
          "name": "Korokosha",
          "category": "Mukwe"
        },
        {
          "id": 4550,
          "name": "Shanondho",
          "category": "Mukwe"
        },
        {
          "id": 4520,
          "name": "Ngepi Camp",
          "category": "Mukwe"
        },
        {
          "id": 4123,
          "name": "Bufallo",
          "category": "Mukwe"
        },
        {
          "id": 4519,
          "name": "Muhembo Border",
          "category": "Mukwe"
        },
        {
          "id": 4516,
          "name": "Kamutjonga",
          "category": "Mukwe"
        },
        {
          "id": 4508,
          "name": "Mangarangandja",
          "category": "Mukwe"
        },
        {
          "id": 4237,
          "name": "Mukuvi",
          "category": "Ndiyona"
        },
        {
          "id": 4226,
          "name": "Mbambi (Nyangana district)",
          "category": "Mukwe"
        },
        {
          "id": 4238,
          "name": "Shamangorwa",
          "category": "Mukwe"
        },
        {
          "id": 4148,
          "name": "Mbapuka",
          "category": "Mukwe"
        },
        {
          "id": 4147,
          "name": "Kangongo",
          "category": "Mukwe"
        },
        {
          "id": 4149,
          "name": "Tjova",
          "category": "Mukwe"
        },
        {
          "id": 4221,
          "name": "Thikanduko",
          "category": "Mukwe"
        },
        {
          "id": 4218,
          "name": "Mayara",
          "category": "Mukwe"
        },
        {
          "id": 4224,
          "name": "Kavuvira",
          "category": "Mukwe"
        },
        {
          "id": 4220,
          "name": "Kayanga",
          "category": "Mukwe"
        },
        {
          "id": 4081,
          "name": "Shamaragho",
          "category": "Mukwe"
        },
        {
          "id": 4541,
          "name": "Shadjunu",
          "category": "Mukwe"
        },
        {
          "id": 4542,
          "name": "Diyana",
          "category": "Mukwe"
        },
        {
          "id": 4538,
          "name": "Rughongo",
          "category": "Mukwe"
        },
        {
          "id": 4068,
          "name": "Mukwe",
          "category": "Mukwe"
        },
        {
          "id": 4539,
          "name": "Thipanana",
          "category": "Mukwe"
        },
        {
          "id": 4067,
          "name": "Andara",
          "category": "Mukwe"
        },
        {
          "id": 4070,
          "name": "Diyogha",
          "category": "Mukwe"
        },
        {
          "id": 4116,
          "name": "Kake",
          "category": "Mukwe"
        },
        {
          "id": 4122,
          "name": "Mutjiku",
          "category": "Mukwe"
        },
        {
          "id": 4113,
          "name": "Divundu",
          "category": "Mukwe"
        },
        {
          "id": 4514,
          "name": "Kanorombwe",
          "category": "Mukwe"
        },
        {
          "id": 4510,
          "name": "Divava",
          "category": "Mukwe"
        },
        {
          "id": 4518,
          "name": "Bagani",
          "category": "Mukwe"
        },
        {
          "id": 4513,
          "name": "Popa",
          "category": "Mukwe"
        },
        {
          "id": 4517,
          "name": "Divayi",
          "category": "Mukwe"
        },
        {
          "id": 4505,
          "name": "Omega 1",
          "category": "Mukwe"
        },
        {
          "id": 4242,
          "name": "Munganya&Liyundo",
          "category": ""
        },
        {
          "id": 4143,
          "name": "Shatoka Farm",
          "category": ""
        },
        {
          "id": 4239,
          "name": "Livava",
          "category": ""
        },
        {
          "id": 4236,
          "name": "Katenture",
          "category": ""
        },
        {
          "id": 4079,
          "name": "Dihokohoko",
          "category": "Mukwe"
        },
        {
          "id": 4080,
          "name": "Shadipwera",
          "category": "Mukwe"
        },
        {
          "id": 4540,
          "name": "Kahanga",
          "category": "Mukwe"
        },
        {
          "id": 4537,
          "name": "Rudhiva",
          "category": "Mukwe"
        },
        {
          "id": 4546,
          "name": "Kaginya",
          "category": "Mukwe"
        },
        {
          "id": 4536,
          "name": "Shadikongoro",
          "category": "Mukwe"
        },
        {
          "id": 4072,
          "name": "Dipenga",
          "category": "Mukwe"
        },
        {
          "id": 4071,
          "name": "Shadimbungu",
          "category": "Mukwe"
        },
        {
          "id": 4118,
          "name": "Pukwe",
          "category": "Mukwe"
        },
        {
          "id": 4117,
          "name": "Shamavinyo",
          "category": "Mukwe"
        },
        {
          "id": 4121,
          "name": "Mushashani",
          "category": "Mukwe"
        },
        {
          "id": 4509,
          "name": "Mushasho",
          "category": "Mukwe"
        },
        {
          "id": 4506,
          "name": "Shamakwi",
          "category": "Mukwe"
        },
        {
          "id": 4507,
          "name": "Pitjiri",
          "category": "Mukwe"
        },
        {
          "id": 4552,
          "name": "Kapuka",
          "category": "Mukwe"
        },
        {
          "id": 4548,
          "name": "Shividi",
          "category": "Mukwe"
        },
        {
          "id": 4556,
          "name": "Shamaghandutji",
          "category": "Mukwe"
        },
        {
          "id": 4119,
          "name": "Karenga",
          "category": "Mukwe"
        },
        {
          "id": 4120,
          "name": "Mushangara",
          "category": "Mukwe"
        },
        {
          "id": 2148,
          "name": "Epembe",
          "category": "Epembe"
        },
        {
          "id": 2162,
          "name": "Etsapa",
          "category": "Epembe"
        },
        {
          "id": 2164,
          "name": "Ombwa",
          "category": "Epembe"
        },
        {
          "id": 2151,
          "name": "Ombaba",
          "category": "Epembe"
        },
        {
          "id": 2149,
          "name": "Omahahi",
          "category": "Oshikunde"
        },
        {
          "id": 2163,
          "name": "Oshongwe",
          "category": "Oshikunde"
        },
        {
          "id": 2308,
          "name": "Oshingadu",
          "category": "Omundaungilo"
        },
        {
          "id": 2297,
          "name": "Onaimbungu",
          "category": "Omundaungilo"
        },
        {
          "id": 2150,
          "name": "Ohamatundu",
          "category": "Epembe"
        },
        {
          "id": 2300,
          "name": "Omundaungilo",
          "category": "Omundaungilo"
        },
        {
          "id": 2299,
          "name": "Okahauwangena",
          "category": "Omundaungilo"
        },
        {
          "id": 2194,
          "name": "Oshingenge",
          "category": "Epembe"
        },
        {
          "id": 2319,
          "name": "Oushini",
          "category": "Oshikunde"
        },
        {
          "id": 2307,
          "name": "Oshikunde",
          "category": "Oshikunde"
        },
        {
          "id": 2320,
          "name": "Omhito Yamungolo",
          "category": "Oshikunde"
        },
        {
          "id": 2157,
          "name": "Ohamutwe",
          "category": "Epembe"
        },
        {
          "id": 2158,
          "name": "Ohamikoka",
          "category": "Epembe"
        },
        {
          "id": 2383,
          "name": "Eenyama",
          "category": "Eenhana"
        },
        {
          "id": 2176,
          "name": "Oshilambwili -Epembe",
          "category": "Epembe"
        },
        {
          "id": 2152,
          "name": "Eshii",
          "category": "Epembe"
        },
        {
          "id": 2154,
          "name": "Onduludiya",
          "category": "Epembe"
        },
        {
          "id": 2173,
          "name": "Eexwa",
          "category": "Omundaungilo"
        },
        {
          "id": 2456,
          "name": "Okwayuufuko",
          "category": "Omundaungilo"
        },
        {
          "id": 2452,
          "name": "Oshihepo",
          "category": "Omundaungilo"
        },
        {
          "id": 2389,
          "name": "Okavela",
          "category": "Omundaungilo"
        },
        {
          "id": 2316,
          "name": "Okamukukutu",
          "category": "Omundaungilo"
        },
        {
          "id": 2301,
          "name": "Omutwewondjaba (Omundaungilo constit.)",
          "category": "Omundaungilo"
        },
        {
          "id": 2188,
          "name": "OhandjoMbali",
          "category": "Omundaungilo"
        },
        {
          "id": 2380,
          "name": "Ondingwanyama",
          "category": "Eenhana"
        },
        {
          "id": 2185,
          "name": "Omboloka -Omundaungilo",
          "category": "Omundaungilo"
        },
        {
          "id": 2311,
          "name": "Oukala",
          "category": "Epembe"
        },
        {
          "id": 2175,
          "name": "Omwii",
          "category": "Epembe"
        },
        {
          "id": 2466,
          "name": "Ondwi 2",
          "category": "Omundaungilo"
        },
        {
          "id": 2324,
          "name": "Omhito yamwii",
          "category": "Omundaungilo"
        },
        {
          "id": 2315,
          "name": "Omatunda -Omundaungilo",
          "category": "Omundaungilo"
        },
        {
          "id": 2305,
          "name": "Onamungodji",
          "category": "Omundaungilo"
        },
        {
          "id": 2312,
          "name": "Omadano B",
          "category": "Omundaungilo"
        },
        {
          "id": 2366,
          "name": "Opepela",
          "category": "Oshikunde"
        },
        {
          "id": 2169,
          "name": "Ohaikedi",
          "category": "Omundaungilo"
        },
        {
          "id": 2183,
          "name": "OmufituWekuta",
          "category": "Omundaungilo"
        },
        {
          "id": 2174,
          "name": "Epinga",
          "category": "Omundaungilo"
        },
        {
          "id": 2372,
          "name": "Epale",
          "category": "Eenhana"
        },
        {
          "id": 2172,
          "name": "Onehova",
          "category": "Omundaungilo"
        },
        {
          "id": 2167,
          "name": "Onhunda",
          "category": "Omundaungilo"
        },
        {
          "id": 2298,
          "name": "Ohauwanga",
          "category": "Omundaungilo"
        },
        {
          "id": 2168,
          "name": "Onakalunga",
          "category": "Omundaungilo"
        },
        {
          "id": 2182,
          "name": "Oshikonda",
          "category": "Omundaungilo"
        },
        {
          "id": 2171,
          "name": "Eembidi",
          "category": "Omundaungilo"
        },
        {
          "id": 2191,
          "name": "Onaupanya/Omatunda",
          "category": "Omundaungilo"
        },
        {
          "id": 2184,
          "name": "Oidimba",
          "category": "Omundaungilo"
        },
        {
          "id": 2192,
          "name": "Edimba",
          "category": "Eenhana"
        },
        {
          "id": 2371,
          "name": "Omhito",
          "category": "Eenhana"
        },
        {
          "id": 2181,
          "name": "Ohainengena 2",
          "category": "Eenhana"
        },
        {
          "id": 2153,
          "name": "Ohamwiimbi",
          "category": "Epembe"
        },
        {
          "id": 2302,
          "name": "Omufiya",
          "category": "Epembe"
        },
        {
          "id": 2314,
          "name": "Omupanda",
          "category": "Epembe"
        },
        {
          "id": 2309,
          "name": "Etakaya",
          "category": "Oshikunde"
        },
        {
          "id": 2189,
          "name": "Eehapa",
          "category": "Omundaungilo"
        },
        {
          "id": 2190,
          "name": "Onangolo B",
          "category": "Omundaungilo"
        },
        {
          "id": 2179,
          "name": "Omadano A",
          "category": "Eenhana"
        },
        {
          "id": 2377,
          "name": "Ohausholo",
          "category": "Eenhana"
        },
        {
          "id": 2384,
          "name": "Iititoka",
          "category": "Eenhana"
        },
        {
          "id": 2195,
          "name": "Onangolo A",
          "category": "Epembe"
        },
        {
          "id": 2187,
          "name": "Epasha",
          "category": "Omundaungilo"
        },
        {
          "id": 2177,
          "name": "Elundu",
          "category": "Omundaungilo"
        },
        {
          "id": 2186,
          "name": "Okapashona",
          "category": "Omundaungilo"
        },
        {
          "id": 2325,
          "name": "Ohenghono",
          "category": "Omundaungilo"
        },
        {
          "id": 2304,
          "name": "Oshipala",
          "category": "Omundaungilo"
        },
        {
          "id": 2145,
          "name": "Oshali",
          "category": "Oshikunde"
        },
        {
          "id": 2313,
          "name": "Okadidiya",
          "category": "Oshikunde"
        },
        {
          "id": 2310,
          "name": "EpumbaLondjaba",
          "category": "Oshikunde"
        },
        {
          "id": 2155,
          "name": "Oluungu",
          "category": "Epembe"
        },
        {
          "id": 2156,
          "name": "Oshimhangwa",
          "category": "Oshikunde"
        },
        {
          "id": 2323,
          "name": "Owalyainda",
          "category": "Oshikunde"
        },
        {
          "id": 2376,
          "name": "Omatha",
          "category": "Eenhana"
        },
        {
          "id": 2393,
          "name": "Oniikundundu",
          "category": "Eenhana"
        },
        {
          "id": 2178,
          "name": "Okamwandi",
          "category": "Epembe"
        },
        {
          "id": 2387,
          "name": "Omevatahekele",
          "category": "Epembe"
        },
        {
          "id": 2318,
          "name": "Oshidute",
          "category": "Epembe"
        },
        {
          "id": 2165,
          "name": "Ohamenya",
          "category": "Epembe"
        },
        {
          "id": 2159,
          "name": "Ekuma",
          "category": "Epembe"
        },
        {
          "id": 2161,
          "name": "Onamagogani",
          "category": "Epembe"
        },
        {
          "id": 2317,
          "name": "Okahauyawena",
          "category": "Oshikunde"
        },
        {
          "id": 2361,
          "name": "Omutwewomunhu",
          "category": "Oshikunde"
        },
        {
          "id": 2166,
          "name": "Oonduda",
          "category": "Epembe"
        },
        {
          "id": 2322,
          "name": "Omulonga",
          "category": "Oshikunde"
        },
        {
          "id": 2160,
          "name": "Egongo",
          "category": "Epembe"
        },
        {
          "id": 2193,
          "name": "Ohaihana",
          "category": "Eenhana"
        },
        {
          "id": 2379,
          "name": "Oukango",
          "category": "Eenhana"
        },
        {
          "id": 2303,
          "name": "Oshuuli",
          "category": "Oshikunde"
        },
        {
          "id": 2321,
          "name": "Omulondo",
          "category": "Oshikunde"
        },
        {
          "id": 2363,
          "name": "Eshosho",
          "category": "Oshikunde"
        },
        {
          "id": 2196,
          "name": "Uuholamo",
          "category": "Eenhana"
        },
        {
          "id": 2374,
          "name": "Onakatumbe",
          "category": "Eenhana"
        },
        {
          "id": 2370,
          "name": "Oshaango",
          "category": "Eenhana"
        },
        {
          "id": 2385,
          "name": "Onankali",
          "category": "Eenhana"
        },
        {
          "id": 2381,
          "name": "Okakango Konduda",
          "category": "Eenhana"
        },
        {
          "id": 2455,
          "name": "Omakelo",
          "category": "Ondobe"
        },
        {
          "id": 2454,
          "name": "Ekolola",
          "category": "Ondobe"
        },
        {
          "id": 2460,
          "name": "Ohainengena",
          "category": "Ondobe"
        },
        {
          "id": 2464,
          "name": "Omhedi -Ondobe",
          "category": "Ondobe"
        },
        {
          "id": 2395,
          "name": "Okanghudi Ka Shimwiyo",
          "category": "Ondobe"
        },
        {
          "id": 2369,
          "name": "Omupindi",
          "category": "Eenhana"
        },
        {
          "id": 2403,
          "name": "Odibo ya haiti",
          "category": "Oshikango"
        },
        {
          "id": 2394,
          "name": "Onamunama",
          "category": "Oshikango"
        },
        {
          "id": 2367,
          "name": "Eenhana",
          "category": "Eenhana"
        },
        {
          "id": 2410,
          "name": "Oilyateko",
          "category": "Ondobe"
        },
        {
          "id": 2401,
          "name": "Ondobe",
          "category": "Ondobe"
        },
        {
          "id": 2344,
          "name": "Onailonga",
          "category": "Omulonga"
        },
        {
          "id": 2399,
          "name": "Omunyekladi",
          "category": "Ondobe"
        },
        {
          "id": 2342,
          "name": "Ohaukelo",
          "category": "Omulonga"
        },
        {
          "id": 2343,
          "name": "Onamukulo",
          "category": "Omulonga"
        },
        {
          "id": 2465,
          "name": "Efidi",
          "category": "Ondobe"
        },
        {
          "id": 2396,
          "name": "Etomba West",
          "category": "Oshikango"
        },
        {
          "id": 2409,
          "name": "Etope",
          "category": "Omulonga"
        },
        {
          "id": 2463,
          "name": "Eendadi",
          "category": "Ondobe"
        },
        {
          "id": 2402,
          "name": "Okapundja",
          "category": "Ohangwena"
        },
        {
          "id": 2467,
          "name": "Ohengobe",
          "category": "Ondobe"
        },
        {
          "id": 2458,
          "name": "Oshandi1",
          "category": "Ondobe"
        },
        {
          "id": 2461,
          "name": "Okanghudi",
          "category": "Ondobe"
        },
        {
          "id": 2386,
          "name": "Oshuulu",
          "category": "Omulonga"
        },
        {
          "id": 2459,
          "name": "Oshandi2",
          "category": "Ondobe"
        },
        {
          "id": 2382,
          "name": "Onambutu",
          "category": "Eenhana"
        },
        {
          "id": 2368,
          "name": "Onanona",
          "category": "Eenhana"
        },
        {
          "id": 2375,
          "name": "Elwafa",
          "category": "Omulonga"
        },
        {
          "id": 2345,
          "name": "Omhokolo",
          "category": "Omulonga"
        },
        {
          "id": 2378,
          "name": "Otunganga",
          "category": "Eenhana"
        },
        {
          "id": 2422,
          "name": "Ondungulu",
          "category": "Ohangwena"
        },
        {
          "id": 2248,
          "name": "Odibo",
          "category": "Ohangwena"
        },
        {
          "id": 2333,
          "name": "Eenghango",
          "category": "Omulonga"
        },
        {
          "id": 2462,
          "name": "Eengonyo",
          "category": "Ondobe"
        },
        {
          "id": 2388,
          "name": "Ohandiba",
          "category": "Ondobe"
        },
        {
          "id": 2411,
          "name": "Omutaku",
          "category": "Ondobe"
        },
        {
          "id": 2306,
          "name": "Ondwi 1",
          "category": "Ondobe"
        },
        {
          "id": 2453,
          "name": "Oheti1",
          "category": "Ondobe"
        },
        {
          "id": 2451,
          "name": "Oheti2",
          "category": "Ondobe"
        },
        {
          "id": 2457,
          "name": "Omutwewondjaba (Ondobe constit.)",
          "category": "Ondobe"
        },
        {
          "id": 2328,
          "name": "Okathakamumbwenge",
          "category": "Omulonga"
        },
        {
          "id": 2469,
          "name": "Oshangu",
          "category": "Omulonga"
        },
        {
          "id": 2468,
          "name": "Egambo",
          "category": "Ondobe"
        },
        {
          "id": 2373,
          "name": "Otaukondjele",
          "category": "Ondobe"
        },
        {
          "id": 2390,
          "name": "Onekaku",
          "category": "Omulonga"
        },
        {
          "id": 390,
          "name": "Elombe",
          "category": "Onayena"
        },
        {
          "id": 391,
          "name": "Enkolo",
          "category": "Onayena"
        },
        {
          "id": 385,
          "name": "Onamutenya",
          "category": "Onayena"
        },
        {
          "id": 2392,
          "name": "Omhanda",
          "category": "Eenhana"
        },
        {
          "id": 489,
          "name": "Uuyoka (Onyaanya cluster)",
          "category": "Onyaanya"
        },
        {
          "id": 431,
          "name": "Omuvi",
          "category": "Okankolo"
        },
        {
          "id": 436,
          "name": "Onamvula A",
          "category": "Okankolo"
        },
        {
          "id": 2180,
          "name": "Onainghete",
          "category": ""
        },
        {
          "id": 433,
          "name": "Onamvula B",
          "category": "Okankolo"
        },
        {
          "id": 2170,
          "name": "Ohehonge",
          "category": "Omundaungilo"
        },
        {
          "id": 430,
          "name": "Ongaungau",
          "category": "Okankolo"
        },
        {
          "id": 473,
          "name": "Ondjaba Yo Nghalu",
          "category": "Okankolo"
        },
        {
          "id": 2326,
          "name": "Ohauyave",
          "category": ""
        },
        {
          "id": 472,
          "name": "Onalushishi",
          "category": "Okankolo"
        },
        {
          "id": 864,
          "name": "Oshiongera",
          "category": "Okaku"
        },
        {
          "id": 427,
          "name": "Ohaimbanda",
          "category": "Okankolo"
        },
        {
          "id": 428,
          "name": "Iyambonomuyamba",
          "category": "Okankolo"
        },
        {
          "id": 434,
          "name": "Oshilimeya",
          "category": "Okankolo"
        },
        {
          "id": 432,
          "name": "Oshipanga",
          "category": "Okankolo"
        },
        {
          "id": 468,
          "name": "Ongala",
          "category": "Okankolo"
        },
        {
          "id": 439,
          "name": "Egolo",
          "category": "Okankolo"
        },
        {
          "id": 474,
          "name": "Onamutanga",
          "category": "Okankolo"
        },
        {
          "id": 467,
          "name": "Onehongo",
          "category": "Okankolo"
        },
        {
          "id": 438,
          "name": "Omeyantalala",
          "category": "Okankolo"
        },
        {
          "id": 383,
          "name": "Omagola",
          "category": "Oniipa"
        },
        {
          "id": 386,
          "name": "Oshigambo",
          "category": "Oniipa"
        },
        {
          "id": 388,
          "name": "Okalambo",
          "category": "Oniipa"
        },
        {
          "id": 381,
          "name": "Oshamba A",
          "category": "Oniipa"
        },
        {
          "id": 387,
          "name": "Ashiyupa",
          "category": "Oniipa"
        },
        {
          "id": 461,
          "name": "Onamulunga A",
          "category": "Oniipa"
        },
        {
          "id": 462,
          "name": "Oshaakondwa",
          "category": "Olukonda"
        },
        {
          "id": 382,
          "name": "Okatha No. 3",
          "category": "Oniipa"
        },
        {
          "id": 460,
          "name": "Onathinge - Oniipa",
          "category": "Oniipa"
        },
        {
          "id": 443,
          "name": "Oyovu",
          "category": "Oniipa"
        },
        {
          "id": 392,
          "name": "Oneumba",
          "category": "Oniipa"
        },
        {
          "id": 465,
          "name": "Oniihandi",
          "category": "Oniipa"
        },
        {
          "id": 380,
          "name": "Oshipanda No. 1",
          "category": "Oniipa"
        },
        {
          "id": 389,
          "name": "Onampadhi",
          "category": "Oniipa"
        },
        {
          "id": 455,
          "name": "Uuyoka (Onayena cluster)",
          "category": "Onayena"
        },
        {
          "id": 441,
          "name": "Etunda No 2",
          "category": "Okankolo"
        },
        {
          "id": 451,
          "name": "Uukete",
          "category": "Onayena"
        },
        {
          "id": 454,
          "name": "Oniihwa A",
          "category": "Onayena"
        },
        {
          "id": 452,
          "name": "Oniimwandi",
          "category": "Onayena"
        },
        {
          "id": 393,
          "name": "Onamutene",
          "category": "Onayena"
        },
        {
          "id": 394,
          "name": "Iikokola",
          "category": "Onayena"
        },
        {
          "id": 457,
          "name": "Oniiwe A & B",
          "category": "Onayena"
        },
        {
          "id": 447,
          "name": "Ompugulu",
          "category": "Onayena"
        },
        {
          "id": 437,
          "name": "Etunda No 3",
          "category": "Okankolo"
        },
        {
          "id": 384,
          "name": "Ondembo",
          "category": "Oniipa"
        },
        {
          "id": 456,
          "name": "Onguma",
          "category": "Oniipa"
        },
        {
          "id": 464,
          "name": "Ondando B",
          "category": "Oniipa"
        },
        {
          "id": 463,
          "name": "Ondando A",
          "category": "Oniipa"
        },
        {
          "id": 2249,
          "name": "Engela",
          "category": "Ohangwena"
        },
        {
          "id": 2270,
          "name": "Omufitu",
          "category": "Engela"
        },
        {
          "id": 2406,
          "name": "Etilashi",
          "category": "Engela"
        },
        {
          "id": 2350,
          "name": "Epundi",
          "category": "Engela"
        },
        {
          "id": 2424,
          "name": "Oshali-Endola",
          "category": "Endola"
        },
        {
          "id": 2432,
          "name": "Ohalushu",
          "category": "Endola"
        },
        {
          "id": 2347,
          "name": "Okamukwa",
          "category": "Engela"
        },
        {
          "id": 2430,
          "name": "Eengwena",
          "category": "Endola"
        },
        {
          "id": 2435,
          "name": "Okambebe",
          "category": "Ongenga"
        },
        {
          "id": 202,
          "name": "Oruaku",
          "category": "Okakarara"
        },
        {
          "id": 310,
          "name": "Omboora",
          "category": "Okakarara"
        },
        {
          "id": 200,
          "name": "Okamatundjindo",
          "category": "Okakarara"
        },
        {
          "id": 213,
          "name": "otjitoveni",
          "category": "Okakarara"
        },
        {
          "id": 285,
          "name": "Okamatapati",
          "category": "Okakarara"
        },
        {
          "id": 238,
          "name": "Wergemoed",
          "category": "Okakarara"
        },
        {
          "id": 289,
          "name": "Otjiwapehuri",
          "category": "Okakarara"
        },
        {
          "id": 288,
          "name": "Okaepe",
          "category": "Okakarara"
        },
        {
          "id": 293,
          "name": "Okotjitundu",
          "category": "Okakarara"
        },
        {
          "id": 291,
          "name": "Okaari",
          "category": "Okakarara"
        },
        {
          "id": 286,
          "name": "Otjovahonge",
          "category": "Okakarara"
        },
        {
          "id": 287,
          "name": "Okatembakondova",
          "category": "Okakarara"
        },
        {
          "id": 290,
          "name": "Omazera",
          "category": "Okakarara"
        },
        {
          "id": 294,
          "name": "Otjijamangombe",
          "category": "Okakarara"
        },
        {
          "id": 292,
          "name": "Okondjatu",
          "category": "Okakarara"
        },
        {
          "id": 215,
          "name": "Otjiwuapehuri",
          "category": "Tsumkwe"
        },
        {
          "id": 4488,
          "name": "Maporeza",
          "category": "Ncamagoro"
        },
        {
          "id": 4411,
          "name": "Tamutamu",
          "category": "Ncamagoro"
        },
        {
          "id": 4162,
          "name": "Mahahe (Katjinakatji cluster)",
          "category": ""
        },
        {
          "id": 4412,
          "name": "Namagadi",
          "category": "Mashare"
        },
        {
          "id": 4410,
          "name": "Karukuvisa",
          "category": "Ncuncuni"
        },
        {
          "id": 520,
          "name": "Goraeb",
          "category": "Guinas"
        },
        {
          "id": 532,
          "name": "Tsintsabis",
          "category": "Guinas"
        },
        {
          "id": 530,
          "name": "Oerwoud Resettlement",
          "category": "Guinas"
        },
        {
          "id": 538,
          "name": "Bosrand",
          "category": "Guinas"
        },
        {
          "id": 529,
          "name": "Pietrsberg",
          "category": ""
        },
        {
          "id": 542,
          "name": "Cuxhaven",
          "category": "Tsumeb"
        },
        {
          "id": 231,
          "name": "Don- Tsebeb",
          "category": "Grootfontein"
        },
        {
          "id": 548,
          "name": "Neseier",
          "category": "Tsumeb"
        },
        {
          "id": 531,
          "name": "Rentia",
          "category": ""
        },
        {
          "id": 536,
          "name": "Huigub",
          "category": "Guinas"
        },
        {
          "id": 549,
          "name": "Hiebis Ost",
          "category": "Tsumeb"
        },
        {
          "id": 547,
          "name": "Plaatsak",
          "category": ""
        },
        {
          "id": 315,
          "name": "Orukango",
          "category": "Okakarara"
        },
        {
          "id": 201,
          "name": "Okangoho",
          "category": "Okakarara"
        },
        {
          "id": 218,
          "name": "Berg Aukas Smit part",
          "category": "Grootfontein"
        },
        {
          "id": 309,
          "name": "okatjoruu",
          "category": "Okakarara"
        },
        {
          "id": 312,
          "name": "Okahumba",
          "category": "Okakarara"
        },
        {
          "id": 323,
          "name": "Okatumuama",
          "category": "Okakarara"
        },
        {
          "id": 313,
          "name": "Otjomikambo",
          "category": "Okakarara"
        },
        {
          "id": 314,
          "name": "Otjinatjomiparara",
          "category": "Okakarara"
        },
        {
          "id": 324,
          "name": "Otjikango",
          "category": "Okakarara"
        },
        {
          "id": 311,
          "name": "Ongombembapa",
          "category": "Okakarara"
        },
        {
          "id": 325,
          "name": "Omuramba",
          "category": "Okakarara"
        },
        {
          "id": 316,
          "name": "Oururua",
          "category": "Okakarara"
        },
        {
          "id": 203,
          "name": "Coblenz",
          "category": "Okakarara"
        },
        {
          "id": 318,
          "name": "Okomita",
          "category": "Okakarara"
        },
        {
          "id": 320,
          "name": "Ondjomboyomungondo",
          "category": "Okakarara"
        },
        {
          "id": 217,
          "name": "Berg Aukas Plot",
          "category": "Grootfontein"
        },
        {
          "id": 4174,
          "name": "Etenderera (Katjinakatji cluster)",
          "category": "Mashare"
        },
        {
          "id": 4569,
          "name": "Cuma (Shambyu cluster)",
          "category": "Mashare"
        },
        {
          "id": 4336,
          "name": "Namasira",
          "category": "Mpungu"
        },
        {
          "id": 4235,
          "name": "Katwitwi",
          "category": "Mpungu"
        },
        {
          "id": 4230,
          "name": "Tuguva",
          "category": "Mpungu"
        },
        {
          "id": 4340,
          "name": "Mupapama (Nankudu district)",
          "category": "Mpungu"
        },
        {
          "id": 4478,
          "name": "Nkurugoma",
          "category": "Mpungu"
        },
        {
          "id": 4322,
          "name": "Usivi",
          "category": "Mpungu"
        },
        {
          "id": 4323,
          "name": "Mpoto Mukukutu",
          "category": "Mpungu"
        },
        {
          "id": 4337,
          "name": "Mukata",
          "category": "Mpungu"
        },
        {
          "id": 4351,
          "name": "Muheke",
          "category": "Mpungu"
        },
        {
          "id": 4315,
          "name": "Sirondera",
          "category": "Mpungu"
        },
        {
          "id": 4350,
          "name": "Ntopa",
          "category": "Mpungu"
        },
        {
          "id": 4316,
          "name": "Gode",
          "category": "Mpungu"
        },
        {
          "id": 4325,
          "name": "Wiwi",
          "category": "Mpungu"
        },
        {
          "id": 4481,
          "name": "Siudiva",
          "category": "Nkurenkure"
        },
        {
          "id": 4332,
          "name": "Ndjere",
          "category": "Mpungu"
        },
        {
          "id": 4353,
          "name": "Nalisova",
          "category": "Mpungu"
        },
        {
          "id": 4352,
          "name": "Cumusani",
          "category": "Mpungu"
        },
        {
          "id": 4342,
          "name": "Rundu",
          "category": "Mpungu"
        },
        {
          "id": 4321,
          "name": "Lihaha",
          "category": "Mpungu"
        },
        {
          "id": 4594,
          "name": "Ndombe",
          "category": "Mpungu"
        },
        {
          "id": 4182,
          "name": "Mapanda",
          "category": "Mpungu"
        },
        {
          "id": 4334,
          "name": "Ngandu",
          "category": "Mpungu"
        },
        {
          "id": 4318,
          "name": "Tare",
          "category": "Mpungu"
        },
        {
          "id": 4303,
          "name": "Simbungu",
          "category": "Mpungu"
        },
        {
          "id": 4335,
          "name": "Zone",
          "category": "Mpungu"
        },
        {
          "id": 4327,
          "name": "Mukekete Nondjombo",
          "category": "Mpungu"
        },
        {
          "id": 4355,
          "name": "Caima",
          "category": "Mpungu"
        },
        {
          "id": 4229,
          "name": "Makambu",
          "category": "Mpungu"
        },
        {
          "id": 4228,
          "name": "Mbambi (Nankudu district)",
          "category": "Mpungu"
        },
        {
          "id": 4302,
          "name": "Kasoro",
          "category": "Mpungu"
        },
        {
          "id": 4233,
          "name": "Namutuntu",
          "category": "Mpungu"
        },
        {
          "id": 4227,
          "name": "Kahoro (Mbambi cluster)",
          "category": "Mpungu"
        },
        {
          "id": 4234,
          "name": "Nkinka",
          "category": "Mpungu"
        },
        {
          "id": 4232,
          "name": "Mavhenge",
          "category": "Mpungu"
        },
        {
          "id": 4231,
          "name": "Simanya",
          "category": "Mpungu"
        },
        {
          "id": 4485,
          "name": "Kanyikama",
          "category": "Mpungu"
        },
        {
          "id": 4331,
          "name": "Mugomba",
          "category": "Mpungu"
        },
        {
          "id": 4299,
          "name": "Sawato",
          "category": "Mpungu"
        },
        {
          "id": 4450,
          "name": "Kaguni (Nankudu district)",
          "category": "Mpungu"
        },
        {
          "id": 4339,
          "name": "Nyonga",
          "category": "Mpungu"
        },
        {
          "id": 4307,
          "name": "Katope Kovanyemba",
          "category": "Nkurenkure"
        },
        {
          "id": 4490,
          "name": "Karayi",
          "category": "Mpungu"
        },
        {
          "id": 4479,
          "name": "Mbeyo (Nankudu district)",
          "category": "Mpungu"
        },
        {
          "id": 4269,
          "name": "Sivi",
          "category": "Tondoro"
        },
        {
          "id": 4588,
          "name": "Maha",
          "category": "Tondoro"
        },
        {
          "id": 4354,
          "name": "Nkasima",
          "category": "Mpungu"
        },
        {
          "id": 4589,
          "name": "Nambali",
          "category": "Tondoro"
        },
        {
          "id": 4333,
          "name": "Nkata (Nankudu district)",
          "category": "Mpungu"
        },
        {
          "id": 4305,
          "name": "Katope Komugoro",
          "category": "Mpungu"
        },
        {
          "id": 4591,
          "name": "Nyege",
          "category": "Tondoro"
        },
        {
          "id": 4300,
          "name": "Kasara",
          "category": "Mpungu"
        },
        {
          "id": 4347,
          "name": "Stuveli",
          "category": "Mpungu"
        },
        {
          "id": 4346,
          "name": "Katrina",
          "category": "Mpungu"
        },
        {
          "id": 4329,
          "name": "Nandingwa",
          "category": "Mpungu"
        },
        {
          "id": 4467,
          "name": "Same",
          "category": "Mpungu"
        },
        {
          "id": 4445,
          "name": "Calise",
          "category": "Mpungu"
        },
        {
          "id": 4394,
          "name": "Mutjokotjo",
          "category": "Tondoro"
        },
        {
          "id": 4383,
          "name": "Kamupupu",
          "category": "Tondoro"
        },
        {
          "id": 4271,
          "name": "Tjara",
          "category": "Tondoro"
        },
        {
          "id": 4255,
          "name": "Mbambamusi",
          "category": "Tondoro"
        },
        {
          "id": 4275,
          "name": "Nkandi 2 [West]",
          "category": "Tondoro"
        },
        {
          "id": 4348,
          "name": "Gcaima",
          "category": "Mpungu"
        },
        {
          "id": 4338,
          "name": "Nkulivere",
          "category": "Mpungu"
        },
        {
          "id": 4253,
          "name": "Desi",
          "category": "Tondoro"
        },
        {
          "id": 4186,
          "name": "Mangetti",
          "category": "Tondoro"
        },
        {
          "id": 4320,
          "name": "Zauma",
          "category": "Mpungu"
        },
        {
          "id": 4254,
          "name": "Gcaruhwa",
          "category": "Musese"
        },
        {
          "id": 4533,
          "name": "Mpengu",
          "category": "Tondoro"
        },
        {
          "id": 4459,
          "name": "Mukambo",
          "category": "Mpungu"
        },
        {
          "id": 4470,
          "name": "Sihetekera Tjowa",
          "category": "Mpungu"
        },
        {
          "id": 4477,
          "name": "Igoro",
          "category": "Mpungu"
        },
        {
          "id": 4270,
          "name": "Sivara (Nankudu district)",
          "category": "Mpungu"
        },
        {
          "id": 4473,
          "name": "Siraro",
          "category": "Mpungu"
        },
        {
          "id": 4465,
          "name": "Nepara",
          "category": "Mpungu"
        },
        {
          "id": 4451,
          "name": "Kankudi",
          "category": "Nkurenkure"
        },
        {
          "id": 4446,
          "name": "Dikweya",
          "category": "Nkurenkure"
        },
        {
          "id": 4590,
          "name": "Mbengu",
          "category": "Nkurenkure"
        },
        {
          "id": 4462,
          "name": "Mutambo",
          "category": "Mpungu"
        },
        {
          "id": 4592,
          "name": "Simwege",
          "category": "Mpungu"
        },
        {
          "id": 4586,
          "name": "Kandimbe",
          "category": "Mpungu"
        },
        {
          "id": 4453,
          "name": "Karave",
          "category": "Mpungu"
        },
        {
          "id": 4267,
          "name": "Singuruve",
          "category": "Tondoro"
        },
        {
          "id": 4276,
          "name": "Nkwizu",
          "category": "Mpungu"
        },
        {
          "id": 4530,
          "name": "Paranyime",
          "category": "Musese"
        },
        {
          "id": 4457,
          "name": "Muhama",
          "category": "Musese"
        },
        {
          "id": 4448,
          "name": "Gava",
          "category": "Mpungu"
        },
        {
          "id": 4464,
          "name": "Naimanya",
          "category": "Mpungu"
        },
        {
          "id": 4345,
          "name": "Etapa",
          "category": "Mpungu"
        },
        {
          "id": 4454,
          "name": "Kasimba",
          "category": "Mpungu"
        },
        {
          "id": 4471,
          "name": "Sikarosompo",
          "category": "Mpungu"
        },
        {
          "id": 4466,
          "name": "Ngee",
          "category": "Mpungu"
        },
        {
          "id": 4474,
          "name": "Suni",
          "category": "Tondoro"
        },
        {
          "id": 4262,
          "name": "Naucova",
          "category": "Musese"
        },
        {
          "id": 4100,
          "name": "Kakuhu",
          "category": "Musese"
        },
        {
          "id": 4273,
          "name": "Nkandi 1 [East]",
          "category": "Tondoro"
        },
        {
          "id": 4330,
          "name": "Ndjamba",
          "category": "Mpungu"
        },
        {
          "id": 4256,
          "name": "Murere",
          "category": "Tondoro"
        },
        {
          "id": 4317,
          "name": "Kwaki",
          "category": "Mpungu"
        },
        {
          "id": 4266,
          "name": "Sava",
          "category": "Tondoro"
        },
        {
          "id": 4272,
          "name": "Toyota",
          "category": "Tondoro"
        },
        {
          "id": 4250,
          "name": "Calikao",
          "category": "Tondoro"
        },
        {
          "id": 4349,
          "name": "Cattle Post",
          "category": "Mpungu"
        },
        {
          "id": 4301,
          "name": "Brugo",
          "category": "Mpungu"
        },
        {
          "id": 4274,
          "name": "Nkambe",
          "category": "Tondoro"
        },
        {
          "id": 4265,
          "name": "Nyondo (Nankudu district)",
          "category": "Tondoro"
        },
        {
          "id": 4167,
          "name": "Gumi (Katjinakatji cluster)",
          "category": "Tondoro"
        },
        {
          "id": 4308,
          "name": "Kasera",
          "category": "Mpungu"
        },
        {
          "id": 4326,
          "name": "Nandeu",
          "category": "Mpungu"
        },
        {
          "id": 375,
          "name": "Mange",
          "category": "Eengondi"
        },
        {
          "id": 4356,
          "name": "Dema",
          "category": "Mpungu"
        },
        {
          "id": 4344,
          "name": "Tjoha",
          "category": "Musese"
        },
        {
          "id": 4461,
          "name": "Murayi",
          "category": "Mpungu"
        },
        {
          "id": 4456,
          "name": "Mise",
          "category": "Mpungu"
        },
        {
          "id": 4431,
          "name": "Mutorwa",
          "category": "Musese"
        },
        {
          "id": 4424,
          "name": "Singuruve (Rundu district)",
          "category": "Mankumpi"
        },
        {
          "id": 4468,
          "name": "Rukure",
          "category": "Mpungu"
        },
        {
          "id": 4472,
          "name": "Sikumba",
          "category": "Mpungu"
        },
        {
          "id": 4103,
          "name": "Mpuku",
          "category": "Musese"
        },
        {
          "id": 4105,
          "name": "Nauncova",
          "category": "Musese"
        },
        {
          "id": 4106,
          "name": "Gcangcawe",
          "category": "Mankumpi"
        },
        {
          "id": 4296,
          "name": "Davare",
          "category": "Musese"
        },
        {
          "id": 378,
          "name": "Zigizi",
          "category": "Eengondi"
        },
        {
          "id": 4263,
          "name": "Nsimba",
          "category": "Tondoro"
        },
        {
          "id": 4264,
          "name": "Nyime",
          "category": "Tondoro"
        },
        {
          "id": 4178,
          "name": "Maporeza (Katjinakatji cluster)",
          "category": "Mankumpi"
        },
        {
          "id": 4109,
          "name": "Samasira",
          "category": "Kapako"
        },
        {
          "id": 4107,
          "name": "Huwe",
          "category": "Kapako"
        },
        {
          "id": 4108,
          "name": "Sau",
          "category": "Musese"
        },
        {
          "id": 4287,
          "name": "Mutompo",
          "category": "Ncamagoro"
        },
        {
          "id": 4294,
          "name": "Nzovhhu",
          "category": "Mankumpi"
        },
        {
          "id": 4165,
          "name": "Katjinakatji",
          "category": "Ncamagoro"
        },
        {
          "id": 4480,
          "name": "Kahenge",
          "category": "Nkurenkure"
        },
        {
          "id": 4391,
          "name": "Ngone (Nankudu district)",
          "category": "Tondoro"
        },
        {
          "id": 4390,
          "name": "Kahoro (Nankudu cluster)",
          "category": "Tondoro"
        },
        {
          "id": 4389,
          "name": "Marema",
          "category": "Tondoro"
        },
        {
          "id": 4388,
          "name": "Nambi",
          "category": "Tondoro"
        },
        {
          "id": 4297,
          "name": "Mpungu",
          "category": "Mpungu"
        },
        {
          "id": 4312,
          "name": "Silikunga",
          "category": "Mpungu"
        },
        {
          "id": 4486,
          "name": "Musu",
          "category": "Mpungu"
        },
        {
          "id": 4483,
          "name": "Siurungu",
          "category": "Nkurenkure"
        },
        {
          "id": 4482,
          "name": "Kakuro",
          "category": "Nkurenkure"
        },
        {
          "id": 4489,
          "name": "Nkurenkuru",
          "category": "Nkurenkure"
        },
        {
          "id": 4387,
          "name": "Nankudu",
          "category": "Tondoro"
        },
        {
          "id": 4386,
          "name": "Sitopogo",
          "category": "Tondoro"
        },
        {
          "id": 4385,
          "name": "Mukekete East",
          "category": "Tondoro"
        },
        {
          "id": 4585,
          "name": "Ekuli",
          "category": "Tondoro"
        },
        {
          "id": 4384,
          "name": "Tondoro",
          "category": "Tondoro"
        },
        {
          "id": 4382,
          "name": "Kambumbu",
          "category": "Tondoro"
        },
        {
          "id": 4257,
          "name": "Musine",
          "category": "Tondoro"
        },
        {
          "id": 4380,
          "name": "Matava",
          "category": "Tondoro"
        },
        {
          "id": 4392,
          "name": "Mbome",
          "category": "Tondoro"
        },
        {
          "id": 4381,
          "name": "Nkonke",
          "category": "Tondoro"
        },
        {
          "id": 4379,
          "name": "Katara",
          "category": "Tondoro"
        },
        {
          "id": 4395,
          "name": "Namavambi",
          "category": "Tondoro"
        },
        {
          "id": 4378,
          "name": "Nzinze",
          "category": "Musese"
        },
        {
          "id": 4393,
          "name": "Rupeho",
          "category": "Tondoro"
        },
        {
          "id": 4258,
          "name": "Kaparara",
          "category": "Tondoro"
        },
        {
          "id": 4532,
          "name": "Sikenge Ndc Proof Project",
          "category": "Musese"
        },
        {
          "id": 4529,
          "name": "Siko",
          "category": "Musese"
        },
        {
          "id": 4528,
          "name": "Musese",
          "category": "Musese"
        },
        {
          "id": 4527,
          "name": "Kakoro",
          "category": "Musese"
        },
        {
          "id": 4526,
          "name": "Mpuma",
          "category": "Musese"
        },
        {
          "id": 4525,
          "name": "Rupara",
          "category": "Musese"
        },
        {
          "id": 4593,
          "name": "Yinsu",
          "category": "Mpungu"
        },
        {
          "id": 4083,
          "name": "Gcwagi",
          "category": "Musese"
        },
        {
          "id": 4523,
          "name": "Kayeura",
          "category": "Musese"
        },
        {
          "id": 4521,
          "name": "Mayenzere",
          "category": "Musese"
        },
        {
          "id": 4524,
          "name": "Haisisira",
          "category": "Musese"
        },
        {
          "id": 4084,
          "name": "Muveve",
          "category": "Musese"
        },
        {
          "id": 4531,
          "name": "Nohambo",
          "category": "Musese"
        },
        {
          "id": 4447,
          "name": "Ehafo",
          "category": "Musese"
        },
        {
          "id": 4098,
          "name": "Gcangcu",
          "category": "Musese"
        },
        {
          "id": 4260,
          "name": "Mpande",
          "category": "Musese"
        },
        {
          "id": 4460,
          "name": "Muparara",
          "category": "Mpungu"
        },
        {
          "id": 4112,
          "name": "Katope",
          "category": "Musese"
        },
        {
          "id": 4175,
          "name": "Satotwa",
          "category": "Mankumpi"
        },
        {
          "id": 4099,
          "name": "Harapembe",
          "category": "Mankumpi"
        },
        {
          "id": 4251,
          "name": "Etenderera",
          "category": "Mankumpi"
        },
        {
          "id": 4085,
          "name": "Ntara",
          "category": "Musese"
        },
        {
          "id": 4086,
          "name": "Masiro",
          "category": "Musese"
        },
        {
          "id": 4087,
          "name": "Manyondo",
          "category": "Kapako"
        },
        {
          "id": 4293,
          "name": "Erago",
          "category": "Ncamagoro"
        },
        {
          "id": 4185,
          "name": "Mayongora",
          "category": "Ncamagoro"
        },
        {
          "id": 365,
          "name": "Oshanashuutauwa",
          "category": "Eengondi"
        },
        {
          "id": 369,
          "name": "Oshana Shangali",
          "category": "Eengondi"
        },
        {
          "id": 370,
          "name": "Ontandashiye",
          "category": "Eengondi"
        },
        {
          "id": 366,
          "name": "Elavi",
          "category": "Eengondi"
        },
        {
          "id": 4357,
          "name": "Mange",
          "category": "Mpungu"
        },
        {
          "id": 377,
          "name": "Kwaki",
          "category": "Eengondi"
        },
        {
          "id": 4476,
          "name": "Zigizi",
          "category": "Mpungu"
        },
        {
          "id": 4449,
          "name": "Kakuwa",
          "category": "Mpungu"
        },
        {
          "id": 4177,
          "name": "Nduno",
          "category": "Ncuncuni"
        },
        {
          "id": 4161,
          "name": "Ou-cordon",
          "category": "Rundu rural"
        },
        {
          "id": 4160,
          "name": "Mururani",
          "category": ""
        },
        {
          "id": 4373,
          "name": "Nkutu",
          "category": "Kapako"
        },
        {
          "id": 4580,
          "name": "Mausivi",
          "category": "Kapako"
        },
        {
          "id": 4421,
          "name": "Mavanze",
          "category": "Ncuncuni"
        },
        {
          "id": 4430,
          "name": "Ncamangoro",
          "category": "Ncamagoro"
        },
        {
          "id": 4279,
          "name": "Kaguni (Rundu district)",
          "category": "Ncuncuni"
        },
        {
          "id": 4280,
          "name": "Mile 20",
          "category": "Ncuncuni"
        },
        {
          "id": 4422,
          "name": "Sharukwe",
          "category": "Ncuncuni"
        },
        {
          "id": 4423,
          "name": "Sikali",
          "category": "Ncuncuni"
        },
        {
          "id": 4425,
          "name": "kahuti/bamubamu",
          "category": "Ncuncuni"
        },
        {
          "id": 4413,
          "name": "Madudu",
          "category": "Ncuncuni"
        },
        {
          "id": 4429,
          "name": "Gcundu",
          "category": "Ncuncuni"
        },
        {
          "id": 4427,
          "name": "Hamweyi",
          "category": "Ncuncuni"
        },
        {
          "id": 4404,
          "name": "Ncaute",
          "category": "Ncuncuni"
        },
        {
          "id": 4181,
          "name": "Mburundu",
          "category": "Ncamagoro"
        },
        {
          "id": 4403,
          "name": "Gcigco",
          "category": "Ncuncuni"
        },
        {
          "id": 4277,
          "name": "Masivi",
          "category": "Ncamagoro"
        },
        {
          "id": 4417,
          "name": "Tjivitjivi",
          "category": "Ncamagoro"
        },
        {
          "id": 4415,
          "name": "Ncushe",
          "category": "Ncamagoro"
        },
        {
          "id": 4358,
          "name": "Siya",
          "category": "Kapako"
        },
        {
          "id": 4360,
          "name": "Sinzogoro",
          "category": "Kapako"
        },
        {
          "id": 4359,
          "name": "Ngcamade",
          "category": "Kapako"
        },
        {
          "id": 4361,
          "name": "Ruuga",
          "category": "Kapako"
        },
        {
          "id": 4365,
          "name": "Mupini",
          "category": "Kapako"
        },
        {
          "id": 4366,
          "name": "Sikondo",
          "category": "Kapako"
        },
        {
          "id": 4362,
          "name": "Sigone",
          "category": "Kapako"
        },
        {
          "id": 4363,
          "name": "Kapako",
          "category": "Kapako"
        },
        {
          "id": 4364,
          "name": "Matende",
          "category": "Kapako"
        },
        {
          "id": 4374,
          "name": "Mukundu",
          "category": "Kapako"
        },
        {
          "id": 4369,
          "name": "Nakazaza",
          "category": "Kapako"
        },
        {
          "id": 4371,
          "name": "Siyandeya",
          "category": "Kapako"
        },
        {
          "id": 4370,
          "name": "Kayirayira",
          "category": "Kapako"
        },
        {
          "id": 4283,
          "name": "Mile 30",
          "category": "Ncamagoro"
        },
        {
          "id": 4278,
          "name": "Mile 10",
          "category": "Ncuncuni"
        },
        {
          "id": 4426,
          "name": "Ncuncuni",
          "category": "Ncuncuni"
        },
        {
          "id": 4096,
          "name": "Ntaranga",
          "category": "Ncuncuni"
        },
        {
          "id": 4281,
          "name": "Sitenda",
          "category": "Ncuncuni"
        },
        {
          "id": 4368,
          "name": "Mafungu",
          "category": "Ncuncuni"
        },
        {
          "id": 4367,
          "name": "Ruhurumwe",
          "category": "Ncuncuni"
        },
        {
          "id": 4534,
          "name": "Ngwa-ngwa",
          "category": "Rundu Urban"
        },
        {
          "id": 4407,
          "name": "Nayingopo",
          "category": "Mashare"
        },
        {
          "id": 4408,
          "name": "Gcwatjinga",
          "category": ""
        },
        {
          "id": 4420,
          "name": "Sampate",
          "category": ""
        },
        {
          "id": 4416,
          "name": "Gcaru",
          "category": "Mashare"
        },
        {
          "id": 4428,
          "name": "Gwasha",
          "category": "Ncuncuni"
        },
        {
          "id": 4405,
          "name": "Mutwegongombahe",
          "category": ""
        },
        {
          "id": 4396,
          "name": "Sapirama",
          "category": "Mashare"
        },
        {
          "id": 4564,
          "name": "Kambowo",
          "category": "Rundu Rural"
        },
        {
          "id": 4579,
          "name": "Ngcangcana",
          "category": "Rundu Rural"
        },
        {
          "id": 4203,
          "name": "Tjeye",
          "category": "Mashare"
        },
        {
          "id": 4217,
          "name": "Rudjadja",
          "category": "Mashare"
        },
        {
          "id": 4208,
          "name": "Mangundu",
          "category": "Mashare"
        },
        {
          "id": 4583,
          "name": "Sikanduko",
          "category": "Rundu Urban"
        },
        {
          "id": 4584,
          "name": "Tuhingireni",
          "category": "Rundu Urban"
        },
        {
          "id": 4578,
          "name": "Shamambungu (Rundu)",
          "category": "Rundu Rural"
        },
        {
          "id": 4191,
          "name": "Shandagho",
          "category": "Mashare"
        },
        {
          "id": 4437,
          "name": "Shankara",
          "category": "Ndonga Linena"
        },
        {
          "id": 4582,
          "name": "Ndcandcana",
          "category": "Rundu Rural"
        },
        {
          "id": 4568,
          "name": "Shimpanda",
          "category": "Rundu Rural"
        },
        {
          "id": 4211,
          "name": "Magcuva",
          "category": "Mashare"
        },
        {
          "id": 4210,
          "name": "Dove",
          "category": "Mashare"
        },
        {
          "id": 4565,
          "name": "Likwaterera",
          "category": "Rundu Rural"
        },
        {
          "id": 4566,
          "name": "Mbambi (Rundu district)",
          "category": "Rundu Rural"
        },
        {
          "id": 4400,
          "name": "Ncumushi",
          "category": "Mashare"
        },
        {
          "id": 4399,
          "name": "Shakambu",
          "category": "Mashare"
        },
        {
          "id": 4212,
          "name": "Gonwa",
          "category": "Rundu Rural"
        },
        {
          "id": 4522,
          "name": "Mazwa",
          "category": "Rundu Rural"
        },
        {
          "id": 4194,
          "name": "Koro",
          "category": "Mashare"
        },
        {
          "id": 4192,
          "name": "Lilira",
          "category": "Mashare"
        },
        {
          "id": 4197,
          "name": "Shinunga",
          "category": "Mashare"
        },
        {
          "id": 4193,
          "name": "Ngcogco",
          "category": "Mashare"
        },
        {
          "id": 4398,
          "name": "Baramasoni",
          "category": "Mashare"
        },
        {
          "id": 4196,
          "name": "Vikota",
          "category": "Mashare"
        },
        {
          "id": 4195,
          "name": "Tara-Tara",
          "category": "Mashare"
        },
        {
          "id": 4397,
          "name": "Makandina",
          "category": "Rundu Rural"
        },
        {
          "id": 4401,
          "name": "Kawe",
          "category": "Rundu Rural"
        },
        {
          "id": 4163,
          "name": "Mpezo",
          "category": "Mashare"
        },
        {
          "id": 4409,
          "name": "Zadang",
          "category": "Mashare"
        },
        {
          "id": 4137,
          "name": "Culi",
          "category": "Ndonga Linena"
        },
        {
          "id": 4146,
          "name": "Ncame",
          "category": "Ndonga Linena"
        },
        {
          "id": 4145,
          "name": "Cumagcashi",
          "category": "Ndiyona"
        },
        {
          "id": 4130,
          "name": "Shamayembe",
          "category": "Ndiyona"
        },
        {
          "id": 4140,
          "name": "Shambahe",
          "category": "Ndiyona"
        },
        {
          "id": 4139,
          "name": "Dosa",
          "category": "Ndiyona"
        },
        {
          "id": 4141,
          "name": "Dumushi",
          "category": "Ndiyona"
        },
        {
          "id": 4132,
          "name": "Cocoma",
          "category": "Ndiyona"
        },
        {
          "id": 4136,
          "name": "Kakekete",
          "category": "Ndiyona"
        },
        {
          "id": 4131,
          "name": "Ncorosha",
          "category": "Ndiyona"
        },
        {
          "id": 4563,
          "name": "Mutwarantja",
          "category": ""
        },
        {
          "id": 4570,
          "name": "Mazana",
          "category": "Rundu Rural"
        },
        {
          "id": 4572,
          "name": "Vhungu-Vhungu",
          "category": "Rundu Rural"
        },
        {
          "id": 4574,
          "name": "Samahiho",
          "category": "Mashare"
        },
        {
          "id": 4571,
          "name": "Kayengona",
          "category": "Rundu Rural"
        },
        {
          "id": 4562,
          "name": "Muhopi",
          "category": "Rundu Rural"
        },
        {
          "id": 4575,
          "name": "Manwangombe",
          "category": "Rundu Rural"
        },
        {
          "id": 4576,
          "name": "Ngone (Rundu district)",
          "category": "Rundu Rural"
        },
        {
          "id": 4581,
          "name": "Ngaramambora",
          "category": "Rundu Rural"
        },
        {
          "id": 4561,
          "name": "Katimba",
          "category": "Mashare"
        },
        {
          "id": 4560,
          "name": "Utokota",
          "category": "Mashare"
        },
        {
          "id": 4558,
          "name": "Gove",
          "category": "Mashare"
        },
        {
          "id": 4559,
          "name": "Mantjenya",
          "category": "Mashare"
        },
        {
          "id": 4209,
          "name": "Mungunda",
          "category": "Mashare"
        },
        {
          "id": 4202,
          "name": "Mashare",
          "category": "Mashare"
        },
        {
          "id": 4201,
          "name": "Muroro",
          "category": "Mashare"
        },
        {
          "id": 4204,
          "name": "Katondo",
          "category": "Mashare"
        },
        {
          "id": 4207,
          "name": "Fumbe",
          "category": "Mashare"
        },
        {
          "id": 4199,
          "name": "Mupapama (Rundu district)",
          "category": "Mashare"
        },
        {
          "id": 4188,
          "name": "Mabushe",
          "category": "Mashare"
        },
        {
          "id": 4189,
          "name": "Rundjarara",
          "category": "Mashare"
        },
        {
          "id": 4187,
          "name": "Kehemu",
          "category": "Rundu Urban"
        },
        {
          "id": 4124,
          "name": "Kaisosi",
          "category": "Rundu Urban"
        },
        {
          "id": 4215,
          "name": "Mauvara",
          "category": "Mashare"
        },
        {
          "id": 4432,
          "name": "Ndama",
          "category": "Rundu Urban"
        },
        {
          "id": 4441,
          "name": "Neyuva",
          "category": "Mashare"
        },
        {
          "id": 4535,
          "name": "Sauyemwa",
          "category": "Rundu Urban"
        },
        {
          "id": 4444,
          "name": "Shighuru",
          "category": "Ndonga Linena"
        },
        {
          "id": 4205,
          "name": "Namuwawa",
          "category": "Mashare"
        },
        {
          "id": 4198,
          "name": "Shavivare",
          "category": "Mashare"
        },
        {
          "id": 4438,
          "name": "Ndonga Linena",
          "category": "Ndonga Linena"
        },
        {
          "id": 4443,
          "name": "Shitemo",
          "category": "Ndonga Linena"
        },
        {
          "id": 4433,
          "name": "Karukuta&Mayowe",
          "category": "Ndonga Linena"
        },
        {
          "id": 4434,
          "name": "Nyondo (Nyangana district)",
          "category": "Ndonga Linena"
        },
        {
          "id": 4503,
          "name": "Karutci",
          "category": "Ndonga Linena"
        },
        {
          "id": 4491,
          "name": "Gumma&Kadedere",
          "category": "Ndonga Linena"
        },
        {
          "id": 4499,
          "name": "Kangweru & Mamono",
          "category": "Ndonga Linena"
        },
        {
          "id": 4240,
          "name": "Mashivi",
          "category": "Ndiyona"
        },
        {
          "id": 4245,
          "name": "Shinyungwe",
          "category": "Ndiyona"
        },
        {
          "id": 4244,
          "name": "Livuyu",
          "category": "Ndiyona"
        },
        {
          "id": 4247,
          "name": "Korokoko",
          "category": "Ndiyona"
        },
        {
          "id": 4402,
          "name": "Cuma (Ncaute cluster)",
          "category": "Rundu Rural"
        },
        {
          "id": 4500,
          "name": "Ndiyona",
          "category": "Ndiyona"
        },
        {
          "id": 4138,
          "name": "Djara-djara",
          "category": "Ndiyona"
        },
        {
          "id": 4135,
          "name": "Shalitata",
          "category": "Ndonga Linena"
        },
        {
          "id": 4496,
          "name": "Rucara",
          "category": "Ndiyona"
        },
        {
          "id": 4493,
          "name": "Tushepenu&Shipando",
          "category": "Ndiyona"
        },
        {
          "id": 4492,
          "name": "Katere",
          "category": "Ndiyona"
        },
        {
          "id": 4249,
          "name": "Sharuwanda",
          "category": "Ndiyona"
        },
        {
          "id": 4248,
          "name": "Kashira",
          "category": "Ndiyona"
        },
        {
          "id": 4171,
          "name": "Makena",
          "category": "Ndiyona"
        },
        {
          "id": 4127,
          "name": "Cakuma",
          "category": "Ndiyona"
        },
        {
          "id": 4125,
          "name": "Cwa",
          "category": "Ndiyona"
        },
        {
          "id": 4144,
          "name": "Kandjara",
          "category": "Ndiyona"
        },
        {
          "id": 4142,
          "name": "Livayi",
          "category": "Ndiyona"
        },
        {
          "id": 4129,
          "name": "Shamburu",
          "category": "Ndiyona"
        },
        {
          "id": 4128,
          "name": "Caudom",
          "category": "Ndiyona"
        },
        {
          "id": 4440,
          "name": "Shikenge",
          "category": ""
        },
        {
          "id": 4573,
          "name": "Ngaramateya",
          "category": "Rundu Rural"
        },
        {
          "id": 4200,
          "name": "Mahahe (Mashare cluster)",
          "category": "Mashare"
        },
        {
          "id": 4216,
          "name": "Kakuru",
          "category": "Mashare"
        },
        {
          "id": 4190,
          "name": "Karanawa",
          "category": "Mashare"
        },
        {
          "id": 4439,
          "name": "Makandu",
          "category": "Ndonga Linena"
        },
        {
          "id": 4442,
          "name": "Kamundema",
          "category": "Ndonga Linena"
        },
        {
          "id": 4435,
          "name": "Rumwemwe&Mutjimaumwe",
          "category": "Ndonga Linena"
        },
        {
          "id": 4502,
          "name": "Kanyumara",
          "category": "Ndonga Linena"
        },
        {
          "id": 4504,
          "name": "Shaghaya",
          "category": "Ndonga Linena"
        },
        {
          "id": 4501,
          "name": "Arevashweneka",
          "category": "Ndonga Linena"
        },
        {
          "id": 4498,
          "name": "Mukekete (Nyangana district)",
          "category": "Ndonga Linena"
        },
        {
          "id": 4497,
          "name": "Shikoro",
          "category": "Ndiyona"
        },
        {
          "id": 4495,
          "name": "Hoha",
          "category": "Ndiyona"
        },
        {
          "id": 4494,
          "name": "Kayova",
          "category": "Ndiyona"
        },
        {
          "id": 4134,
          "name": "Shambare",
          "category": "Ndiyona"
        },
        {
          "id": 4246,
          "name": "Shamvhura",
          "category": "Ndiyona"
        },
        {
          "id": 4133,
          "name": "Likurukadi",
          "category": "Ndiyona"
        },
        {
          "id": 4243,
          "name": "Mbwata",
          "category": "Ndiyona"
        },
        {
          "id": 4241,
          "name": "Pikinini",
          "category": "Ndiyona"
        },
        {
          "id": 4343,
          "name": "Musitu",
          "category": "Ncuncuni"
        },
        {
          "id": 4419,
          "name": "Uradi Farm",
          "category": "Rundu rural"
        },
        {
          "id": 4418,
          "name": "Frans Farm",
          "category": "Rundu rural"
        },
        {
          "id": 4214,
          "name": "Yuru",
          "category": "Ndiyona"
        },
        {
          "id": 4436,
          "name": "Kagcuva",
          "category": "Ndonga Linena"
        },
        {
          "id": 198,
          "name": "Greenwell Matongo",
          "category": "Katima Mulilo Urban"
        },
        {
          "id": 199,
          "name": "Mavuluma .Ext No.2",
          "category": "Katima Mulilo Urban"
        },
        {
          "id": 197,
          "name": "Cowboy",
          "category": "Katima Mulilo Urban"
        },
        {
          "id": 47,
          "name": "Kabuku Village",
          "category": "Katima Mulilo Urban"
        },
        {
          "id": 196,
          "name": "Choto",
          "category": "Katima Mulilo Urban"
        },
        {
          "id": 81,
          "name": "Mpola 2",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 53,
          "name": "Ngoma",
          "category": "Kabbe South"
        },
        {
          "id": 33,
          "name": "26 Miles",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 54,
          "name": "Salambala Camp Site",
          "category": "Katima Mulilo Rural"
        },
        {
          "id": 134,
          "name": "Libula A",
          "category": "Kabbe North"
        },
        {
          "id": 58,
          "name": "Cheto",
          "category": "Kongola"
        },
        {
          "id": 141,
          "name": "Namyundu",
          "category": "Kabbe North"
        },
        {
          "id": 137,
          "name": "Mbalisinte",
          "category": "Kabbe South"
        },
        {
          "id": 3744,
          "name": "otjindakwi",
          "category": "Sesfontein"
        },
        {
          "id": 3729,
          "name": "Okovasiona",
          "category": "Sesfontein"
        },
        {
          "id": 3742,
          "name": "ongongo",
          "category": "Sesfontein"
        },
        {
          "id": 3479,
          "name": "Etosha mountain heights",
          "category": "Kamanjab"
        },
        {
          "id": 3743,
          "name": "khowareb",
          "category": "Sesfontein"
        },
        {
          "id": 3437,
          "name": "Hoabatere lodge",
          "category": "Sesfontein"
        },
        {
          "id": 3436,
          "name": "Dorsland",
          "category": "Sesfontein"
        },
        {
          "id": 3500,
          "name": "Humor",
          "category": "Sesfontein"
        },
        {
          "id": 3512,
          "name": "Neuland",
          "category": "Sesfontein"
        },
        {
          "id": 3502,
          "name": "Makalani",
          "category": "Sesfontein"
        },
        {
          "id": 3454,
          "name": "Roden Pos",
          "category": "Sesfontein"
        },
        {
          "id": 3452,
          "name": "Rodeon Opstal",
          "category": "Sesfontein"
        },
        {
          "id": 3458,
          "name": "Grootberg",
          "category": "Sesfontein"
        },
        {
          "id": 3510,
          "name": "Otjihavara",
          "category": "Sesfontein"
        },
        {
          "id": 3527,
          "name": "Jakkals Vlei",
          "category": "Khorixas"
        },
        {
          "id": 3529,
          "name": "Spaarwater",
          "category": "Khorixas"
        },
        {
          "id": 3531,
          "name": "Palmwag",
          "category": "Sesfontein"
        },
        {
          "id": 3504,
          "name": "Nugas Pos No2",
          "category": "Khorixas"
        },
        {
          "id": 3460,
          "name": "Tweespruit",
          "category": "Khorixas"
        },
        {
          "id": 3519,
          "name": "Werelsend",
          "category": "Khorixas"
        },
        {
          "id": 3539,
          "name": "Spaarwater Pos",
          "category": "Khorixas"
        },
        {
          "id": 3517,
          "name": "Bergsig",
          "category": "Khorixas"
        },
        {
          "id": 3535,
          "name": "Driefontein",
          "category": "Khorixas"
        },
        {
          "id": 3521,
          "name": "Damaraland",
          "category": "Khorixas"
        },
        {
          "id": 3533,
          "name": "Palmwag Cross",
          "category": "Sesfontein"
        },
        {
          "id": 3548,
          "name": "Bethants",
          "category": "Khorixas"
        },
        {
          "id": 3523,
          "name": "De riet",
          "category": "Khorixas"
        },
        {
          "id": 3554,
          "name": "Doro Nawas",
          "category": "Khorixas"
        },
        {
          "id": 3440,
          "name": "Robyn",
          "category": "Kamanjab"
        },
        {
          "id": 3441,
          "name": "Pioner",
          "category": "Kamanjab"
        },
        {
          "id": 3444,
          "name": "Ermo",
          "category": "Kamanjab"
        },
        {
          "id": 3418,
          "name": "Arendshes",
          "category": "Kamanjab"
        },
        {
          "id": 3414,
          "name": "Blyerus",
          "category": "Kamanjab"
        },
        {
          "id": 3416,
          "name": "Voorspoed",
          "category": "Kamanjab"
        },
        {
          "id": 3420,
          "name": "Wildeck",
          "category": "Kamanjab"
        },
        {
          "id": 3442,
          "name": "Rasthof",
          "category": "Kamanjab"
        },
        {
          "id": 3438,
          "name": "Gelbingen",
          "category": "Kamanjab"
        },
        {
          "id": 3439,
          "name": "Lowsvilleie",
          "category": "Kamanjab"
        },
        {
          "id": 3422,
          "name": "Ombonde (Outjo)",
          "category": "Kamanjab"
        },
        {
          "id": 3506,
          "name": "Condor Opstal",
          "category": "Sesfontein"
        },
        {
          "id": 3509,
          "name": "Condor Pos",
          "category": "Sesfontein"
        },
        {
          "id": 3426,
          "name": "Bruno",
          "category": "Kamanjab"
        },
        {
          "id": 3428,
          "name": "Bergvallei",
          "category": "Kamanjab"
        },
        {
          "id": 3433,
          "name": "Vergelee",
          "category": "Kamanjab"
        },
        {
          "id": 3427,
          "name": "Katemba",
          "category": "Kamanjab"
        },
        {
          "id": 3425,
          "name": "Ondaura",
          "category": "Kamanjab"
        },
        {
          "id": 3431,
          "name": "Fraken",
          "category": "Kamanjab"
        },
        {
          "id": 3429,
          "name": "Grasheuwels",
          "category": "Kamanjab"
        },
        {
          "id": 3507,
          "name": "Moria",
          "category": "Sesfontein"
        },
        {
          "id": 3456,
          "name": "Driehoek",
          "category": "Khorixas"
        },
        {
          "id": 3570,
          "name": "Monte Carlo",
          "category": "Kamanjab"
        },
        {
          "id": 3558,
          "name": "Eerstbegin",
          "category": "Khorixas"
        },
        {
          "id": 3462,
          "name": "Nareghaam",
          "category": "Khorixas"
        },
        {
          "id": 3492,
          "name": "Petrus Fontein- Se Pos",
          "category": "Khorixas"
        },
        {
          "id": 3567,
          "name": "Fransfontein",
          "category": "Khorixas"
        },
        {
          "id": 3446,
          "name": "Gaulton gate",
          "category": "Kamanjab"
        },
        {
          "id": 3480,
          "name": "Khorixas",
          "category": "Khorixas"
        },
        {
          "id": 3560,
          "name": "Ohorongo",
          "category": "Kamanjab"
        },
        {
          "id": 3411,
          "name": "Braunfels Wate Affairs",
          "category": "Khorixas"
        },
        {
          "id": 3575,
          "name": "Oorfees",
          "category": "Kamanjab"
        },
        {
          "id": 3572,
          "name": "Okatare",
          "category": "Kamanjab"
        },
        {
          "id": 3568,
          "name": "Damaron",
          "category": "Kamanjab"
        },
        {
          "id": 3478,
          "name": "Sonderwater",
          "category": "Kamanjab"
        },
        {
          "id": 3490,
          "name": "Verlos",
          "category": "Kamanjab"
        },
        {
          "id": 3557,
          "name": "hohenfeld",
          "category": "Kamanjab"
        },
        {
          "id": 3559,
          "name": "Saratoga",
          "category": "Kamanjab"
        },
        {
          "id": 3483,
          "name": "Tradia",
          "category": "Kamanjab"
        },
        {
          "id": 3547,
          "name": "Amolinda",
          "category": "Kamanjab"
        },
        {
          "id": 3552,
          "name": "Bankfontein",
          "category": "Khorixas"
        },
        {
          "id": 3484,
          "name": "//Gurus",
          "category": "Khorixas"
        },
        {
          "id": 3550,
          "name": "Onverwag",
          "category": "Khorixas"
        },
        {
          "id": 3571,
          "name": "Pos Ses-En-Sesting",
          "category": "Khorixas"
        },
        {
          "id": 3489,
          "name": "Mopane",
          "category": "Khorixas"
        },
        {
          "id": 3569,
          "name": "Bam Pos",
          "category": "Khorixas"
        },
        {
          "id": 3419,
          "name": "Gainatseb",
          "category": "Kamanjab"
        },
        {
          "id": 3739,
          "name": "sesfontein",
          "category": "Sesfontein"
        },
        {
          "id": 3741,
          "name": "Warmquelle",
          "category": "Sesfontein"
        },
        {
          "id": 3731,
          "name": "Onguta",
          "category": "Sesfontein"
        },
        {
          "id": 3498,
          "name": "Erwee",
          "category": "Sesfontein"
        },
        {
          "id": 3545,
          "name": "Twyfelfontein",
          "category": "Khorixas"
        },
        {
          "id": 3434,
          "name": "Marinhohe",
          "category": "Sesfontein"
        },
        {
          "id": 3449,
          "name": "Anker",
          "category": "Sesfontein"
        },
        {
          "id": 3491,
          "name": "Petrusfontein-Se Pos",
          "category": "Khorixas"
        },
        {
          "id": 3486,
          "name": "Garettes",
          "category": "Khorixas"
        },
        {
          "id": 3525,
          "name": "Springbok Vassel",
          "category": "Khorixas"
        },
        {
          "id": 3482,
          "name": "Olifantspieteer",
          "category": "Khorixas"
        },
        {
          "id": 3543,
          "name": "Anichab",
          "category": "Khorixas"
        },
        {
          "id": 3421,
          "name": "Kaceb Pos",
          "category": "Khorixas"
        },
        {
          "id": 3415,
          "name": "Tsumamas",
          "category": "Kamanjab"
        },
        {
          "id": 3561,
          "name": "Leicester",
          "category": "Kamanjab"
        },
        {
          "id": 3546,
          "name": "Aurib",
          "category": "Kamanjab"
        },
        {
          "id": 3487,
          "name": "Morester",
          "category": "Kamanjab"
        },
        {
          "id": 3745,
          "name": "okanamuva",
          "category": "Sesfontein"
        },
        {
          "id": 3537,
          "name": "Tsarob",
          "category": "Khorixas"
        },
        {
          "id": 3505,
          "name": "Ochimuchila",
          "category": "Khorixas"
        },
        {
          "id": 3435,
          "name": "Okamudhesha",
          "category": "Kamanjab"
        },
        {
          "id": 3556,
          "name": "Muwanie",
          "category": "Khorixas"
        },
        {
          "id": 3494,
          "name": "Lekker water",
          "category": "Kamanjab"
        },
        {
          "id": 3574,
          "name": "Guid Pos",
          "category": "Khorixas"
        },
        {
          "id": 3423,
          "name": "Sonnegroet",
          "category": "Kamanjab"
        },
        {
          "id": 3424,
          "name": "Merrenu",
          "category": "Kamanjab"
        },
        {
          "id": 3430,
          "name": "Gaus",
          "category": "Kamanjab"
        },
        {
          "id": 3412,
          "name": "Kamanjab",
          "category": "Kamanjab"
        },
        {
          "id": 3413,
          "name": "SwartDam",
          "category": "Khorixas"
        },
        {
          "id": 3481,
          "name": "Sand river",
          "category": "Kamanjab"
        },
        {
          "id": 3417,
          "name": "Leeufontein",
          "category": "Khorixas"
        },
        {
          "id": 3445,
          "name": "Uistig",
          "category": "Kamanjab"
        },
        {
          "id": 3566,
          "name": "Outjo Town",
          "category": "Outjo"
        },
        {
          "id": 3526,
          "name": "Palafontein",
          "category": "Outjo"
        },
        {
          "id": 3516,
          "name": "Saalburg",
          "category": "Outjo"
        },
        {
          "id": 3522,
          "name": "Ombinda Karambi",
          "category": "Outjo"
        },
        {
          "id": 3518,
          "name": "Jutland",
          "category": "Outjo"
        },
        {
          "id": 3520,
          "name": "Bergplass",
          "category": "Outjo"
        },
        {
          "id": 3573,
          "name": "Sestag",
          "category": "Outjo"
        },
        {
          "id": 280,
          "name": "Ombujomumbonde",
          "category": "Okakarara"
        },
        {
          "id": 278,
          "name": "Otjatjingenge",
          "category": "Okakarara"
        },
        {
          "id": 284,
          "name": "Omatanga",
          "category": "Okakarara"
        },
        {
          "id": 279,
          "name": "Ombinda",
          "category": "Okakarara"
        },
        {
          "id": 281,
          "name": "Ombujovakuru",
          "category": "Okakarara"
        },
        {
          "id": 283,
          "name": "Ovitatu",
          "category": "Okakarara"
        },
        {
          "id": 1708,
          "name": "Ontanda",
          "category": "Tsandi"
        },
        {
          "id": 1760,
          "name": "Oshilemba - Otamanzi",
          "category": "Otamanzi"
        },
        {
          "id": 519,
          "name": "Otjiguinas",
          "category": "Tsumeb"
        },
        {
          "id": 3392,
          "name": "Rhodia-Okakumbu",
          "category": "Outjo"
        },
        {
          "id": 2217,
          "name": "Omukukutu",
          "category": "Oshikunde"
        },
        {
          "id": 2475,
          "name": "Ontuli (Onhuli)",
          "category": "Okongo"
        },
        {
          "id": 2364,
          "name": "Elunda Londjamba",
          "category": "Oshikunde"
        },
        {
          "id": 2283,
          "name": "Omboloka -Okongo",
          "category": "Okongo"
        },
        {
          "id": 2447,
          "name": "Ompini (Omupini)",
          "category": "Okongo"
        },
        {
          "id": 2244,
          "name": "Okalukulwena",
          "category": "Okongo"
        },
        {
          "id": 2197,
          "name": "Onghai(omuhai)",
          "category": "Okongo"
        },
        {
          "id": 2213,
          "name": "Okongo B",
          "category": "Okongo"
        },
        {
          "id": 2204,
          "name": "Oshaatotwa(Oshatotwa)",
          "category": "Okongo"
        },
        {
          "id": 2218,
          "name": "Omulamba",
          "category": "Okongo"
        },
        {
          "id": 2471,
          "name": "Eenghombo(Ohenghombo)",
          "category": "Okongo"
        },
        {
          "id": 2478,
          "name": "Ombowa",
          "category": "Okongo"
        },
        {
          "id": 2210,
          "name": "Oludila",
          "category": "Okongo"
        },
        {
          "id": 2226,
          "name": "Okamanyana(Okamanyona)",
          "category": "Okongo"
        },
        {
          "id": 2281,
          "name": "Okashushwena",
          "category": "Okongo"
        },
        {
          "id": 3538,
          "name": "Okonguarri",
          "category": "Kamanjab"
        },
        {
          "id": 3378,
          "name": "Seringkop",
          "category": "Outjo"
        },
        {
          "id": 3384,
          "name": "Mooiplaas",
          "category": "Outjo"
        },
        {
          "id": 3380,
          "name": "Toevlug",
          "category": "Outjo"
        },
        {
          "id": 3381,
          "name": "Elandsfontein",
          "category": "Outjo"
        },
        {
          "id": 3386,
          "name": "Tsabis",
          "category": "Outjo"
        },
        {
          "id": 3382,
          "name": "Nuchas",
          "category": "Outjo"
        },
        {
          "id": 3385,
          "name": "Greensplaas",
          "category": "Outjo"
        },
        {
          "id": 3408,
          "name": "Taleni",
          "category": "Kamanjab"
        },
        {
          "id": 921,
          "name": "Oshaga",
          "category": "Ondangwa Rural"
        },
        {
          "id": 458,
          "name": "Onethindi",
          "category": "Olukonda"
        },
        {
          "id": 524,
          "name": "casablanca",
          "category": "Nehale LyaMpingana"
        },
        {
          "id": 395,
          "name": "Okoloti",
          "category": "Eengondi"
        },
        {
          "id": 409,
          "name": "Oshaataha",
          "category": "Eengondi"
        },
        {
          "id": 412,
          "name": "Ohambala",
          "category": "Eengondi"
        },
        {
          "id": 478,
          "name": "Evale",
          "category": "Eengondi"
        },
        {
          "id": 408,
          "name": "Otula",
          "category": "Eengondi"
        },
        {
          "id": 477,
          "name": "Elambo",
          "category": "Eengondi"
        },
        {
          "id": 480,
          "name": "Omalondo",
          "category": "Eengondi"
        },
        {
          "id": 493,
          "name": "Oshiya Shomatope",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 459,
          "name": "Oniithima",
          "category": "Olukonda"
        },
        {
          "id": 476,
          "name": "Okanamishu",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 485,
          "name": "Oshikulu",
          "category": "Onyaanya"
        },
        {
          "id": 504,
          "name": "Ipanda",
          "category": "Eengondi"
        },
        {
          "id": 364,
          "name": "Antoni",
          "category": "Eengondi"
        },
        {
          "id": 422,
          "name": "Ongaka",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 511,
          "name": "Okakoko",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 503,
          "name": "Onyuulaye",
          "category": "Okankolo"
        },
        {
          "id": 440,
          "name": "Etunda No 1",
          "category": "Onyaanya"
        },
        {
          "id": 508,
          "name": "Oshifukwa A",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 426,
          "name": "Omutsegwondjamba",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 403,
          "name": "Onanime",
          "category": "Eengondi"
        },
        {
          "id": 424,
          "name": "Ohaiyanda",
          "category": "Eengondi"
        },
        {
          "id": 505,
          "name": "Ontana",
          "category": "Eengondi"
        },
        {
          "id": 425,
          "name": "Omutsegwombahe",
          "category": "Eengondi"
        },
        {
          "id": 506,
          "name": "Ohaifundju",
          "category": "Eengondi"
        },
        {
          "id": 411,
          "name": "Epama",
          "category": "Eengondi"
        },
        {
          "id": 410,
          "name": "Oshikondeilwa",
          "category": "Eengondi"
        },
        {
          "id": 469,
          "name": "Ehangono",
          "category": "Okankolo"
        },
        {
          "id": 413,
          "name": "Ofilu",
          "category": "Eengondi"
        },
        {
          "id": 414,
          "name": "Ondsuiti",
          "category": "Eengondi"
        },
        {
          "id": 417,
          "name": "Okandjeke",
          "category": "Eengondi"
        },
        {
          "id": 479,
          "name": "Eyambeko",
          "category": "Eengondi"
        },
        {
          "id": 399,
          "name": "Ohahati",
          "category": "Okankolo"
        },
        {
          "id": 404,
          "name": "Onanguwo",
          "category": "Okankolo"
        },
        {
          "id": 435,
          "name": "Oluundje",
          "category": "Okankolo"
        },
        {
          "id": 521,
          "name": "Selfhelp",
          "category": "Otavi"
        },
        {
          "id": 516,
          "name": "Ombili",
          "category": "Guinas"
        },
        {
          "id": 513,
          "name": "Sachsenheim",
          "category": "Guinas"
        },
        {
          "id": 518,
          "name": "Namutoni",
          "category": "Guinas"
        },
        {
          "id": 522,
          "name": "Otties Farm",
          "category": "Guinas"
        },
        {
          "id": 517,
          "name": "Mokuti Lodge",
          "category": "Guinas"
        },
        {
          "id": 526,
          "name": "Kwansib",
          "category": "Guinas"
        },
        {
          "id": 527,
          "name": "Louisville",
          "category": "Guinas"
        },
        {
          "id": 528,
          "name": "Hedwiglust",
          "category": "Guinas"
        },
        {
          "id": 372,
          "name": "Omangetti",
          "category": "Eengondi"
        },
        {
          "id": 379,
          "name": "Omatale",
          "category": "Nehale LyaMpingana"
        },
        {
          "id": 533,
          "name": "Farm 6",
          "category": "Nehale LyaMpingana"
        },
        {
          "id": 374,
          "name": "Onkule",
          "category": "Eengondi"
        },
        {
          "id": 368,
          "name": "Omatope",
          "category": "Eengondi"
        },
        {
          "id": 541,
          "name": "Skraper",
          "category": "Tsumeb"
        },
        {
          "id": 545,
          "name": "Welmoed",
          "category": "Tsumeb"
        },
        {
          "id": 546,
          "name": "Dinaib",
          "category": "Tsumeb"
        },
        {
          "id": 543,
          "name": "Meinheim",
          "category": "Tsumeb"
        },
        {
          "id": 3388,
          "name": "Renex",
          "category": "Outjo"
        },
        {
          "id": 540,
          "name": "Bravo",
          "category": "Nehale LyaMpingana"
        },
        {
          "id": 373,
          "name": "Mangetti block",
          "category": "Guinas"
        },
        {
          "id": 534,
          "name": "Khausones",
          "category": "Nehale LyaMpingana"
        },
        {
          "id": 523,
          "name": "Ombakana",
          "category": "Nehale LyaMpingana"
        },
        {
          "id": 371,
          "name": "Onalusheshete",
          "category": "Eengondi"
        },
        {
          "id": 367,
          "name": "Emanya",
          "category": "Eengondi"
        },
        {
          "id": 515,
          "name": "Oshivelo",
          "category": "Guinas"
        },
        {
          "id": 544,
          "name": "Lamoena",
          "category": "Guinas"
        },
        {
          "id": 525,
          "name": "engela",
          "category": "Nehale LyaMpingana"
        },
        {
          "id": 550,
          "name": "Concordia",
          "category": "Guinas"
        },
        {
          "id": 539,
          "name": "KoedesVlei",
          "category": "Guinas"
        },
        {
          "id": 514,
          "name": "Ondera",
          "category": "Guinas"
        },
        {
          "id": 537,
          "name": "Kakuse",
          "category": "Guinas"
        },
        {
          "id": 509,
          "name": "Okapuku A",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 486,
          "name": "Omangundu No. 2",
          "category": "Onyaanya"
        },
        {
          "id": 445,
          "name": "Onakandi",
          "category": "Onayena"
        },
        {
          "id": 488,
          "name": "Olambo",
          "category": "Onyaanya"
        },
        {
          "id": 497,
          "name": "Onyaanya A",
          "category": "Onyaanya"
        },
        {
          "id": 484,
          "name": "Onandjamba",
          "category": "Onyaanya"
        },
        {
          "id": 429,
          "name": "Onandhi (Okankolo cluster)",
          "category": "Onyaanya"
        },
        {
          "id": 483,
          "name": "Onakwathola",
          "category": "Onyaanya"
        },
        {
          "id": 442,
          "name": "Onahenene",
          "category": "Onyaanya"
        },
        {
          "id": 494,
          "name": "Eyamba",
          "category": "Onyaanya"
        },
        {
          "id": 492,
          "name": "Omangundu No. 3",
          "category": "Onyaanya"
        },
        {
          "id": 482,
          "name": "Ompinge",
          "category": "Onyaanya"
        },
        {
          "id": 499,
          "name": "Omangundu No. 1",
          "category": "Onyaanya"
        },
        {
          "id": 491,
          "name": "Onankali",
          "category": "Onyaanya"
        },
        {
          "id": 496,
          "name": "Okatuntu",
          "category": "Onyaanya"
        },
        {
          "id": 481,
          "name": "Onyati No. 2",
          "category": "Onyaanya"
        },
        {
          "id": 502,
          "name": "Omatyatya",
          "category": "Onyaanya"
        },
        {
          "id": 501,
          "name": "Onandhi (Onyaanya cluster)",
          "category": "Onyaanya"
        },
        {
          "id": 510,
          "name": "Okapuku B",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 507,
          "name": "Onalunike A",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 495,
          "name": "Onyati No.1",
          "category": "Onyaanya"
        },
        {
          "id": 419,
          "name": "Omutsegwonime B",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 423,
          "name": "Onyavie",
          "category": "Omuthiyagwiipundi"
        },
        {
          "id": 500,
          "name": "Okatope",
          "category": "Onyaanya"
        },
        {
          "id": 450,
          "name": "Onambeke B & C",
          "category": "Onayena"
        },
        {
          "id": 449,
          "name": "Onathinge - Onayena",
          "category": "Onayena"
        },
        {
          "id": 446,
          "name": "Uushinga",
          "category": "Onayena"
        },
        {
          "id": 498,
          "name": "Onyaanya C",
          "category": "Onyaanya"
        },
        {
          "id": 448,
          "name": "Onayena",
          "category": "Onayena"
        },
        {
          "id": 487,
          "name": "Onambeke A",
          "category": "Onayena"
        },
        {
          "id": 453,
          "name": "Omandongo",
          "category": "Onayena"
        },
        {
          "id": 444,
          "name": "Omulundo A",
          "category": "Onayena"
        },
        {
          "id": 421,
          "name": "Ohailungu",
          "category": "Eengondi"
        },
        {
          "id": 490,
          "name": "Onyati No. 3",
          "category": "Onyaanya"
        },
        {
          "id": 398,
          "name": "Ohamaye",
          "category": "Eengondi"
        },
        {
          "id": 535,
          "name": "Kudu leap agri",
          "category": "Guinas"
        },
        {
          "id": 3394,
          "name": "Draaipomp",
          "category": "Outjo"
        },
        {
          "id": 3407,
          "name": "Etosha Safari",
          "category": "Kamanjab"
        },
        {
          "id": 3379,
          "name": "Bellalaika",
          "category": "Outjo"
        },
        {
          "id": 3593,
          "name": "Odjavaya",
          "category": "Epupa"
        },
        {
          "id": 3577,
          "name": "Ejao",
          "category": "Epupa"
        },
        {
          "id": 3644,
          "name": "Omuhandja",
          "category": "Epupa"
        },
        {
          "id": 3590,
          "name": "Oheuva",
          "category": "Epupa"
        },
        {
          "id": 3583,
          "name": "Omurmbanduezu",
          "category": "Epupa"
        },
        {
          "id": 3586,
          "name": "Ondova",
          "category": "Epupa"
        },
        {
          "id": 3588,
          "name": "Ominyandi",
          "category": "Epupa"
        },
        {
          "id": 3592,
          "name": "Onyuva",
          "category": "Epupa"
        },
        {
          "id": 3633,
          "name": "Omuhonga",
          "category": "Epupa"
        },
        {
          "id": 3645,
          "name": "Otjivava",
          "category": "Epupa"
        },
        {
          "id": 3630,
          "name": "Ovireva Dam",
          "category": "Epupa"
        },
        {
          "id": 3632,
          "name": "Etengua",
          "category": "Epupa"
        },
        {
          "id": 3611,
          "name": "Okakuju",
          "category": "Epupa"
        },
        {
          "id": 3724,
          "name": "Okomihuva",
          "category": "Epupa"
        },
        {
          "id": 3658,
          "name": "Ozohorongo",
          "category": "Epupa"
        },
        {
          "id": 3657,
          "name": "Otjandawe",
          "category": "Epupa"
        },
        {
          "id": 3635,
          "name": "Oruseu",
          "category": "Epupa"
        },
        {
          "id": 3683,
          "name": "Okapare",
          "category": "Epupa"
        },
        {
          "id": 3619,
          "name": "Omirora",
          "category": "Epupa"
        },
        {
          "id": 3733,
          "name": "Okatjange",
          "category": "Opuwo Rural"
        },
        {
          "id": 3608,
          "name": "Okaanga",
          "category": "Epupa"
        },
        {
          "id": 3698,
          "name": "Otjite",
          "category": "Epupa"
        },
        {
          "id": 3618,
          "name": "Okatjimbombo",
          "category": "Epupa"
        },
        {
          "id": 3609,
          "name": "Oromukandi",
          "category": "Epupa"
        },
        {
          "id": 3615,
          "name": "Owakapaue",
          "category": "Epupa"
        },
        {
          "id": 3594,
          "name": "Etanga",
          "category": "Epupa"
        },
        {
          "id": 3602,
          "name": "Otoroha",
          "category": "Epupa"
        },
        {
          "id": 3598,
          "name": "Etara",
          "category": "Epupa"
        },
        {
          "id": 3697,
          "name": "Okombako",
          "category": "Epupa"
        },
        {
          "id": 3643,
          "name": "Omuhoro",
          "category": "Epupa"
        },
        {
          "id": 3617,
          "name": "Okaumbamenje",
          "category": "Epupa"
        },
        {
          "id": 3578,
          "name": "Onungurura (border post)",
          "category": "Epupa"
        },
        {
          "id": 3646,
          "name": "Otjouwa-Outiti",
          "category": "Epupa"
        },
        {
          "id": 3589,
          "name": "Omiomire",
          "category": "Epupa"
        },
        {
          "id": 3584,
          "name": "Eyayona",
          "category": "Epupa"
        },
        {
          "id": 3713,
          "name": "Okovahene",
          "category": "Epupa"
        },
        {
          "id": 3707,
          "name": "Ondozuu",
          "category": "Epupa"
        },
        {
          "id": 3647,
          "name": "Orotjirindi",
          "category": "Epupa"
        },
        {
          "id": 3718,
          "name": "Otjitanga",
          "category": "Epupa"
        },
        {
          "id": 3709,
          "name": "Otjamaungu",
          "category": "Epupa"
        },
        {
          "id": 3581,
          "name": "Enyandi",
          "category": "Epupa"
        },
        {
          "id": 3582,
          "name": "Etemba",
          "category": "Epupa"
        },
        {
          "id": 3587,
          "name": "Omapapurawe",
          "category": "Epupa"
        },
        {
          "id": 3715,
          "name": "Okakumangua",
          "category": "Epupa"
        },
        {
          "id": 3696,
          "name": "Okaoraore",
          "category": "Epupa"
        },
        {
          "id": 3712,
          "name": "Otjimbundu",
          "category": "Epupa"
        },
        {
          "id": 3654,
          "name": "Ohangonga",
          "category": "Epupa"
        },
        {
          "id": 3653,
          "name": "Oriutumba",
          "category": "Epupa"
        },
        {
          "id": 3652,
          "name": "Ozongunde",
          "category": "Epupa"
        },
        {
          "id": 3716,
          "name": "Ondoto",
          "category": "Epupa"
        },
        {
          "id": 3641,
          "name": "Otjiyandjasemo",
          "category": "Epupa"
        },
        {
          "id": 3634,
          "name": "Oomiore",
          "category": "Epupa"
        },
        {
          "id": 3649,
          "name": "Omangareva",
          "category": "Epupa"
        },
        {
          "id": 3625,
          "name": "Okawapehuri",
          "category": "Epupa"
        },
        {
          "id": 3621,
          "name": "Etoto 2",
          "category": "Epupa"
        },
        {
          "id": 3616,
          "name": "Orupembe",
          "category": "Epupa"
        },
        {
          "id": 3640,
          "name": "Otjivize",
          "category": "Epupa"
        },
        {
          "id": 3620,
          "name": "Etoto 1",
          "category": "Epupa"
        },
        {
          "id": 3626,
          "name": "Okozongombe",
          "category": "Epupa"
        },
        {
          "id": 3708,
          "name": "Otjitambi",
          "category": "Epupa"
        },
        {
          "id": 3711,
          "name": "Orue",
          "category": "Epupa"
        },
        {
          "id": 3651,
          "name": "Otjikuturiro",
          "category": "Epupa"
        },
        {
          "id": 3710,
          "name": "Ehomba",
          "category": "Epupa"
        },
        {
          "id": 3631,
          "name": "Ovikange",
          "category": "Epupa"
        },
        {
          "id": 3638,
          "name": "Oruhona",
          "category": "Epupa"
        },
        {
          "id": 3714,
          "name": "Kamwe",
          "category": "Epupa"
        },
        {
          "id": 3622,
          "name": "Okahozu",
          "category": "Epupa"
        },
        {
          "id": 3580,
          "name": "Otuviru",
          "category": "Epupa"
        },
        {
          "id": 3613,
          "name": "Otjirova",
          "category": "Epupa"
        },
        {
          "id": 3603,
          "name": "Okaharanandjara",
          "category": "Epupa"
        },
        {
          "id": 3585,
          "name": "Orotjoto",
          "category": "Epupa"
        },
        {
          "id": 3614,
          "name": "Ekwahero",
          "category": "Epupa"
        },
        {
          "id": 3639,
          "name": "Otjisoko",
          "category": "Epupa"
        },
        {
          "id": 3648,
          "name": "Oruriuo",
          "category": "Epupa"
        },
        {
          "id": 3579,
          "name": "Okoupawe",
          "category": "Epupa"
        },
        {
          "id": 3717,
          "name": "Okozongondjoza",
          "category": "Epupa"
        },
        {
          "id": 3623,
          "name": "Ovinyange/Ovinvange",
          "category": "Epupa"
        },
        {
          "id": 3612,
          "name": "Okaombo",
          "category": "Epupa"
        },
        {
          "id": 3740,
          "name": "ekoto",
          "category": "Epupa"
        },
        {
          "id": 3624,
          "name": "Oukongo",
          "category": "Epupa"
        },
        {
          "id": 3601,
          "name": "Orotjitombo - Urban",
          "category": "Opuwo Urban"
        },
        {
          "id": 3606,
          "name": "Otjivero",
          "category": "Epupa"
        },
        {
          "id": 3730,
          "name": "Otjihungu",
          "category": "Epupa"
        },
        {
          "id": 3595,
          "name": "Otjozongongororo/Otjongorongo",
          "category": "Epupa"
        },
        {
          "id": 3607,
          "name": "Oronganga",
          "category": "Epupa"
        },
        {
          "id": 3605,
          "name": "Otjakati",
          "category": "Epupa"
        },
        {
          "id": 3723,
          "name": "Omukurukaze",
          "category": "Epupa"
        },
        {
          "id": 3637,
          "name": "Ohandungu",
          "category": "Epupa"
        },
        {
          "id": 3665,
          "name": "Otjovihe",
          "category": "Epupa"
        },
        {
          "id": 3656,
          "name": "Omatjandja",
          "category": "Epupa"
        },
        {
          "id": 3650,
          "name": "Omungunda",
          "category": "Epupa"
        },
        {
          "id": 3642,
          "name": "Ombazu",
          "category": "Epupa"
        },
        {
          "id": 3636,
          "name": "Okondaurie",
          "category": "Epupa"
        },
        {
          "id": 3655,
          "name": "Otjongoro",
          "category": "Epupa"
        },
        {
          "id": 3674,
          "name": "Ejara",
          "category": "Opuwo Urban"
        },
        {
          "id": 3600,
          "name": "Orotjitombo(Otutati)",
          "category": "Opuwo Rural"
        },
        {
          "id": 3610,
          "name": "Okarukoro",
          "category": "Epupa"
        },
        {
          "id": 3734,
          "name": "Ekongo",
          "category": "Opuwo Urban"
        },
        {
          "id": 3705,
          "name": "Otjisokotjongava",
          "category": "Opuwo Urban"
        },
        {
          "id": 3704,
          "name": "Otjongava Crasher",
          "category": "Opuwo Urban"
        },
        {
          "id": 3599,
          "name": "Otjiheke",
          "category": "Opuwo Rural"
        },
        {
          "id": 3662,
          "name": "Ouatjana",
          "category": "Opuwo Rural"
        },
        {
          "id": 3699,
          "name": "Opuwo/ location",
          "category": "Opuwo Urban"
        },
        {
          "id": 3701,
          "name": "Okatjetje",
          "category": "Opuwo Urban"
        },
        {
          "id": 3678,
          "name": "Etati",
          "category": "Opuwo Urban"
        },
        {
          "id": 3700,
          "name": "Okondaunue",
          "category": "Opuwo Urban"
        },
        {
          "id": 3677,
          "name": "Okouingava",
          "category": "Opuwo Urban"
        },
        {
          "id": 3702,
          "name": "Otjihama",
          "category": "Opuwo Urban"
        },
        {
          "id": 3687,
          "name": "Orokapare",
          "category": "Opuwo Urban"
        },
        {
          "id": 3679,
          "name": "Orokapare Kokombanda",
          "category": "Opuwo Urban"
        },
        {
          "id": 3682,
          "name": "Okahungu",
          "category": "Opuwo Urban"
        },
        {
          "id": 3685,
          "name": "Ondore",
          "category": "Opuwo Urban"
        },
        {
          "id": 3669,
          "name": "Ondore Yokombanda",
          "category": "Opuwo Urban"
        },
        {
          "id": 3681,
          "name": "Okaapakonyota / Voorwater",
          "category": "Opuwo Urban"
        },
        {
          "id": 3604,
          "name": "ongongo -Rural",
          "category": "Opuwo Rural"
        },
        {
          "id": 3694,
          "name": "Orumana",
          "category": "Opuwo Urban"
        },
        {
          "id": 3719,
          "name": "Onganga",
          "category": "Opuwo Rural"
        },
        {
          "id": 3670,
          "name": "Otjerunda",
          "category": "Opuwo Urban"
        },
        {
          "id": 3680,
          "name": "Orotjiuma",
          "category": "Opuwo Urban"
        },
        {
          "id": 3721,
          "name": "Okatumba koviposa",
          "category": "Opuwo Urban"
        },
        {
          "id": 3722,
          "name": "Omaipanga",
          "category": "Opuwo Urban"
        },
        {
          "id": 3720,
          "name": "Otjiu",
          "category": "Opuwo Rural"
        },
        {
          "id": 3597,
          "name": "Orotjitombo - Rural",
          "category": "Opuwo Rural"
        },
        {
          "id": 3673,
          "name": "Okapundja",
          "category": "Opuwo Urban"
        },
        {
          "id": 3664,
          "name": "Oturindi",
          "category": "Opuwo Rural"
        },
        {
          "id": 3675,
          "name": "Omireko",
          "category": "Opuwo Urban"
        },
        {
          "id": 3688,
          "name": "Omuramba Omutiti",
          "category": "Opuwo Urban"
        },
        {
          "id": 3596,
          "name": "Ohungurume",
          "category": "Opuwo Urban"
        },
        {
          "id": 3591,
          "name": "Okau (Opuwo district)",
          "category": "Opuwo Rural"
        },
        {
          "id": 3666,
          "name": "Omakange",
          "category": "Opuwo Urban"
        },
        {
          "id": 3661,
          "name": "Oruvandjei",
          "category": "Opuwo Rural"
        },
        {
          "id": 3659,
          "name": "Okaoko tavi",
          "category": "Opuwo Rural"
        },
        {
          "id": 3667,
          "name": "Okomakaura",
          "category": "Opuwo Urban"
        },
        {
          "id": 3668,
          "name": "Omatetewe",
          "category": "Opuwo Urban"
        },
        {
          "id": 3660,
          "name": "Okorosave",
          "category": "Opuwo Urban"
        },
        {
          "id": 3728,
          "name": "Otjokavare",
          "category": "Opuwo Rural"
        },
        {
          "id": 3671,
          "name": "Alpha",
          "category": "Opuwo Urban"
        },
        {
          "id": 3676,
          "name": "Okatumba",
          "category": "Opuwo Rural"
        },
        {
          "id": 3737,
          "name": "Epunguwe",
          "category": "Opuwo Rural"
        },
        {
          "id": 3663,
          "name": "Ozombambi",
          "category": "Opuwo Rural"
        },
        {
          "id": 3672,
          "name": "Omanduu",
          "category": "Opuwo Urban"
        },
        {
          "id": 3726,
          "name": "Otjondeka",
          "category": "Opuwo Rural"
        },
        {
          "id": 3735,
          "name": "Otjahorovara",
          "category": "Opuwo Rural"
        },
        {
          "id": 3736,
          "name": "Otuani",
          "category": "Opuwo Rural"
        },
        {
          "id": 3691,
          "name": "Okarivizu/Okauvore",
          "category": "Opuwo Rural"
        },
        {
          "id": 3695,
          "name": "Okakuyu karondanda",
          "category": "Opuwo Rural"
        },
        {
          "id": 3689,
          "name": "Otjozongombe",
          "category": "Opuwo Rural"
        },
        {
          "id": 3684,
          "name": "Ombombo",
          "category": "Opuwo Rural"
        },
        {
          "id": 3690,
          "name": "Okomuhana/Okanandjira",
          "category": "Opuwo Rural"
        },
        {
          "id": 3693,
          "name": "Omatapati",
          "category": "Opuwo Rural"
        },
        {
          "id": 3738,
          "name": "Otjomatemba",
          "category": "Opuwo Rural"
        },
        {
          "id": 3686,
          "name": "Okatapati",
          "category": "Opuwo Rural"
        },
        {
          "id": 3692,
          "name": "Oruvandjai",
          "category": "Opuwo Rural"
        },
        {
          "id": 3576,
          "name": "Epupa",
          "category": "Epupa"
        },
        {
          "id": 3706,
          "name": "Otjimuhaka",
          "category": "Epupa"
        },
        {
          "id": 3629,
          "name": "Okanguati",
          "category": "Epupa"
        },
        {
          "id": 3727,
          "name": "Otjitoko",
          "category": "Opuwo Rural"
        },
        {
          "id": 3703,
          "name": "okatuwo",
          "category": "Sesfontein"
        },
        {
          "id": 3628,
          "name": "okamboora",
          "category": "Sesfontein"
        },
        {
          "id": 3627,
          "name": "Orupaka",
          "category": "Epupa"
        },
        {
          "id": 3725,
          "name": "Orozondendu",
          "category": "Sesfontein"
        },
        {
          "id": 3410,
          "name": "Margo (Ongava)",
          "category": "Kamanjab"
        },
        {
          "id": 2443,
          "name": "Ondiimwenena",
          "category": "Uukwiyu"
        },
        {
          "id": 987,
          "name": "Oshipumbu",
          "category": "Ompundja"
        },
        {
          "id": 988,
          "name": "Oshipumbu No. 2",
          "category": "Ompundja"
        },
        {
          "id": 985,
          "name": "Oshipumbu Makilindidi No.B",
          "category": "Oshakati East"
        },
        {
          "id": 989,
          "name": "Oshipumbu Nuule",
          "category": "Oshakati East"
        },
        {
          "id": 1796,
          "name": "Onashitendo B",
          "category": "Tsandi"
        },
        {
          "id": 1794,
          "name": "Elondo East",
          "category": "Tsandi"
        },
        {
          "id": 1772,
          "name": "Ohandungu",
          "category": "Anamulenge"
        },
        {
          "id": 3383,
          "name": "Wildernis",
          "category": "Outjo"
        },
        {
          "id": 3451,
          "name": "Skuinsbank",
          "category": "Outjo"
        },
        {
          "id": 3461,
          "name": "Tzobaas",
          "category": "Kamanjab"
        },
        {
          "id": 3459,
          "name": "Tzaas",
          "category": "Kamanjab"
        },
        {
          "id": 3453,
          "name": "Soris",
          "category": "Outjo"
        },
        {
          "id": 3455,
          "name": "Stilverwag",
          "category": "Outjo"
        },
        {
          "id": 3457,
          "name": "Tzaris",
          "category": "Outjo"
        },
        {
          "id": 3471,
          "name": "Marmorkopf",
          "category": "Outjo"
        },
        {
          "id": 3466,
          "name": "Gub",
          "category": "Outjo"
        },
        {
          "id": 3467,
          "name": "Urob",
          "category": "Outjo"
        },
        {
          "id": 3511,
          "name": "Goanab",
          "category": "Outjo"
        },
        {
          "id": 3465,
          "name": "Winne",
          "category": "Outjo"
        },
        {
          "id": 3402,
          "name": "Tzoron 216",
          "category": "Outjo"
        },
        {
          "id": 3404,
          "name": "Burger Hoek",
          "category": "Outjo"
        },
        {
          "id": 3468,
          "name": "Clarke",
          "category": "Outjo"
        },
        {
          "id": 3432,
          "name": "Sondernaam",
          "category": "Outjo"
        },
        {
          "id": 3387,
          "name": "Werda",
          "category": "Outjo"
        },
        {
          "id": 3501,
          "name": "Alexander",
          "category": "Outjo"
        },
        {
          "id": 3398,
          "name": "Vlaakplaas",
          "category": "Outjo"
        },
        {
          "id": 3464,
          "name": "Chorab",
          "category": "Outjo"
        },
        {
          "id": 3469,
          "name": "Cummingham",
          "category": "Outjo"
        },
        {
          "id": 3499,
          "name": "Koening South",
          "category": "Outjo"
        },
        {
          "id": 3399,
          "name": "Ouma And Oupa",
          "category": "Outjo"
        },
        {
          "id": 3389,
          "name": "Diehoek",
          "category": "Outjo"
        },
        {
          "id": 3391,
          "name": "Bradely",
          "category": "Outjo"
        },
        {
          "id": 3390,
          "name": "Patton",
          "category": "Outjo"
        },
        {
          "id": 3396,
          "name": "Monty",
          "category": "Outjo"
        },
        {
          "id": 3513,
          "name": "Queensofia",
          "category": "Outjo"
        },
        {
          "id": 3562,
          "name": "Hillendale",
          "category": "Kamanjab"
        },
        {
          "id": 3565,
          "name": "Nungubis",
          "category": "Kamanjab"
        },
        {
          "id": 3405,
          "name": "Tzamin",
          "category": "Outjo"
        },
        {
          "id": 3450,
          "name": "Trocadelo West",
          "category": "Outjo"
        },
        {
          "id": 3448,
          "name": "Trocadelo East",
          "category": "Outjo"
        },
        {
          "id": 3476,
          "name": "Reese",
          "category": "Outjo"
        },
        {
          "id": 3401,
          "name": "Norton",
          "category": "Outjo"
        },
        {
          "id": 3406,
          "name": "De Hoop 125",
          "category": "Outjo"
        },
        {
          "id": 3470,
          "name": "Namatubis",
          "category": "Outjo"
        },
        {
          "id": 3447,
          "name": "Mount Batten",
          "category": "Outjo"
        },
        {
          "id": 3403,
          "name": "Buschfeld Part Resort",
          "category": "Outjo"
        },
        {
          "id": 3536,
          "name": "Gelukspoort",
          "category": "Kamanjab"
        },
        {
          "id": 3532,
          "name": "Tsuwandes",
          "category": "Kamanjab"
        },
        {
          "id": 3542,
          "name": "Rasputin",
          "category": "Kamanjab"
        },
        {
          "id": 3534,
          "name": "Eureka",
          "category": "Kamanjab"
        },
        {
          "id": 3541,
          "name": "Eendrag",
          "category": "Kamanjab"
        },
        {
          "id": 3474,
          "name": "Harmonie",
          "category": "Kamanjab"
        },
        {
          "id": 3530,
          "name": "Okau",
          "category": "Kamanjab"
        },
        {
          "id": 3540,
          "name": "Onzema",
          "category": "Kamanjab"
        },
        {
          "id": 3524,
          "name": "Frendental",
          "category": "Outjo"
        },
        {
          "id": 3515,
          "name": "Meyerton",
          "category": "Outjo"
        },
        {
          "id": 3495,
          "name": "Isie",
          "category": "Outjo"
        },
        {
          "id": 3400,
          "name": "Cherniakov",
          "category": "Outjo"
        },
        {
          "id": 3503,
          "name": "Franklin",
          "category": "Outjo"
        },
        {
          "id": 3514,
          "name": "Nissen",
          "category": "Outjo"
        },
        {
          "id": 3563,
          "name": "Cauas",
          "category": "Kamanjab"
        },
        {
          "id": 3528,
          "name": "Volunteer",
          "category": "Kamanjab"
        },
        {
          "id": 3549,
          "name": "St Michael",
          "category": "Kamanjab"
        },
        {
          "id": 3463,
          "name": "Crocodelo",
          "category": "Outjo"
        },
        {
          "id": 3473,
          "name": "Oumaise",
          "category": "Outjo"
        },
        {
          "id": 3472,
          "name": "Haris",
          "category": "Outjo"
        },
        {
          "id": 3497,
          "name": "Koening Noord",
          "category": "Outjo"
        },
        {
          "id": 3393,
          "name": "Urib",
          "category": "Outjo"
        },
        {
          "id": 3409,
          "name": "Okutala lodge",
          "category": "Kamanjab"
        },
        {
          "id": 3395,
          "name": "Otjimeno",
          "category": "Outjo"
        },
        {
          "id": 1793,
          "name": "Onayeluka",
          "category": "Outapi"
        },
        {
          "id": 1697,
          "name": "Eendjokwe",
          "category": "Onesi"
        },
        {
          "id": 1700,
          "name": "Olusati",
          "category": "Onesi"
        },
        {
          "id": 1698,
          "name": "Akaonde",
          "category": "Onesi"
        },
        {
          "id": 1594,
          "name": "Ombwata",
          "category": "Tsandi"
        },
        {
          "id": 1702,
          "name": "Oshika",
          "category": "Onesi"
        },
        {
          "id": 1703,
          "name": "Oshihole",
          "category": "Onesi"
        },
        {
          "id": 1789,
          "name": "Okalondo",
          "category": "Tsandi"
        },
        {
          "id": 1761,
          "name": "Oshilemba",
          "category": "Tsandi"
        },
        {
          "id": 1689,
          "name": "Uuhongo",
          "category": "Onesi"
        },
        {
          "id": 1791,
          "name": "Oshitudha",
          "category": "Outapi"
        },
        {
          "id": 1696,
          "name": "Oshihau",
          "category": "Outapi"
        },
        {
          "id": 1701,
          "name": "Omiyongo",
          "category": "Outapi"
        },
        {
          "id": 3475,
          "name": "Spaasaam 302",
          "category": "Kamanjab"
        },
        {
          "id": 3488,
          "name": "Wagstaan",
          "category": "Kamanjab"
        },
        {
          "id": 3496,
          "name": "Nubes",
          "category": "Kamanjab"
        },
        {
          "id": 3544,
          "name": "Byseewah",
          "category": "Kamanjab"
        },
        {
          "id": 3477,
          "name": "Holstein",
          "category": "Kamanjab"
        },
        {
          "id": 3553,
          "name": "Namatanga East",
          "category": "Kamanjab"
        },
        {
          "id": 3551,
          "name": "Otjikondo",
          "category": "Kamanjab"
        },
        {
          "id": 3493,
          "name": "Rafidin 119",
          "category": "Kamanjab"
        },
        {
          "id": 3564,
          "name": "Abyssinia",
          "category": "Kamanjab"
        },
        {
          "id": 3485,
          "name": "Kroonkom",
          "category": "Kamanjab"
        },
        {
          "id": 3555,
          "name": "Namatanga West",
          "category": "Kamanjab"
        },
        {
          "id": 4111,
          "name": "Sayikorongo",
          "category": "Kapako"
        },
        {
          "id": 4102,
          "name": "Sindi",
          "category": "Kapako"
        },
        {
          "id": 4577,
          "name": "Karo",
          "category": "Kapako"
        },
        {
          "id": 4097,
          "name": "Mbora",
          "category": "Kapako"
        },
        {
          "id": 4372,
          "name": "Nkata (Rundu district)",
          "category": "Kapako"
        },
        {
          "id": 4292,
          "name": "Kamuti",
          "category": "Ncamagoro"
        },
        {
          "id": 4286,
          "name": "Nsenseni",
          "category": "Ncamagoro"
        },
        {
          "id": 4290,
          "name": "Sihonena",
          "category": "Ncamagoro"
        },
        {
          "id": 4291,
          "name": "Cui",
          "category": "Ncamagoro"
        },
        {
          "id": 4377,
          "name": "Ncara",
          "category": "Kapako"
        },
        {
          "id": 4101,
          "name": "Gcugcuma",
          "category": "Kapako"
        },
        {
          "id": 4285,
          "name": "Sihetekera",
          "category": "Ncamagoro"
        },
        {
          "id": 4168,
          "name": "Mpora",
          "category": "Ncamagoro"
        },
        {
          "id": 4289,
          "name": "Tjwatama",
          "category": "Ncamagoro"
        },
        {
          "id": 4164,
          "name": "Mamono (Rundu district)",
          "category": "Ncamagoro"
        },
        {
          "id": 4183,
          "name": "Sitetu",
          "category": "Ncamagoro"
        },
        {
          "id": 4088,
          "name": "Kasivi",
          "category": "Kapako"
        },
        {
          "id": 4089,
          "name": "Sivara (Rundu district)",
          "category": "Kapako"
        },
        {
          "id": 4090,
          "name": "Dudu",
          "category": "Kapako"
        },
        {
          "id": 4091,
          "name": "Bunya",
          "category": "Kapako"
        },
        {
          "id": 4092,
          "name": "Karangana",
          "category": "Kapako"
        },
        {
          "id": 4094,
          "name": "Pusa",
          "category": "Kapako"
        },
        {
          "id": 4093,
          "name": "Halili",
          "category": "Kapako"
        },
        {
          "id": 4284,
          "name": "Epingiro",
          "category": "Ncamagoro"
        },
        {
          "id": 4172,
          "name": "Epingiro 1 & 2",
          "category": "Ncamagoro"
        },
        {
          "id": 4288,
          "name": "Mbeyo (Rundu district)",
          "category": "Ncamagoro"
        },
        {
          "id": 4282,
          "name": "Sihepera",
          "category": "Ncamagoro"
        },
        {
          "id": 4169,
          "name": "Ncasava",
          "category": "Ncamagoro"
        },
        {
          "id": 4095,
          "name": "Karo",
          "category": "Kapako"
        },
        {
          "id": 4110,
          "name": "Ndjikiti",
          "category": "Kapako"
        },
        {
          "id": 4180,
          "name": "Sivaradi 1&2",
          "category": "Ncamagoro"
        },
        {
          "id": 4104,
          "name": "Nyikama",
          "category": "Ncuncuni"
        },
        {
          "id": 4184,
          "name": "Sitendu Farm",
          "category": "Ncamagoro"
        },
        {
          "id": 4166,
          "name": "Simeme",
          "category": "Ncuncuni"
        }
      ]
    }
  }
  // @ts-ignore
  const response = validate(namConfig)

  t.is(response.status, EUnifiedStatus.Green)
})
