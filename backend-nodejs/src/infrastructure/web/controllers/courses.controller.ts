import { Request, Response } from "express";
import { GetAllCoursesUseCase } from "../../../application/usecases/get-all-courses.usecase";
import { CustomError } from "../erros/custom.error";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con cursos.
 *
 * @remarks
 * Esta clase pertenece a la **capa más externa** de la aplicación
 * (*Frameworks & Drivers*), y su responsabilidad es:
 *
 * - Recibir solicitudes HTTP
 * - Extraer y validar parámetros de la request
 * - Delegar la lógica al caso de uso correspondiente
 * - Transformar la respuesta del caso de uso en una respuesta HTTP
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No accede directamente a repositorios ni datasources.
 *
 * Depende del caso de uso {@link GetAllCoursesUseCase}.
 */
export class CoursesController {

  /**
   * Crea una nueva instancia del controlador de cursos.
   *
   * @param getAllCoursesUseCase - Caso de uso encargado
   * de obtener el listado de cursos
   */
  constructor(private getAllCoursesUseCase: GetAllCoursesUseCase){}

  /**
   * Maneja la petición HTTP para obtener cursos.
   *
   * @remarks
   * Extrae el parámetro `countCourses` desde la URL, valida que sea
   * un entero positivo, ejecuta el caso de uso correspondiente y
   * devuelve la respuesta en formato JSON con código `200`.
   *
   * Si el parámetro no es válido responde con código `400`.
   *
   * Incluye un `setTimeout` únicamente con fines
   * demostrativos (simulación de latencia).
   *
   * Los errores son delegados al manejador centralizado
   * {@link HandleError}.
   *
   * @param req - Objeto Request de Express
   * @param res - Objeto Response de Express
   */
  getAllCourses = (req: Request, res: Response): void => {
    const countCourses = Number(req.params['countCourses']);

    if (!Number.isInteger(countCourses) || countCourses < 1) {
      HandleError.error(
        CustomError.badRequest('countCourses debe ser un entero positivo'),
        res
      );
      return;
    }

    setTimeout(() => {
      this.getAllCoursesUseCase
      .execute(countCourses)
      .then((courses) => res.status(200).json(courses))
      .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}
