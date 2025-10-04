import { Router } from "express";
import { ExperienceController } from "./experience.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/", checkAuth(Role.ADMIN), ExperienceController.createExperience);
router.get("/", ExperienceController.allExperiences);

router.patch("/:id", checkAuth(Role.ADMIN), ExperienceController.updateExperience);
router.delete("/:id", checkAuth(Role.ADMIN), ExperienceController.deleteExperience);

export const ExperienceRoutes = router;
