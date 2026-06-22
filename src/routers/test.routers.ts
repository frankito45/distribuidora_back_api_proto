import { Router } from 'express';
import prisma from '../db/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const result = await prisma.producto.findMany();
  
  res.json(result);
});


router.get('/stock/producto', async (req, res) => {
  
  const result = await prisma.producto.findMany();
  
  res.json(result);
})
router.get('/stock/producto/categoria', async (req, res) => {
  const result = await prisma.producto.findMany();
  
  res.json(result);
})


router.post('/create/product', async (req, res) => {
  const data = req.body
  const result = await prisma.producto.create({data}) 
})

router.post('/create/client', async (req, res) => {


  try{

    console.log(req.body);

    const data = req.body
    const result = await prisma.cliente.create({data})

    res.status(201).json(result)

  }
  catch(error){
    res.status(500).json({
      message: 'Error creando producto',
      error
    });
  }

})


// export default router;