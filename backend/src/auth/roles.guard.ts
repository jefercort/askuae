import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
import { AuthenticatedRequest } from '../firebase/authenticated-request.interface';
import { PrismaService } from '../prisma/prisma.service';

// el flujo es el decoradro escribe la etiqueta al arracnar, el Reflector la lee en cada peticion y ésta guard decide con lo que está leyendo
@Injectable()
export class RolesGuard implements CanActivate {
  // aca Reflector de NestJS es el que lee la etiqueta que contiene la metadata
  // donde se le pregunta que hay bajo esta clave 'ROLES_KEY' en este lugar
  // por ello se le pasa el ROLES_KEY y abajo se le pasaron dos lugares el getHandler y el getClass en alguno de los dos vendra la información
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // getAllAndOverride busca primero en el método y si no encuentra nada busca en la clase
    // Así la etiqueta de una ruta sobreescribe la del controller
    // getAllAndOverride es el más usado para roles: "la regla más específica gana".Con él se puede poner @RequireRoles(Role.ADMIN) en todo un controller y relajar una ruta concreta.
    // getAllAndMerge sirve cuando las etiquetas se suman, por ejemplo permisos acumulativos.
    // Acá me retorna un Array de Roles []
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // El metodo: @RequireRoles en la ruta que se está ejecutando
      context.getClass(), // La clase: @RequireRoles en todo el controller
    ]);
    if (!requireRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userUid = request.user?.uid;

    if (!userUid) {
      throw new UnauthorizedException('No es posible saber el usuario'); // Genera un 401 porque el serv no sabe que usuario es
    }

    // Ahora voy a buscar el rol del usuario en cuestion y lo voy a comparar a ver si tiene el role necesario para la funcionalidad
    const foundUser = await this.prisma.user.findUnique({
      where: {
        firebaseUid: userUid,
      },
      select: {
        role: true,
      },
    });

    if (!foundUser) {
      throw new ForbiddenException('No existe el perfil de usuario'); // Genera un 403
    }

    if (!requireRoles.includes(foundUser.role)) {
      throw new ForbiddenException('No tiene acceso a ésta funcionalidad');
    }

    return true;
  }
}
