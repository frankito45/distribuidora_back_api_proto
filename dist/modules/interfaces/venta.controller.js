"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarProductos = exports.cambiarEstado = exports.createVenta = exports.getVentaById = exports.getVentas = void 0;
const prisma_Venta_repository_1 = require("../infrastruture/prisma-Venta.repository");
const venta_service_1 = require("../applitacation/venta.service");
const prisma_Producto_repository_1 = require("../infrastruture/prisma-Producto.repository");
const prisma_Cliente_repository_1 = require("../infrastruture/prisma-Cliente.repository");
const repository = new prisma_Venta_repository_1.PrismaVentaRepository();
const productoRepository = new prisma_Producto_repository_1.PrismaProductoRepository();
const clienteRepository = new prisma_Cliente_repository_1.PrismaClientRepository();
const service = new venta_service_1.VentaService(repository, productoRepository, clienteRepository);
const getVentas = async (req, res) => {
    try {
        const result = await service.getVentas();
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.getVentas = getVentas;
const getVentaById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'id no valido'
            });
        }
        const result = await service.getVentaId(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.getVentaById = getVentaById;
const createVenta = async (req, res) => {
    const data = req.body;
    try {
        const result = await service.createVenta(data);
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.createVenta = createVenta;
const cambiarEstado = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new Error('id invalido');
        }
        const data = req.body;
        const result = await service.cambiarEstado(id, data);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.cambiarEstado = cambiarEstado;
const agregarProductos = async (req, res) => {
    try {
        const ventaId = Number(req.params.id);
        if (isNaN(ventaId)) {
            return res.status(400).json({
                message: "Id inválido"
            });
        }
        console.log('dentro de venta', req.body);
        const result = await service.agregarProducto(ventaId, req.body);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.agregarProductos = agregarProductos;
// export const deleteVenta = async(
//     req:Request,
//     res:Response
// ) => {
//     try{
//         const id = Number(req.params.id)
//         if (isNaN(id)) {
//             throw new Error("id invalido");
//         }
//         const result = await service.deleteVenta(id)
//         return res.json(result)
//     }catch(error:any){
//         return res.status(400).json({
//             message: error.message
//         })
//     }
// }
