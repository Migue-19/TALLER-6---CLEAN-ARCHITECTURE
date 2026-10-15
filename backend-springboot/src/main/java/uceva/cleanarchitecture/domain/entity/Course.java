package uceva.cleanarchitecture.domain.entity;

/**
 * Entidad de dominio que representa un curso académico.
 *
 * <p>Pertenece a la capa de <b>Domain</b>: no conoce frameworks ni
 * detalles de infraestructura. Su estructura JSON debe coincidir con el
 * contrato que consume Angular (y que también expone el backend Node.js):
 * {@code id, name, teacher, credits, modality}.</p>
 *
 * <p>Valores válidos de {@code modality}: {@code Presencial}, {@code Virtual}, {@code Hibrido}.</p>
 */
public class Course {
    public Integer id;
    public String name;
    public String teacher;
    public Integer credits;
    public String modality;

    public Course(Integer id, String name, String teacher, Integer credits, String modality) {
        this.id = id;
        this.name = name;
        this.teacher = teacher;
        this.credits = credits;
        this.modality = modality;
    }
}
