package uceva.cleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.cleanarchitecture.domain.entity.Course;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Fuente de datos (capa Infrastructure) que genera cursos simulados con Faker.
 */
public class CourseDatasource {

    private final Faker faker = new Faker();
    private final Random random = new Random();
    private final String[] courseNames = {
            "Arquitectura de Software",
            "Bases de Datos",
            "Estructuras de Datos",
            "Ingenieria de Software",
            "Redes de Computadores",
            "Sistemas Operativos",
            "Calculo Diferencial",
            "Programacion Web"
    };
    private final String[] modalities = {
            "Presencial",
            "Virtual",
            "Hibrido"
    };

    public List<Course> getAll(int countCourses){
        List<Course> courses = new ArrayList<Course>();
        for (int i = 1; i <= countCourses; i++) {
            courses.add(generateCourse(i));
        }
        return courses;
    }

    private Course generateCourse(Integer id){
        return new Course(
                id,
                courseNames[random.nextInt(courseNames.length)],
                faker.name().fullName(),
                faker.number().numberBetween(1, 6),
                modalities[random.nextInt(modalities.length)]
        );
    }
}
