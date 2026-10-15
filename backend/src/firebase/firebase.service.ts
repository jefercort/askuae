import { Injectable } from '@nestjs/common';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  // los constructores son como abrir una tienda, se abre y se enciende las luces una sola vez, que en este caso es cuando NESTJS arranca tambien puedo usar onModuleInit()
  constructor() {
    if (getApps().length === 0) {
      initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
    }
  }

  // los metodos los interpreto como atender un cliente, cada vez que llega un nuevo cliente debo atender su llamado, por ello el GUARD lo va a llamar en cada request, con un token distinto cada vez (jwt)
  async verifyIdToken(token: string) {
    // si el token no es valido va a lanzar un error que voy a recibir en el GUARD
    return await getAuth().verifyIdToken(token);
  }
}
