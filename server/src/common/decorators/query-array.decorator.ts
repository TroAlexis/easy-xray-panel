import { createParamDecorator } from '@nestjs/common';

export const QueryArray = createParamDecorator<string>((param, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const value = request.query[param];

  // Return the value wrapped in an array if it's not already an array
  return Array.isArray(value) ? value : [value];
});
