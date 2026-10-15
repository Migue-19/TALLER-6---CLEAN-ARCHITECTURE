import { Component, inject } from '@angular/core';
import { GetAllCoursesUseCase } from '../../../core/application/usecases/get-all-courses.usecase';
import { Course } from '../../../core/domain/models/course.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Página del módulo de cursos.
 *
 * @description
 * Pertenece a la **capa de presentación**. Obtiene los cursos a través del
 * caso de uso {@link GetAllCoursesUseCase} (nunca desde servicios o APIs
 * directamente) y maneja los estados de la vista: cargando, éxito y error.
 */
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  imports: [CoursesTableComponent, AlertComponent],
  providers: [GetAllCoursesUseCase]
})
export class CoursesPage {

  /** Cursos obtenidos desde el backend */
  courses: Course[] = [];

  /** Estado actual de la vista */
  state: State = 'init';

  private getAllCoursesUseCase = inject(GetAllCoursesUseCase);

  /**
   * Hook de inicialización: solicita los cursos y actualiza el estado.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllCoursesUseCase.execute(10).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    })
  }
}
