import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";


const router = Router();

router.post('/admin-login', AuthControllers.credentialLogin)
router.post('/logout', AuthControllers.logout)

router.get('/me', checkAuth(Role.ADMIN), AuthControllers.getme)
router.patch('/update', checkAuth(Role.ADMIN), AuthControllers.updateMe)



export const AuthRoutes = router;