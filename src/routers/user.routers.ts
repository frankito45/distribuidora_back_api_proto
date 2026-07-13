import { Router } from "express";
import { login , crearUser} from "../modules/interfaces/user.controller";

const router = Router();

router.post("/login", login);
router.post("/create/user", crearUser);

export default router;