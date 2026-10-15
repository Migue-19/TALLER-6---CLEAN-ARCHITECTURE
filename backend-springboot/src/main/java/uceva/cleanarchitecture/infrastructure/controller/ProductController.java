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
import uceva.cleanarchitecture.application.usecase.GetAllProductsUseCase;
import uceva.cleanarchitecture.domain.entity.Product;

import java.util.List;

@RestController
@RequestMapping("/products")
@Tag(name = "Products", description = "Operaciones sobre productos")
public class ProductController {

    private final GetAllProductsUseCase getAllProductsUseCase;

    public ProductController(GetAllProductsUseCase getAllProductsUseCase){
        this.getAllProductsUseCase = getAllProductsUseCase;
    }

    @Operation(
            summary = "Obtener listado de productos",
            description = "Retorna una lista de productos generados dinámicamente según la cantidad solicitada."
    )
    @GetMapping("/{countProducts}")
    public List<Product> getAll(
            @Parameter(description = "Cantidad de productos a generar", example = "10")
            @PathVariable int countProducts) {
        if (countProducts < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "countProducts debe ser un entero positivo");
        }
        return getAllProductsUseCase.execute(countProducts);
    }

}
