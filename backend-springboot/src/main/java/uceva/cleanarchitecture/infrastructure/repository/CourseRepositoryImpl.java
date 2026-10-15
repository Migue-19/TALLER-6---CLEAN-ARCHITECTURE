package uceva.cleanarchitecture.infrastructure.repository;

import uceva.cleanarchitecture.domain.entity.Course;
import uceva.cleanarchitecture.domain.repository.CourseRepository;
import uceva.cleanarchitecture.infrastructure.datasource.CourseDatasource;

import java.util.List;

/**
 * Implementación concreta (capa Infrastructure) del contrato {@link CourseRepository}.
 * Adapta la fuente de datos {@link CourseDatasource} al dominio.
 */
public class CourseRepositoryImpl extends CourseRepository {

    private final CourseDatasource courseDatasource;

    public CourseRepositoryImpl(CourseDatasource courseDatasource){
        this.courseDatasource = courseDatasource;
    }

    @Override
    public List<Course> getAll(int countCourses) {
        return courseDatasource.getAll(countCourses);
    }
}
