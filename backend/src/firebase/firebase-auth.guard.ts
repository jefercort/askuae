import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AuthenticatedRequest } from './authenticated-request.interface';

// UN GUARD en NESTJS es una clase con un solo metodo obligatorio decide si la request llega al controller; corre antes de los pipes
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}
  // si el return es true entonces deja pasar el Controller, si no lanza un unauthorizedexeption = 401
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // como el context de NestJS es generico tengo que indicarle que es HTTP
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    // el frontend manda el header Authorization: Bearer <token>
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token invalido');
    }

    try {
      // aca agrego el prop user dentro del request que es el resultado de la validacion del verifyIdToken del firebase.service
      request.user = await this.firebaseService.verifyIdToken(token);
    } catch {
      throw new UnauthorizedException('Token invalido o expirado');
    }
    return true;
  }
}
