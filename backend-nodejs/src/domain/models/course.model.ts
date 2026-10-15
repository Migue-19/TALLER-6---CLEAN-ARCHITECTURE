/**
 * Interfaz que representa un curso académico.
 *
 * Contiene la información básica necesaria para mostrar un curso
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada curso debe tener un `id` único, un `name` descriptivo,
 * un `teacher` responsable, un número de `credits` y una
 * `modality` válida.
 *
 * @example
 * ```ts
 * const curso: Course = {
 *   id: 1,
 *   name: 'Arquitectura de Software',
 *   teacher: 'Jesus David Mejia',
 *   credits: 3,
 *   modality: 'Presencial'
 * };
 * ```
 */
export interface Course {
    /** Identificador único del curso */
    id: number;

    /** Nombre del curso */
    name: string;

    /** Nombre completo del docente que dicta el curso */
    teacher: string;

    /** Número de créditos académicos del curso */
    credits: number;

    /** Modalidad en la que se dicta el curso */
    modality: CourseModality;
}

/**
 * Tipo de modalidad de un curso.
 *
 * @remarks
 * Este tipo restringe las modalidades a los valores predefinidos:
 * - 'Presencial'
 * - 'Virtual'
 * - 'Hibrido'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const modalidad: CourseModality = 'Virtual';
 * ```
 */
export type CourseModality = 'Presencial' | 'Virtual' | 'Hibrido';
