import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProjectRoutes } from "../modules/projects/project.route";
import { ExperienceRoutes } from "../modules/experiences/experience.route";
import { PostRoutes } from "../modules/posts/post.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },  {
    path: "/experience",
    route: ExperienceRoutes,
  },{
    path: "/post",
    route: PostRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
