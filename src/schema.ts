export default {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "definitions": {
        "NumberConfig": {
            "properties": {
                "array_of_numbers": {
                    "items": {
                        "type": "number"
                    },
                    "type": "array"
                },
                "number": {
                    "type": "number"
                }
            },
            "required": [
                "array_of_numbers",
                "number"
            ],
            "type": "object"
        },
        "StringConfig": {
            "properties": {
                "optional_string": {
                    "type": "string"
                },
                "strings": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "strings"
            ],
            "type": "object"
        }
    },
    "properties": {
        "number_config": {
            "$ref": "#/definitions/NumberConfig"
        },
        "string_config": {
            "$ref": "#/definitions/StringConfig"
        }
    },
    "type": "object"
}

