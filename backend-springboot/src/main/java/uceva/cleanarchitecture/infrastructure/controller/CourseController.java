package uceva.cleanarchitecture.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import uceva.cleanarchitecture.application.usecase.GetAllCoursesUseCase;
import uceva.cleanarchitecture.domain.entity.Course;

import java.util.List;

@RestController
@RequestMapping("/courses")
@Tag(name = "Courses", description = "Operaciones sobre cursos")
public class CourseController {

    private final GetAllCoursesUseCase getAllCoursesUseCase;

    public CourseController(GetAllCoursesUseCase getAllCoursesUseCase){
        this.getAllCoursesUseCase = getAllCoursesUseCase;
    }

    @Operation(
            summary = "Obtener listado de cursos",
            description = "Retorna una lista de cursos generados dinámicamente según la cantidad solicitada."
    )
    @GetMapping("/{countCourses}")
    public List<Course> getAll(
            @Parameter(description = "Cantidad de cursos a generar", example = "10")
            @PathVariable int countCourses) {
        if (countCourses < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "countCourses debe ser un entero positivo");
        }
        return getAllCoursesUseCase.execute(countCourses);
    }
}
