import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
// cuando no aparece prismaClient es porque no se ha generado hay que usar npx prisma generate
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor() {
    // 1. Creamos el Pool con tu URL
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    // 2. Le pasamos el Pool al adaptador
    const adapter = new PrismaPg(pool);

    // 3. Inyectamos el adaptador
    super({ adapter });
  }
  // con OnModuleInit le garantizo a la app que la puerta hacia mi db se abrira automaticamente cuando arranque el servidor
  // y si existe algun problema de conexion o demas lo va avisar de una vez y no despues cuando sea muy tarde
  async onModuleInit() {
    // en esta parte se le dice a prisma que abra la conexión $connect es un método de prisma para conectarse a la db
    await this.$connect();
  }
  // aca usamos el metodo $disconnect para que no queden conexiones fantasma consumiendo recursos cuando se desmonta el serv
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
