import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../domain/models/course.model';
import { CourseRepository } from '../../domain/repositories/course.repository';

/**
 * Caso de uso para obtener el listado de cursos.
 *
 * @description
 * Pertenece a la **capa de aplicación**. Orquesta la obtención de
 * cursos delegando en el contrato {@link CourseRepository}, sin conocer
 * si los datos vienen de un backend Node.js, Spring Boot o datos locales.
 *
 * Los componentes de presentación deben consumir **este caso de uso**
 * y nunca los servicios ni las APIs directamente.
 *
 * @example
 * ```ts
 * private getAllCoursesUseCase = inject(GetAllCoursesUseCase);
 * this.getAllCoursesUseCase.execute(10).subscribe(courses => ...);
 * ```
 */
@Injectable()
export class GetAllCoursesUseCase {

  private courseRepository = inject(CourseRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param countCourses - Cantidad de cursos a obtener
   * @returns Observable que emite un arreglo de {@link Course}
   */
  execute(countCourses: number): Observable<Course[]> {
    return this.courseRepository.getAll(countCourses);
  }
}
