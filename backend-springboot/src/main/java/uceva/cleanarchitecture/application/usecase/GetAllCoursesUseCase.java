package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Course;
import uceva.cleanarchitecture.domain.repository.CourseRepository;

import java.util.List;

/**
 * Caso de uso (capa Application) para obtener un listado de cursos.
 *
 * <p>Depende únicamente del contrato {@link CourseRepository}, nunca de una
 * implementación concreta.</p>
 */
public class GetAllCoursesUseCase {
    private final CourseRepository courseRepository;

    public GetAllCoursesUseCase(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    public List<Course> execute(int countCourses){
        return courseRepository.getAll(countCourses);
    }
}
