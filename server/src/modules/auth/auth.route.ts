import { Router } from "express";
import { AuthControllers } from "./auth.controller";


const router = Router();

router.post('/admin-login', AuthControllers.credentialLogin)
router.post('/logout', AuthControllers.logout)


export const AuthRoutes = router;