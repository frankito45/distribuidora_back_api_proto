import { RolUsuario } from "@prisma/client"

export interface createUserDto{
  nombre:  string;
  email  :   string;   
  password:  string;
  rol: "ADMIN" | "EMPLEADO"
}