import prisma from "../../db/prisma";
import { createUserDto } from "../domain/dto/User-dto";
import { UserModel } from "../domain/usuario.repository";
import bcrypt from "bcrypt";



export class prismaUserRepository implements UserModel{
    
    
    async buscarEmail(email:string){

        return prisma.usuario.findUnique({

            where:{
                email
            }

        })

    }
    
    async createUser(data:createUserDto) {
        const existe = await prisma.usuario.findUnique({
            where: {
            email: data.email
            },
            
        });

        if (existe) {
            console.log("El administrador ya existe.");
            return;
        }

        const password = await bcrypt.hash(data.password, 10);

        await prisma.usuario.create({
            data: {
            nombre: data.nombre,
            email: data.email,
            password,
            rol: data.rol
            }
        });

        console.log("Administrador creado correctamente.");


    }





}