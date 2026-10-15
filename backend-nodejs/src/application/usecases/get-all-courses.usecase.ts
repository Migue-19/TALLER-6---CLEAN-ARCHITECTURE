import { Course } from "../../domain/models/course.model";
import { CourseRepository } from "../../domain/repositories/course.repository";

/**
 * Caso de uso para obtener un listado de cursos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application**
 * y representa una **regla de negocio de la aplicación**.
 *
 * Su responsabilidad es:
 * - Orquestar la obtención de cursos
 * - Coordinar la interacción con el repositorio
 *
 * ❗ No conoce detalles de infraestructura.
 * ❗ No depende de implementaciones concretas.
 *
 * Depende únicamente del contrato
 * {@link CourseRepository} definido en el dominio.
 *
 * @see {@link CourseRepository}
 * @see {@link Course}
 */
export class GetAllCoursesUseCase {

  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param courseRepository - Repositorio de cursos
   * utilizado para acceder a los datos
   */
  constructor(private courseRepository: CourseRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @remarks
   * Obtiene una cantidad determinada de cursos
   * delegando el acceso a datos al repositorio.
   *
   * @param countCourses - Cantidad de cursos a obtener
   * @returns Promesa que resuelve un arreglo de {@link Course}
   *
   * @example
   * ```ts
   * const useCase = new GetAllCoursesUseCase(courseRepository);
   * const courses = await useCase.execute(10);
   * ```
   */
  execute(countCourses: number): Promise<Course[]> {
    return this.courseRepository.getAll(countCourses);
  }
}
