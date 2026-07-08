import { Router } from "express";
import { getVentas, getVentaById, createVenta, agregarProductos, cambiarEstado, countPendiente, getDay, getFilterPendiente, desAgregarProducto  } from "../modules/interfaces/venta.controller";


const router = Router()

router.get('',getVentas)

router.get('/estado/count',countPendiente)

router.get('/registro/pendiente',getFilterPendiente)
router.get('/registro/historial',getDay)



router.get('/:id',getVentaById)
router.post('',createVenta)


router.patch(
    "/:id/productos",
    agregarProductos
);

router.delete("/venta/:ventaId/producto/:productoId", desAgregarProducto);


router.patch(
    "/:id/estado",
    cambiarEstado
);


router.get('/resument/venta')



export default router