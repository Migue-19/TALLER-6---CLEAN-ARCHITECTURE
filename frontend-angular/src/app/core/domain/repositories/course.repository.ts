import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

/**
 * Contrato del repositorio de cursos.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `Course` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, Node.js, Spring Boot, datos locales).
 *
 * Se usa como **token de inyección**: en `app.config.ts` se decide
 * qué implementación concreta se provee.
 *
 * @see {@link Course}
 */
export abstract class CourseRepository {

  /**
   * Obtiene un listado de cursos.
   *
   * @param countCourses - Cantidad de cursos a obtener
   * @returns Observable que emite un arreglo de {@link Course}
   */
  abstract getAll(countCourses: number): Observable<Course[]>;
}
