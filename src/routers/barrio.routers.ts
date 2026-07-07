import { Router } from "express";
import {  getAllBarrio, getBarrioById, createBarrio, updateBarrio, eliminarBarrio} from "../modules/interfaces/barrio.controller";


const router = Router()

router.get('/',getAllBarrio)
router.get('/:id',getBarrioById)
router.post('/',createBarrio)
router.patch('actualizar/:id',updateBarrio)
router.delete('/delete/:id',eliminarBarrio)

export default router;