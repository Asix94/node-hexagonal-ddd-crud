# node-hexagonal-ddd-crud

Proyecto de aprendizaje para migrar un CRUD con arquitectura hexagonal y DDD desde PHP a Node.js.

## Requisitos

- Docker Engine o Docker Desktop
- Docker Compose

No es necesario instalar Node.js ni PostgreSQL en el equipo.

## Arranque

```bash
cp .env.example .env
docker compose up --build
```

La API estará disponible en http://localhost:3000.

Comprueba el endpoint de salud:

```bash
curl http://localhost:3000/health
```

Respuesta esperada:

```json
{"status":"ok"}
```

## Servicios

- `api`: Node.js 24, TypeScript y Express 5 en modo desarrollo.
- `database`: PostgreSQL 17 con almacenamiento persistente, publicado en el puerto local `5433`.

## Comandos básicos

```bash
docker compose up --build
docker compose logs -f api
docker compose down
docker compose down -v
```

`docker compose down -v` también elimina los datos locales de PostgreSQL y las dependencias instaladas en el volumen de Node.js.
