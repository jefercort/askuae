import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// aca creo la lista de las categorias
const serviceCategories = [
  // --- Categorías Nutridas ---
  { name: 'visas_immigration', icon: 'file-text' },
  { name: 'business_setup', icon: 'briefcase' },
  { name: 'legal', icon: 'scale' },
  { name: 'accounting_tax', icon: 'calculator' },
  { name: 'real_estate', icon: 'home' },

  // --- Salud, Estilo de Vida y Cuidado ---
  { name: 'health', icon: 'heart' },
  { name: 'beauty', icon: 'scissors' },
  { name: 'fitness', icon: 'dumbbell' },
  { name: 'care', icon: 'baby' },
  { name: 'pets', icon: 'paw-print' },

  // --- Cotidiano, Gastronomía y Hogar ---
  { name: 'gastronomy', icon: 'utensils' },
  { name: 'home_services', icon: 'wrench' },
  { name: 'cleaning', icon: 'droplets' },
  { name: 'transport_logistics', icon: 'truck' },

  // --- Desarrollo, Creatividad y Ocio ---
  { name: 'tech', icon: 'code' },
  { name: 'marketing_media', icon: 'megaphone' },
  { name: 'events_photography', icon: 'camera' },
  { name: 'education', icon: 'graduation-cap' },

  // --- General ---
  { name: 'other', icon: 'grid' },
];

async function main() {
  for (const category of serviceCategories) {
    // upsert sirve para que lo cree si no existe y si existe entonces no se hace nada
    await prisma.serviceCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
  console.log(`Seed already done: ${serviceCategories.length} categories`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
