"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaService = void 0;
class VentaService {
    constructor(ventaRepository, productoRepository, clienteRepository) {
        this.ventaRepository = ventaRepository;
        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository;
    }
    async getVentas() {
        return this.ventaRepository.getAll();
    }
    async getVentaId(id) {
        const venta = await this.ventaRepository.getId(id);
        if (!venta) {
            throw new Error('venta no encontrado');
        }
        return venta;
    }
    async createVenta(data) {
        const cliente = await this.clienteRepository.getId(data.clienteId);
        if (!cliente) {
            throw new Error("cliente inexistente");
        }
        return this.ventaRepository.create({
            clienteId: data.clienteId,
            total: 0,
            estado: "PENDIENTE",
            detalles: []
        });
    }
    async cambiarEstado(id, estado) {
        const venta = await this.ventaRepository.getId(id);
        if (!venta) {
            throw new Error("venta no encontrado");
        }
        if (venta.estado !== "PENDIENTE") {
            throw new Error("Solo pueden modificarse ventas pendientes");
        }
        if (estado === "CANCELADA") {
            for (const detalle of venta.detalles) {
                await this.productoRepository.increment(detalle.productoId, detalle.cantidad);
            }
        }
        return this.ventaRepository.update(id, { estado });
    }
    async agregarProducto(ventaId, detalles) {
        const venta = await this.ventaRepository.getId(ventaId);
        if (!venta) {
            throw new Error("venta no encontrado");
        }
        if (venta.estado !== "PENDIENTE") {
            throw new Error("Solo se pueden modificar ventas pendientes");
        }
        const producto = await this.productoRepository.getId(detalles.producto);
        if (!producto) {
            throw new Error("producto no encontrado");
        }
        if (detalles.cantidad <= 0) {
            throw new Error("la cantidad debe ser mayor a cero");
        }
        // Validar stock disponible
        if (producto.stock < detalles.cantidad) {
            throw new Error(`Stock insuficiente. Disponible: ${producto.stock}`);
        }
        // 
        const detalleExistente = venta.detalles.find(d => d.productoId === producto.id);
        if (detalleExistente) {
            // 4A. actualizar cantidad
            await this.ventaRepository.actualizarDetalleCantidad(detalleExistente.id, detalleExistente.cantidad + detalles.cantidad, producto.precioVenta);
        }
        else {
            // 4B. crear nuevo detalle
            await this.ventaRepository.agregarDetalles(ventaId, {
                productoId: producto.id,
                cantidad: detalles.cantidad,
                precio: producto.precioVenta,
                subtotal: producto.precioVenta * detalles.cantidad
            });
        }
        // Reservar stock inmediatamente
        await this.productoRepository.decrement(producto.id, detalles.cantidad);
        await this.ventaRepository.recalcularTotal(ventaId);
        return await this.ventaRepository.getId(ventaId);
    }
    async deleteVenta(id) {
        const venta = await this.ventaRepository.getId(id);
        if (!venta) {
            throw new Error('venta no encontrada');
        }
        return await this.ventaRepository.delete(id);
    }
}
exports.VentaService = VentaService;
