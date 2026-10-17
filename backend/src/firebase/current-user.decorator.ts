import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from './authenticated-request.interface';

// este decorador va en esta carpeta Firebase, porque lee lo que el guard dejo en el request y trabajan en equipo y lo importo
// desde el controllador user para usarlo en 'create'
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
