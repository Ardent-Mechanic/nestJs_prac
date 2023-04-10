import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { TextBlock } from "../text-block.model";


export const ApiOkResponseShowTextBlock = <TModel extends Type<any>> (
  model: TModel,
) => {
  console.log(typeof model);
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(TextBlock) },
          {
            properties: {
              files: {
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