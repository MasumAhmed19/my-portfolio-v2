import { Router } from "express";
import { ProjectController } from "./project.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router()

router.post('/', checkAuth(Role.ADMIN), ProjectController.createProject)
router.get('/', ProjectController.allProjects)
router.get('/:slug', ProjectController.getSingleProject)

router.patch('/:slug', checkAuth(Role.ADMIN), ProjectController.updateProject)
router.delete('/:slug', checkAuth(Role.ADMIN), ProjectController.deleteProject)





export const ProjectRoutes = router