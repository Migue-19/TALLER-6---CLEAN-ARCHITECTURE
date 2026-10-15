package uceva.cleanarchitecture.domain.repository;

import uceva.cleanarchitecture.domain.entity.Course;

import java.util.List;

/**
 * Contrato del repositorio de cursos (capa Domain).
 *
 * <p>Define la operación de negocio sin especificar de dónde provienen los
 * datos. Los casos de uso dependen de esta abstracción y no de su
 * implementación concreta.</p>
 */
public abstract class CourseRepository {
    public abstract List<Course> getAll(int countCourses);
}
