import prisma from "../../db/prisma"
import { createUserDto } from "./dto/User-dto"

export interface UserModel{

    buscarEmail(email:string ): Promise<any> 

    createUser(data:createUserDto): Promise<any>
}