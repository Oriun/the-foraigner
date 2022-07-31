import { mongoIdValidator } from "../constantes";
import { regexToString } from "../utils";

export const PostExerciseSchema = {
  body: {
    type: "object",
    required: ["name", "type", "category", "content", "description"],
    additionalProperties: false,
    properties: {
      name: {
        type: "string",
        minLength: 3
      },
      type: {
        type: "string",
        minLength: 3
      },
      category: {
        type: "string",
        minLength: 3
      },
      language: {
        type: "string",
        minLength: 2,
        maxLength: 2
      },
      content: {
        type: "object",
        additionalProperties: true
      },
      description: {
        type: "string",
        minLength: 3
      }
    }
  }
};

export const LookByIdExerciseSchema = {
  params: {
    type: "object",
    required: ["id"],
    additionalProperties: false,
    properties: {
      id: {
        type: "string",
        minLength: 24,
        maxLength: 24,
        pattern: regexToString(mongoIdValidator)
      }
    }
  }
};
