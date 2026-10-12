# askuae

Directorio de proveedores de servicios para expats que viven en Dubai / Emiratos Árabes Unidos.

En los grupos de expats se piden contactos a diario: visas, abogados, médicos, mudanzas, niñeras... y las recomendaciones se pierden en el chat. **askuae** centraliza esos contactos con categorías, ciudad, WhatsApp/redes y reseñas de la comunidad.

> 🚧 Proyecto en desarrollo activo. El frontend todavía usa datos mock para el listado de proveedores mientras se integra con la API.

## Stack

| Capa      | Tecnologías |
|-----------|-------------|
| Frontend  | React 19, TypeScript, Vite, TanStack Query, React Router, Firebase Auth (Google) |
| Backend   | NestJS 11, Prisma 7 (`@prisma/adapter-pg`), class-validator |
| Base de datos | PostgreSQL 17 (Docker en local) |

## Estructura

Monorepo sin `package.json` en la raíz: cada app tiene sus propias dependencias.

```
askuae/
├── backend/    API REST en NestJS + Prisma
│   ├── prisma/         schema.prisma y migraciones
│   └── src/            módulos por recurso (controller → service → PrismaService)
└── frontend/   SPA en React + Vite
    └── src/
        ├── context/    AuthProvider (Firebase) y ThemeProvider
        ├── pages/      Home, Login
        ├── services/   llamadas a la API
        └── types/      tipos compartidos del dominio
```

### Modelo de datos

`User` · `ServiceProvider` · `ServiceOffering` · `ServiceCategory` · `Review`

Un proveedor ofrece uno o varios servicios (`ServiceOffering`), cada uno dentro de una categoría, y recibe reseñas de los usuarios.

## Cómo correrlo en local

**Requisitos:** Node.js 20+, Docker y un proyecto de Firebase con el login de Google habilitado.

### 1. Backend

```bash
cd backend
cp .env.example .env          # rellena tus valores
docker compose up -d          # levanta Postgres en el puerto 5444
npm install
npx prisma migrate dev        # aplica las migraciones
npm run start:dev             # API en http://localhost:3000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                   # app en http://localhost:5173
```

La configuración web de Firebase está en `frontend/src/config/firebase.ts`. Para usar tu propio proyecto, cambia esos valores.

## API

| Método | Ruta                  | Descripción |
|--------|-----------------------|-------------|
| POST   | `/users`              | Crea un usuario |
| GET    | `/users`              | Lista usuarios |
| GET    | `/users/:emailUser`   | Busca un usuario por email |
| PATCH  | `/users/:id`          | Actualiza un usuario (UUID) |
| DELETE | `/users/:id`          | Elimina un usuario (UUID) |

## Roadmap

- [x] Login con Google y creación del perfil de usuario en el backend
- [x] Modelo de datos y migraciones con Prisma
- [ ] Reemplazar los datos mock del frontend por la API real
- [ ] CRUD de proveedores, categorías y servicios
- [ ] Reseñas de usuarios
- [ ] Búsqueda y filtros por categoría y ciudad
- [ ] Despliegue

## Scripts útiles

```bash
# backend/
npm run lint
npm test              # tests unitarios (Jest)
npm run test:e2e

# frontend/
npm run lint
npm run build
```

## Autor

Kevin Cortes
