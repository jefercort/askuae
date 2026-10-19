import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

// etiqueta la ruta con los roles permitidos; no valida nada, el RolesGuard lee esta etiqueta y decide
export const ROLES_KEY = 'roles';
// aca cree un decorador de metodo que adjunta metadata
export const RequireRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// La analogía del aeropuerto

//   - El decorador @RequireRoles(...) es el empleado que pega una etiqueta en la maleta al hacer el check -in.No revisa nada, solo etiqueta.
// - La metadata es la etiqueta pegada.Se queda ahí, quieta.
// - El RolesGuard es el control de la puerta de embarque: lee la etiqueta y decide si pasas.
// - ROLES_KEY es el nombre del campo en la etiqueta.Una maleta puede llevar varias etiquetas("frágil", "prioridad", "destino"), y necesitas saber cuál leer.
