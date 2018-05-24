// tslint:disable:no-submodule-imports
// @ts-ignore
import Ajv from 'ajv'
// @ts-ignore
import draft_6 from 'ajv/lib/refs/json-schema-draft-06.json'

// TODO: Import from file
const schemaDefinitions = {
  // TOOD: Add the $id property dynammically after importing it, it's required for the defitions to work.
  "$id": "defs.json",
  
  "$schema": "http://json-schema.org/draft-06/schema#",
  "definitions": {
    "Config": {
      "properties": {
        "number_config": {
          "$ref": "#/definitions/NumberConfig"
        },
        "string_config": {
          "$ref": "#/definitions/StringConfig"
        }
      },
      "type": "object"
    },
    "Message": {
      "type": "string"
    },
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
    "Response": {
      "properties": {
        "messages": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "status": {
          "$ref": "#/definitions/Status"
        }
      },
      "required": [
        "messages",
        "status"
      ],
      "type": "object"
    },
    "Status": {
      "enum": [
        0,
        1,
        2,
        3
      ],
      "type": "number"
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
  }
}



const ajv = new Ajv()

// tslint:disable:no-expression-statement
ajv.addMetaSchema(draft_6);
ajv.addSchema(schemaDefinitions)

export function validateJsonSchema(schemaName: string, data: any) : boolean {
  const schema = { "$ref": `defs.json#/definitions/${schemaName}` }
  const validate = ajv.compile(schema);
  return validate(data) as boolean
}

