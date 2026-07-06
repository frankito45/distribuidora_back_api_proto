import { Router } from "express";
import {  getAllBarrio, getBarrioById, createBarrio, updateBarrio} from "../modules/interfaces/barrio.controller";


const router = Router()

router.get('/',getAllBarrio)
router.get('/:id',getBarrioById)
router.post('/',createBarrio)
router.patch('actualizar/:id',updateBarrio)

export default router;