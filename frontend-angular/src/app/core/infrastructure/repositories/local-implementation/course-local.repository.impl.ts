import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseRepository } from "../../../domain/repositories/course.repository";
import { DataService } from "../../services/data.service";
import { Course } from "../../../domain/models/course.model";

/**
 * Implementación del repositorio de cursos que consume datos locales (Faker).
 *
 * @description
 * Pertenece a la **capa de infraestructura**: cumple el contrato
 * {@link CourseRepository} delegando en {@link DataService}.
 */
@Injectable()
export class CourseLocalRepositoryImpl extends CourseRepository {

    private dataService = inject(DataService);

    /**
     * Obtiene el listado de cursos.
     *
     * @param countCourses - Cantidad de cursos a obtener
     * @returns Observable que emite un arreglo de {@link Course}
     */
    getAll(countCourses: number): Observable<Course[]> {
        return this.dataService.getAllCoursesLocal(countCourses);
    }

}
