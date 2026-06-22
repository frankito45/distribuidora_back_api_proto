import { Router } from 'express';
import { getCategoria,crearCategoria,getCategoriaId,updataCategoria,deleteCategoria } from '../modules/interfaces/categoria.controller';;

const router = Router();

router.get('/', getCategoria);
router.post('/', crearCategoria);
router.get('/:id', getCategoriaId);
router.put('/:id', updataCategoria);
router.delete('/:id', deleteCategoria);

export default router;