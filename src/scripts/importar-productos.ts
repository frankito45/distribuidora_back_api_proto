// import * as XLSX from "xlsx";
// import path from "path";
// import prisma from "../db/prisma";
// import "dotenv/config";

// interface ProductoExcel {
//   Categoria?: string;
//   Nombre: string;
//   Stock: number;
//   Precio: number;
// }

// async function importarProductos() {
//   try {
//     const filePath = path.join(
//       process.cwd(),
//       "src",
//       "scripts",
//       "stock_categorias.xlsx"
//     );

//     console.log("Leyendo archivo:", filePath);

//     const workbook = XLSX.readFile(filePath);

//     const sheet = workbook.Sheets[workbook.SheetNames[0]];

//     const filas = XLSX.utils.sheet_to_json<ProductoExcel>(sheet);

//     console.log(`Productos encontrados: ${filas.length}`);


//     for (const fila of filas) {

//       const nombreProducto = String(fila.Nombre).trim();

//       const nombreCategoria =
//         fila.Categoria && String(fila.Categoria).trim()
//           ? String(fila.Categoria).trim()
//           : "Otro";


//       const stock = Number(fila.Stock) || 0;

//       const precioVenta = Number(
//         String(fila.Precio).replace(",", ".")
//       ) || 0;


//       // Crear o buscar categoría
//       let categoria = await prisma.categoria.findFirst({
//         where: {
//           nombre: nombreCategoria
//         }
//       });


//       if (!categoria) {

//         categoria = await prisma.categoria.create({
//           data:{
//             nombre: nombreCategoria
//           }
//         });

//         console.log(`Categoría creada: ${nombreCategoria}`);
//       }


//       // Buscar producto existente
//       const productoExiste = await prisma.producto.findFirst({
//         where:{
//           nombre: nombreProducto
//         }
//       });


//       if(productoExiste){

//         await prisma.producto.update({
//           where:{
//             id: productoExiste.id
//           },
//           data:{
//             categoriaId: categoria.id,
//             stock,
//             precioVenta
//           }
//         });


//         console.log(`Actualizado: ${nombreProducto}`);

//       }else{


//         await prisma.producto.create({
//           data:{
//             nombre: nombreProducto,
//             categoriaId: categoria.id,
//             stock,
//             precioCompra: 0,
//             precioVenta,
//             descripcion: "",
//           }
//         });


//         console.log(`Creado: ${nombreProducto}`);
//       }

//     }


//     console.log("✅ Importación finalizada correctamente");


//   } catch(error){

//     console.error("❌ Error importando productos:");
//     console.error(error);


//   } finally {

//     await prisma.$disconnect();

//   }
// }


// importarProductos();