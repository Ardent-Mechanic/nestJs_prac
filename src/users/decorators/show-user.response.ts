import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { User } from "../users.model";

export const ApiShowUserResponse = <TModel extends Type<any>> (
  model: TModel,
) => {
  console.log(typeof model);
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(User) },
          {
            properties: {
              roles: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};