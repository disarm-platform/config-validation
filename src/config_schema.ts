export default {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "definitions": {
        "Applet": {
            "properties": {
                "icon": {
                    "description": "The icon for the applet",
                    "type": "string"
                },
                "title": {
                    "description": "The title for the applet",
                    "type": "string"
                }
            },
            "type": "object"
        },
        "Applets": {
            "properties": {
                "debug": {
                    "$ref": "#/definitions/Applet"
                },
                "irs_monitor": {
                    "$ref": "#/definitions/IrsMonitor"
                },
                "irs_plan": {
                    "$ref": "#/definitions/IrsPlan"
                },
                "irs_record_point": {
                    "$ref": "#/definitions/IrsRecordPoint"
                },
                "irs_tasker": {
                    "$ref": "#/definitions/Applet"
                },
                "meta": {
                    "$ref": "#/definitions/Applet"
                },
                "seasons": {
                    "$ref": "#/definitions/Applet"
                }
            },
            "required": [
                "debug",
                "irs_monitor",
                "irs_plan",
                "irs_record_point",
                "irs_tasker",
                "meta",
                "seasons"
            ],
            "type": "object"
        },
        "ChartConfig": {
            "properties": {
                "id": {
                    "type": "string"
                },
                "options": {
                    "$ref": "#/definitions/ChartOptions"
                },
                "style": {
                    "$ref": "#/definitions/ChartStyle"
                }
            },
            "required": [
                "id",
                "options",
                "style"
            ],
            "type": "object"
        },
        "ChartMap": {
            "properties": {
                "aggregation_names": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "bin_by": {
                    "type": "string"
                },
                "chart_type": {
                    "$ref": "#/definitions/Map"
                },
                "property_layers": {
                    "items": {
                        "$ref": "#/definitions/PropertyLayer"
                    },
                    "type": "array"
                },
                "response_point_fields": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "aggregation_names",
                "bin_by",
                "chart_type",
                "property_layers",
                "response_point_fields"
            ],
            "type": "object"
        },
        "ChartMultiSeries": {
            "properties": {
                "aggregation_name": {
                    "type": "string"
                },
                "colour": {
                    "type": "string"
                }
            },
            "required": [
                "aggregation_name"
            ],
            "type": "object"
        },
        "ChartOptions": {
            "properties": {
                "bin_by": {
                    "type": "string"
                },
                "chart_type": {
                    "$ref": "#/definitions/ChartType"
                },
                "cumulative": {
                    "type": "boolean"
                },
                "generate_series_from": {
                    "type": "string"
                },
                "geographic_level_refactor_this_key_name": {
                    "type": "string"
                },
                "layout": {
                    "$ref": "#/definitions/ChartOptionsLayout"
                },
                "multi_series": {
                    "items": {
                        "$ref": "#/definitions/ChartMultiSeries"
                    },
                    "type": "array"
                },
                "single_series": {
                    "$ref": "#/definitions/ChartSingleSeries"
                },
                "text": {
                    "type": "string"
                },
                "time_series": {
                    "type": "boolean"
                },
                "title": {
                    "type": "string"
                }
            },
            "required": [
                "chart_type"
            ],
            "type": "object"
        },
        "ChartOptionsLayout": {
            "properties": {
                "barmode": {
                    "enum": [
                        0
                    ],
                    "type": "number"
                },
                "showlegend": {
                    "type": "boolean"
                },
                "title": {
                    "type": "string"
                },
                "xaxis": {
                    "$ref": "#/definitions/ChartOptionsLayoutAxis"
                },
                "yaxis": {
                    "$ref": "#/definitions/ChartOptionsLayoutAxis"
                }
            },
            "required": [
                "title"
            ],
            "type": "object"
        },
        "ChartOptionsLayoutAxis": {
            "properties": {
                "title": {
                    "type": "string"
                }
            },
            "required": [
                "title"
            ],
            "type": "object"
        },
        "ChartSingleSeries": {
            "properties": {
                "aggregation_name": {
                    "type": "string"
                }
            },
            "required": [
                "aggregation_name"
            ],
            "type": "object"
        },
        "ChartStyle": {
            "properties": {
                "height_constraint": {
                    "$ref": "#/definitions/HeightConstraint"
                },
                "width_constraint": {
                    "$ref": "#/definitions/WidthConstraint"
                }
            },
            "required": [
                "height_constraint",
                "width_constraint"
            ],
            "type": "object"
        },
        "ChartTable": {
            "properties": {
                "aggregation_names": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "bin_by": {
                    "type": "string"
                },
                "chart_type": {
                    "$ref": "#/definitions/Table"
                },
                "property_layers": {
                    "items": {
                        "$ref": "#/definitions/PropertyLayer"
                    },
                    "type": "array"
                }
            },
            "required": [
                "aggregation_names",
                "bin_by",
                "chart_type",
                "property_layers"
            ],
            "type": "object"
        },
        "ChartType": {
            "enum": [
                0,
                1,
                2,
                3
            ],
            "type": "number"
        },
        "HeightConstraint": {
            "enum": [
                0,
                1
            ],
            "type": "number"
        },
        "IrsMonitor": {
            "description": "The configuration for the IRS Monitor applet for douma",
            "properties": {
                "charts": {
                    "items": {
                        "$ref": "#/definitions/ChartConfig"
                    },
                    "type": "array"
                },
                "icon": {
                    "description": "The icon for the applet",
                    "type": "string"
                },
                "map": {
                    "$ref": "#/definitions/ChartMap",
                    "description": "Map configuration"
                },
                "season_start_dates": {
                    "description": "The start of the current season",
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "table": {
                    "$ref": "#/definitions/ChartTable",
                    "description": "Table configuration"
                },
                "title": {
                    "description": "The title for the applet",
                    "type": "string"
                }
            },
            "required": [
                "map",
                "season_start_dates",
                "table"
            ],
            "type": "object"
        },
        "IrsPlan": {
            "properties": {
                "icon": {
                    "description": "The icon for the applet",
                    "type": "string"
                },
                "table_output": {
                    "items": {
                        "$ref": "#/definitions/TableOutput"
                    },
                    "type": "array"
                },
                "title": {
                    "description": "The title for the applet",
                    "type": "string"
                }
            },
            "required": [
                "table_output"
            ],
            "type": "object"
        },
        "IrsRecordPoint": {
            "properties": {
                "icon": {
                    "description": "The icon for the applet",
                    "type": "string"
                },
                "metadata": {
                    "$ref": "#/definitions/MetaData"
                },
                "title": {
                    "description": "The title for the applet",
                    "type": "string"
                }
            },
            "required": [
                "metadata"
            ],
            "type": "object"
        },
        "Map": {
            "enum": [
                0
            ],
            "type": "number"
        },
        "MetaData": {
            "properties": {
                "optional_fields": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "show": {
                    "type": "boolean"
                }
            },
            "required": [
                "optional_fields",
                "show"
            ],
            "type": "object"
        },
        "PropertyLayer": {
            "properties": {
                "label": {
                    "type": "string"
                },
                "property": {
                    "type": "string"
                }
            },
            "required": [
                "label",
                "property"
            ],
            "type": "object"
        },
        "Table": {
            "enum": [
                0
            ],
            "type": "number"
        },
        "TableOutput": {
            "properties": {
                "display_name": {
                    "type": "string"
                },
                "source_field": {
                    "type": "string"
                }
            },
            "required": [
                "display_name",
                "source_field"
            ],
            "type": "object"
        },
        "WidthConstraint": {
            "enum": [
                0,
                1
            ],
            "type": "number"
        }
    },
    "properties": {
        "aggregations": {
        },
        "applets": {
            "$ref": "#/definitions/Applets"
        },
        "config_id": {
            "type": "string"
        },
        "config_version": {
            "type": "string"
        },
        "decorators": {
        },
        "fake_form": {
        },
        "form": {
        },
        "instance": {
        },
        "location_selection": {
        },
        "map_focus": {
        },
        "presenters": {
        },
        "spatial_hierarchy": {
        },
        "validations": {
        }
    },
    "required": [
        "aggregations",
        "applets",
        "config_id",
        "config_version",
        "decorators",
        "fake_form",
        "form",
        "instance",
        "location_selection",
        "map_focus",
        "presenters",
        "spatial_hierarchy",
        "validations"
    ],
    "type": "object"
}

