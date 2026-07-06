import { Barrio, Barrio as modelBarrio} from "@prisma/client"

export interface BarrioRepository {
    getAll():Promise<modelBarrio[]>
    getId(id:number):Promise<any>
    create(data:any):Promise<modelBarrio>
    update(id:number ,data:any):Promise<modelBarrio>

}