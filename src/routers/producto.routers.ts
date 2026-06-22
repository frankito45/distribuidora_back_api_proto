import { Router } from 'express';
import { getProductos, createProducto, getProductoById,deleteProducto,updateProducto, increment, buscarProducto } from '../modules/interfaces/producto.controller';;

const router = Router();

router.get('/', getProductos);
router.get('/search', buscarProducto);
router.get('/:id', getProductoById);
router.patch('/:id', updateProducto);
router.post('/', createProducto);
router.patch('/increment/:id', increment);
router.delete('/:id', deleteProducto);


export default router;