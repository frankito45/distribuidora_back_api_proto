"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../db/prisma"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const result = await prisma_1.default.producto.findMany();
    res.json(result);
});
router.get('/stock/producto', async (req, res) => {
    const result = await prisma_1.default.producto.findMany();
    res.json(result);
});
router.get('/stock/producto/categoria', async (req, res) => {
    const result = await prisma_1.default.producto.findMany();
    res.json(result);
});
router.post('/create/product', async (req, res) => {
    const data = req.body;
    const result = await prisma_1.default.producto.create({ data });
});
router.post('/create/client', async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        const result = await prisma_1.default.cliente.create({ data });
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error creando producto',
            error
        });
    }
});
// export default router;
