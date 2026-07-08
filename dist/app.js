"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import testRoutes from './routers/test.routers';
const clientes_routers_1 = __importDefault(require("./routers/clientes.routers"));
const producto_routers_1 = __importDefault(require("./routers/producto.routers"));
const categoria_routers_1 = __importDefault(require("./routers/categoria.routers"));
const venta_routrers_1 = __importDefault(require("./routers/venta.routrers"));
const pago_routers_1 = __importDefault(require("./routers/pago.routers"));
const barrio_routers_1 = __importDefault(require("./routers/barrio.routers"));
const app = (0, express_1.default)();
const whitelist = ['http://localhost:4200', 'https://midominio.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // métodos permitidos
    credentials: true // si necesitas cookies o headers de autorización
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use('/test', testRoutes); 
app.use('/clientes', clientes_routers_1.default);
app.use('/productos', producto_routers_1.default);
app.use('/categoria', categoria_routers_1.default);
app.use('/venta', venta_routrers_1.default);
app.use('/pago', pago_routers_1.default);
app.use('/barrio', barrio_routers_1.default);
exports.default = app;
