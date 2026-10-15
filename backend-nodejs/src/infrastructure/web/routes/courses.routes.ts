import { Router } from "express";
import { CourseDatasource } from "../../datasources/course.datasource";
import { CourseRepositoryImpl } from "../../repositories/course.repository.impl";
import { GetAllCoursesUseCase } from "../../../application/usecases/get-all-courses.usecase";
import { CoursesController } from "../controllers/courses.controller";

/**
 * Rutas del módulo de cursos.
 *
 * @remarks
 * Actúa como **raíz de composición** del módulo: aquí se
 * inyectan las dependencias de afuera hacia adentro
 * (datasource → repositorio → caso de uso → controlador).
 */
export class CoursesRoutes {
  static get routes(): Router {
    const router = Router();
    const repository = new CourseRepositoryImpl(new CourseDatasource());
    const getAllCourses = new GetAllCoursesUseCase(repository);
    const controller = new CoursesController(getAllCourses);

    /**
     * @openapi
     * /api/courses/{countCourses}:
     *   get:
     *     summary: Obtener listado de cursos
     *     description: Retorna una lista de cursos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Courses
     *     parameters:
     *       - in: path
     *         name: countCourses
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de cursos a generar
     *     responses:
     *       200:
     *         description: Lista de cursos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Course'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countCourses", controller.getAllCourses);

    return router;
  }
}
