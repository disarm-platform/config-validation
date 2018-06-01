export default {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "definitions": {
        "Aggregation": {
            "properties": {
                "denominator_aggregation": {
                    "type": "string"
                },
                "denominator_field": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "numerator_expr": {
                    "type": "string"
                }
            },
            "required": [
                "name",
                "numerator_expr"
            ],
            "type": "object"
        },
        "Applets": {
            "properties": {
                "debug": {
                    "$ref": "#/definitions/TApplet"
                },
                "irs_monitor": {
                    "$ref": "#/definitions/TIrsMonitor"
                },
                "irs_plan": {
                    "$ref": "#/definitions/TIrsPlan"
                },
                "irs_record_point": {
                    "$ref": "#/definitions/TIrsRecordPoint"
                },
                "irs_tasker": {
                    "$ref": "#/definitions/TApplet"
                },
                "meta": {
                    "$ref": "#/definitions/TApplet"
                },
                "seasons": {
                    "$ref": "#/definitions/TApplet"
                }
            },
            "required": [
                "meta"
            ],
            "type": "object"
        },
        "Centre": {
            "properties": {
                "lat": {
                    "type": "number"
                },
                "lng": {
                    "type": "number"
                }
            },
            "required": [
                "lat",
                "lng"
            ],
            "type": "object"
        },
        "ChartConfig": {
            "properties": {
                "chart_type": {
                    "enum": [
                        "text"
                    ],
                    "type": "string"
                },
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
                "chart_type",
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
                    "enum": [
                        "map"
                    ],
                    "type": "string"
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
                        "stack"
                    ],
                    "type": "string"
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
                    "enum": [
                        "table"
                    ],
                    "type": "string"
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
                "bar",
                "line",
                "pie",
                "text"
            ],
            "type": "string"
        },
        "DecoratorOption": {
            "additionalProperties": {
                "type": "string"
            },
            "type": "object"
        },
        "Decorators": {
            "additionalProperties": {
                "items": {
                    "$ref": "#/definitions/DecoratorOption"
                },
                "type": "array"
            },
            "type": "object"
        },
        "DenominatorFields": {
            "additionalProperties": {
                "type": "string"
            },
            "type": "object"
        },
        "Form": {
            "properties": {
                "pages": {
                    "items": {
                        "$ref": "#/definitions/Page"
                    },
                    "type": "array"
                }
            },
            "required": [
                "pages"
            ],
            "type": "object"
        },
        "HeightConstraint": {
            "enum": [
                "full",
                "none"
            ],
            "type": "string"
        },
        "Instance": {
            "properties": {
                "location_name": {
                    "type": "string"
                },
                "slug": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                }
            },
            "required": [
                "location_name",
                "slug",
                "title"
            ],
            "type": "object"
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
                "charts",
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
        "Level": {
            "properties": {
                "display_field_name": {
                    "type": "string"
                },
                "field_name": {
                    "type": "string"
                },
                "group_by_field": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "display_field_name",
                "field_name",
                "name"
            ],
            "type": "object"
        },
        "LocationSelection": {
            "additionalProperties": {
                "$ref": "#/definitions/LocationSelectionOption"
            },
            "type": "object"
        },
        "LocationSelectionOption": {
            "properties": {
                "category": {
                    "type": "string"
                },
                "id": {
                    "type": [
                        "string",
                        "number"
                    ]
                },
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "category",
                "id",
                "name"
            ],
            "type": "object"
        },
        "MapFocus": {
            "properties": {
                "centre": {
                    "$ref": "#/definitions/Centre"
                },
                "zoom": {
                    "type": "number"
                }
            },
            "required": [
                "centre",
                "zoom"
            ],
            "type": "object"
        },
        "Markers": {
            "properties": {
                "denominator_fields": {
                    "$ref": "#/definitions/DenominatorFields"
                },
                "planning_level_name": {
                    "type": "string"
                },
                "record_location_selection_level_name": {
                    "type": "string"
                }
            },
            "required": [
                "denominator_fields",
                "planning_level_name",
                "record_location_selection_level_name"
            ],
            "type": "object"
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
        "Page": {
            "properties": {
                "elements": {
                    "items": {
                    },
                    "type": "array"
                },
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "elements",
                "name"
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
        "SpatialHierarchy": {
            "properties": {
                "data_version": {
                    "type": "number"
                },
                "ignore_planning_level_restriction": {
                    "type": "boolean"
                },
                "levels": {
                    "items": {
                        "$ref": "#/definitions/Level"
                    },
                    "type": "array"
                },
                "markers": {
                    "$ref": "#/definitions/Markers"
                }
            },
            "required": [
                "data_version",
                "levels",
                "markers"
            ],
            "type": "object"
        },
        "TApplet": {
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
        "Validation": {
            "properties": {
                "expression": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "precondition": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "expression",
                "message",
                "name",
                "type"
            ],
            "type": "object"
        },
        "WidthConstraint": {
            "enum": [
                "full",
                "half"
            ],
            "type": "string"
        }
    },
    "properties": {
        "aggregations": {
            "items": {
                "$ref": "#/definitions/Aggregation"
            },
            "type": "array"
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
            "$ref": "#/definitions/Decorators"
        },
        "fake_form": {
            "items": {
            },
            "type": "array"
        },
        "form": {
            "$ref": "#/definitions/Form"
        },
        "instance": {
            "$ref": "#/definitions/Instance"
        },
        "location_selection": {
            "$ref": "#/definitions/LocationSelection"
        },
        "map_focus": {
            "$ref": "#/definitions/MapFocus"
        },
        "spatial_hierarchy": {
            "$ref": "#/definitions/SpatialHierarchy"
        },
        "validations": {
            "items": {
                "$ref": "#/definitions/Validation"
            },
            "type": "array"
        }
    },
    "required": [
        "applets",
        "config_id",
        "config_version",
        "instance"
    ],
    "type": "object"
}

