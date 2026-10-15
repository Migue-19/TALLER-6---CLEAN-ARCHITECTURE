import { Course } from "../models/course.model";

/**
 * Contrato del repositorio de cursos.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de Domain**
 * y define el contrato que deben cumplir todas las
 * implementaciones de repositorios de cursos.
 *
 * El dominio:
 * - NO conoce detalles de infraestructura
 * - NO sabe de bases de datos, APIs o frameworks
 *
 * Cualquier fuente de datos (API, base de datos, mocks,
 * archivos, etc.) puede ser utilizada siempre que
 * implemente este contrato.
 *
 * Los casos de uso dependen de esta abstracción,
 * no de implementaciones concretas.
 *
 * @see {@link Course}
 */
export abstract class CourseRepository {
  /**
   * Obtiene un listado de cursos.
   *
   * @remarks
   * Este método define una **operación de negocio**
   * relacionada con la obtención de cursos,
   * sin especificar cómo ni desde dónde se obtienen.
   *
   * @param countCourses - Cantidad de cursos a obtener
   * @returns Promesa que resuelve un arreglo de {@link Course}
   */
  abstract getAll(countCourses: number): Promise<Course[]>;
}
