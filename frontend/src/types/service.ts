export type Category = 
  // --- Categorías Nutridas (Anteriormente agrupadas en 'legal') ---
  | 'visas_immigration'  // Visados, Emirates ID, residencias, Golden Visa
  | 'business_setup'     // Apertura de empresas, licencias comerciales, Freezones, Mainland
  | 'legal'              // Abogados, traducciones juradas, contratos, poderes
  | 'accounting_tax'     // Contabilidad, Corporate Tax, VAT, cuentas bancarias
  | 'real_estate'        // Alquiler (Ejari), compraventa, agentes inmobiliarios
  
  // --- Salud, Estilo de Vida y Cuidado ---
  | 'health'             // Médicos, dentistas, psicólogos, fisioterapia
  | 'beauty'             // Peluquerías, barberías, estética, uñas
  | 'fitness'            // Entrenadores personales, pádel, yoga, gimnasios
  | 'care'               // Niñeras (nannies), cuidado de niños, guarderías
  | 'pets'               // Veterinarios, paseadores, guardería/estética canina

  // --- Cotidiano, Gastronomía y Hogar ---
  | 'gastronomy'         // Restaurantes, chefs a domicilio, catering, repostería
  | 'home_services'      // Mantenimiento, aire acondicionado (A/C), plomería, pintura
  | 'cleaning'           // Limpieza doméstica, limpieza profunda, desinfección
  | 'transport_logistics'// Mudanzas, envíos internacionales de carga/paquetes, choferes

  // --- Desarrollo, Creatividad y Ocio ---
  | 'tech'               // Desarrollo web, apps, soporte técnico
  | 'marketing_media'    // Redes sociales, marketing digital, diseño gráfico, SEO
  | 'events_photography' // Fotógrafos, video, DJ, organización de eventos
  | 'education'          // Clases particulares, idiomas, tutorías escolares

  // --- General ---
  | 'other';
export type City = 'dubai' | 'sharjah' | 'abu_dhabi' | 'ajman' | 'fujairah' | 'ras_al_khaimah' | 'umm_al_quwain';

export interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone1?: string;
  phone2?: string;
  wp1: boolean;
  wp2: boolean;
  tg1: boolean;
  tg2: boolean;
  instagram?: string;
  tiktok?: string;
  webpage?: string;
  address?: string;
  category: Category;
  city: City;
  rating: number;
  reviewCount: number;
  mapsLink: string;
  serviceDesc?: string;
}
