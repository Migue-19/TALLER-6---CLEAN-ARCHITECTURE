# Documentación técnica de los backends

Ambos backends implementan **Clean Architecture** y exponen el mismo contrato HTTP.
La regla de dependencia es: **infraestructura → aplicación → dominio** (las flechas apuntan hacia adentro;
el dominio no conoce a nadie).

```
 HTTP ──► Controller ──► UseCase ──► Repository (contrato, dominio)
                                          ▲
                                          │ implementa
                                   RepositoryImpl ──► Datasource (Faker)
```

## Capas y responsabilidades

| Capa | Contenido | Conoce a |
|---|---|---|
| **Domain** | Entidades (`User`, `Product`, `Course`) y contratos de repositorio (clases abstractas) | Nadie |
| **Application** | Casos de uso `GetAll{Users,Products,Courses}UseCase` | Solo el contrato del repositorio |
| **Infrastructure** | `*RepositoryImpl` (adaptan el datasource al contrato), `*Datasource` (datos simulados con Faker), controladores y framework web | Dominio y aplicación |

Los casos de uso **nunca** reciben una implementación concreta: reciben el contrato abstracto.

## Backend Node.js (`backend-nodejs`)

```
src
├── domain/{models,repositories}
├── application/usecases
├── infrastructure
│   ├── datasources, repositories
│   └── web/{config,controllers,erros,interfaces,routes,server.ts}
└── app.ts
```

- **Inyección de dependencias:** manual, en la *raíz de composición* de cada módulo
  (`infrastructure/web/routes/*.routes.ts`). Ejemplo, módulo Cursos:
  `new CourseDatasource()` → `new CourseRepositoryImpl(ds)` → `new GetAllCoursesUseCase(repo)` → `new CoursesController(useCase)`.
  `routes.ts` (`AppRoutes`) agrupa los módulos bajo `/api/users`, `/api/products` y `/api/courses`.
- **Errores:** `CustomError` + `HandleError` centralizan la respuesta HTTP. Parámetro inválido → `400`.
- **Swagger:** `swagger-jsdoc` genera la especificación a partir de los comentarios `@openapi` de
  `routes/*.routes.ts` y de `config/swagger.schemas.ts`; se sirve con `swagger-ui-express` en `/api/docs`.
- **Latencia simulada:** los controladores esperan 3 s antes de responder para poder ver el estado
  "Cargando…" en Angular.

## Backend Spring Boot (`backend-springboot`)

```
uceva.cleanarchitecture
├── domain/{entity,repository}
├── application/usecase
├── infrastructure/{controller,datasource,repository}
└── config/{AppConfig, CorsConfig, OpenApiConfig}
```

- **Inyección de dependencias:** el contenedor de Spring. `config/AppConfig` declara los `@Bean` en
  cadena (datasource → repositorio → caso de uso); `CourseRepository` se resuelve al bean
  `CourseRepositoryImpl`. Los controladores reciben el caso de uso por constructor.
- **CORS:** `CorsConfig` permite `http://localhost:4200`.
- **Swagger:** `springdoc-openapi-starter-webmvc-ui` **3.0.0** (compatible con Spring Boot 4).
  Los controladores usan `@Tag`, `@Operation` y `@Parameter`. UI en `/api/swagger-ui/index.html`,
  especificación JSON en `/api/v3/api-docs`. El `context-path` es `/api`.
- **Errores:** `ResponseStatusException(BAD_REQUEST)` para parámetros menores a 1.

## Contrato de datos (idéntico en ambos backends y en los modelos de Angular)

| Módulo | Campos |
|---|---|
| `User` | `id:int`, `name`, `lastName`, `age:int`, `email`, `engineering` ∈ {Sistemas, Electronica, Biomedica, Industrial, Ambiental} |
| `Product` | `id:int`, `name`, `category` ∈ {Lacteos, Carnes, Frutas, Verduras}, `price:number` |
| `Course` | `id:int`, `name`, `teacher`, `credits:int`, `modality` ∈ {Presencial, Virtual, Hibrido} |

Verificación automática: `node scripts/verify-contract.mjs <baseUrl>`.

## Cómo agregar un nuevo módulo (receta)

1. Dominio: entidad + contrato de repositorio.
2. Aplicación: caso de uso.
3. Infraestructura: datasource + `RepositoryImpl`.
4. Web: controlador + ruta (Node: `*.routes.ts` y `AppRoutes`; Spring: `@Bean` en `AppConfig` y controlador).
5. Swagger: esquema y operación.
6. Angular: modelo, contrato, caso de uso, 3 implementaciones, `DataService`, tabla, página, ruta, navbar y provider.
