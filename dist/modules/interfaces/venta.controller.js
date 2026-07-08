"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descuento = exports.desAgregarProducto = exports.agregarProductos = exports.cambiarEstado = exports.createVenta = exports.getVentaById = exports.countPendiente = exports.getFilterPendiente = exports.getDay = exports.getVentas = void 0;
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
        const skip = parseInt(req.query.skip) || 0;
        const take = parseInt(req.query.take) || 10;
        const params = { skip: skip, take: take };
        const result = await service.getVentas(params);
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.getVentas = getVentas;
const getDay = async (req, res) => {
    try {
        const { day } = req.query; // se espera ?day=2026-06-28
        if (!day) {
            return res.status(400).json({ message: "La fecha no puede ser vacía" });
        }
        // convertir string a Date
        const fecha = new Date(day);
        const ventas = await service.filterFecha(fecha);
        return res.json({ ventas });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getDay = getDay;
const getFilterPendiente = async (req, res) => {
    try {
        const result = await service.getVentasPendientes();
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.getFilterPendiente = getFilterPendiente;
const countPendiente = async (req, res) => {
    try {
        const result = await service.getcountEstado();
        return res.json({ result });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
exports.countPendiente = countPendiente;
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
    try {
        const data = req.body;
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
        const estado = req.body.estado;
        const metodoPago = req.body.metodoPago;
        const result = await service.cambiarEstado(id, estado, metodoPago);
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
const desAgregarProducto = async (req, res) => {
    try {
        const ventaId = Number(req.params.ventaId);
        const productoId = Number(req.params.productoId);
        if (isNaN(ventaId))
            throw new Error("VentaId no puede ser nulo");
        if (isNaN(productoId))
            throw new Error("ProductoId no puede ser nulo");
        const result = await service.desAgregarProducto(ventaId, productoId);
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.desAgregarProducto = desAgregarProducto;
const descuento = async (req, res) => {
    try {
        const ventaId = Number(req.params.id);
        const oferta = req.body;
        if (isNaN(ventaId)) {
            throw new Error("no se a encontrado la venta");
        }
        if (!oferta) {
            throw new Error("oferta no puede estar vacio");
        }
        const result = await service.agregarOferta(ventaId, oferta);
        return res.json(result);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
exports.descuento = descuento;
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
