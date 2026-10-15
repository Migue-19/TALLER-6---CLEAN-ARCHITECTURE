package uceva.cleanarchitecture.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuración de la documentación Swagger/OpenAPI (springdoc).
 *
 * <p>La interfaz queda disponible en {@code /api/swagger-ui/index.html}
 * y el JSON de la especificación en {@code /api/v3/api-docs}.</p>
 */
@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI openAPI() {
        return new OpenAPI().info(new Info()
                .title("API Client Server SpringBoot")
                .version("1.0.0")
                .description("Documentación de la API con Swagger"));
    }
}
