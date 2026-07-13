import express from 'express';
import cors, { CorsOptions } from 'cors';
// import testRoutes from './routers/test.routers';
import clienteRoutes from './routers/clientes.routers' ;
import productoRoutes from './routers/producto.routers' ;
import categoriaRouter from './routers/categoria.routers'
import ventasRouter from './routers/venta.routrers'
import pagoRouter from './routers/pago.routers'
import barrioRouter from './routers/barrio.routers'
import userRouter from './routers/user.routers'
import { auth } from './modules/middleware/auth.middleware';
const app = express();
const whitelist = ['http://localhost:4200', 'https://midominio.com'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // métodos permitidos
  credentials: true // si necesitas cookies o headers de autorización
};



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/test', testRoutes); 

app.use("/auth", userRouter);
app.use('/clientes', auth,clienteRoutes);
app.use('/productos',auth, productoRoutes);
app.use('/categoria',auth ,categoriaRouter)
app.use('/venta',auth, ventasRouter)
app.use('/pago',auth, pagoRouter)
app.use('/barrio',auth, barrioRouter)
  
export default app;