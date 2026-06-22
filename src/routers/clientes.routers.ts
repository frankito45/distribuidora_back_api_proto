import { Router } from 'express';
import { getClientes,createCliente,updateCliente, deleteCliente, getClienteById, } from '../modules/interfaces/cliente.controller';;

const router = Router();

router.get('/', getClientes);
router.post('/', createCliente);
router.get('/:id', getClienteById);
router.patch('/actualizar/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;