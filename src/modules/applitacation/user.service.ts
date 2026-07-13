    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken";
    import { UserModel } from "../domain/usuario.repository";
    import { LoginDto } from "../domain/dto/login-dto";
    import { createUserDto } from "../domain/dto/User-dto";


    export class UserService{
        constructor(
            private repository: UserModel
        ){}

        async createUser(dto:createUserDto){
            return await this.repository.createUser(dto)
        }

        async buscarEmail(dto:LoginDto){
        
            const usuario = await this.repository.buscarEmail(dto.email);
        
            if(!usuario){
        
                throw new Error("Usuario incorrecto");
        
            }
        
            const ok = await bcrypt.compare(dto.password,usuario.password);
        
            if(!ok){
        
                throw new Error("Contraseña incorrecta");
        
            }
            console.log(process.env.JWT_SECRET);
            const token = jwt.sign({
        
                id:usuario.id,
                rol:usuario.rol
        
            },process.env.JWT_SECRET!,{
        
                expiresIn:"8h"
        
            });
        
            return{
        
                token,
        
                usuario:{
        
                    id:usuario.id,
                    nombre:usuario.nombre,
                    rol:usuario.rol
        
                }
        
            };
        
        }
    }