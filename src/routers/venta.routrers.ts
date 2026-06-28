import { Router } from "express";
import { getVentas, getVentaById, createVenta, agregarProductos, cambiarEstado, countPendiente  } from "../modules/interfaces/venta.controller";


const router = Router()

router.get('',getVentas)

router.get('/estado/count',countPendiente)

router.get('/:id',getVentaById)
router.post('',createVenta)
router.patch(
    "/:id/productos",
    agregarProductos
);

router.patch(
    "/:id/estado",
    cambiarEstado
);


export default router