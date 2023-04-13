import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { Profile } from "../profile.model";

export const ApiOkResponseShowProfile = <TModel extends Type<any>>(
  model: TModel
) => {
  console.log(typeof model);
  return applyDecorators(
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(Profile),
        type: 'object',
        properties: {
          users: { $ref: getSchemaPath(model) }
        }
      }
    }));
};
