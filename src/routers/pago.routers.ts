import { Router } from "express";
import { pagar } from "../modules/interfaces/pago.controller";


const router = Router()

router.post('/:id',pagar)

export default router;