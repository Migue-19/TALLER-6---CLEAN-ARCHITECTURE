import { faker } from '@faker-js/faker';
import { Course, CourseModality } from "../../domain/models/course.model";

/**
 * Datasource encargado de generar cursos simulados.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * una **fuente de datos (Datasource)**.
 *
 * Utiliza la librería {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información falsa de cursos.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Es consumida por `CourseRepositoryImpl`, que se encarga
 * de adaptar los datos al dominio y exponerlos mediante
 * el contrato `CourseRepository`.
 */
export class CourseDatasource {

    /**
     * Nombres de cursos disponibles para los cursos simulados.
     */
    private courseNames: string[] = [
        'Arquitectura de Software',
        'Bases de Datos',
        'Estructuras de Datos',
        'Ingenieria de Software',
        'Redes de Computadores',
        'Sistemas Operativos',
        'Calculo Diferencial',
        'Programacion Web',
    ];

    /**
     * Modalidades disponibles para los cursos simulados.
     *
     * @remarks
     * Se utiliza para asignar una modalidad aleatoria
     * a cada curso generado.
     */
    private modalities: CourseModality[] = [
        'Presencial',
        'Virtual',
        'Hibrido',
    ];

    /**
     * Obtiene una lista de cursos simulados.
     *
     * @remarks
     * Genera dinámicamente una cantidad determinada de cursos
     * utilizando datos aleatorios.
     *
     * @param countCourses - Cantidad de cursos a generar
     * @returns Promesa que resuelve un arreglo de {@link Course}
     *
     * @example
     * ```ts
     * const datasource = new CourseDatasource();
     * const courses = await datasource.getAll(10);
     * ```
     */
    async getAll(countCourses: number): Promise<Course[]> {
        const courses: Promise<Course>[] = [];

        for (let i = 1; i <= countCourses; i++) {
            courses.push(this.generateCourse(i));
        }

        return Promise.all(courses);
    }

    /**
     * Genera un curso individual con datos simulados.
     *
     * @remarks
     * Este método es interno y no debe ser utilizado
     * fuera del datasource.
     *
     * @param id - Identificador único del curso
     * @returns Promesa que resuelve un {@link Course}
     */
    private generateCourse(id: number): Promise<Course> {
        return Promise.resolve({
            id,
            name: faker.helpers.arrayElement(this.courseNames),
            teacher: faker.person.fullName(),
            credits: faker.number.int({ min: 1, max: 5 }),
            modality: faker.helpers.arrayElement(this.modalities),
        });
    }

}
