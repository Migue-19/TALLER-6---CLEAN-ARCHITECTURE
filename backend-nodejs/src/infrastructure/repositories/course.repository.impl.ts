import { Course } from "../../domain/models/course.model";
import { CourseRepository } from "../../domain/repositories/course.repository";
import { CourseDatasource } from "../datasources/course.datasource";

/**
 * Implementación concreta del repositorio de cursos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * un **adaptador (Repository Implementation)** entre:
 *
 * - El contrato del dominio {@link CourseRepository}
 * - La fuente de datos {@link CourseDatasource}
 *
 * Su responsabilidad es:
 * - Cumplir el contrato definido por el dominio
 * - Delegar la obtención de datos al datasource
 * - Adaptar o transformar los datos si fuese necesario
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser utilizada directamente por los casos de uso.
 *
 * @see {@link CourseRepository}
 * @see {@link CourseDatasource}
 */
export class CourseRepositoryImpl extends CourseRepository {

  /**
   * Crea una nueva instancia del repositorio de cursos.
   *
   * @param datasource - Fuente de datos utilizada para
   * obtener la información de cursos
   */
  constructor(private datasource: CourseDatasource) {
    super();
  }

  /**
   * Obtiene el listado de cursos.
   *
   * @remarks
   * Implementa el método definido en
   * {@link CourseRepository#getAll}.
   *
   * @param countCourses - Cantidad de cursos a obtener
   * @returns Promesa que resuelve un arreglo de {@link Course}
   *
   * @example
   * ```ts
   * const repository = new CourseRepositoryImpl(new CourseDatasource());
   * const courses = await repository.getAll(10);
   * ```
   */
  getAll(countCourses: number): Promise<Course[]> {
    return this.datasource.getAll(countCourses);
  }
}
