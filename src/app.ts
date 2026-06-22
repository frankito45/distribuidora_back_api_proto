import express from 'express';
import cors from 'cors';
// import testRoutes from './routers/test.routers';
import clienteRoutes from './routers/clientes.routers' ;
import productoRoutes from './routers/producto.routers' ;
import categoriaRouter from './routers/categoria.routers'
import ventasRouter from './routers/venta.routrers'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/test', testRoutes); 
app.use('/clientes', clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/categoria',categoriaRouter)
app.use('/venta',ventasRouter)
  
export default app;