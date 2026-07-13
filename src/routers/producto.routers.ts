import { Router } from 'express';
import { getProductos, createProducto, getProductoById,deleteProducto,updateProducto, increment, buscarProducto, decrement } from '../modules/interfaces/producto.controller';import { auth, authorize } from '../modules/middleware/auth.middleware';
;

const router = Router();

router.get('/', getProductos);
router.get('/search', buscarProducto);
router.get('/:id', getProductoById);
router.patch('/:id',auth,authorize('ADMIN'), updateProducto);
router.post('/',auth, createProducto);
router.patch('/increment/:id',auth, increment);
router.patch('/decrement/:id',auth, decrement)
router.delete('/:id', auth, deleteProducto);


export default router;