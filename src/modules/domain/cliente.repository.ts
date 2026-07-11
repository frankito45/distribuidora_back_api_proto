import { Cliente } from "@prisma/client";

export interface ClienteRepository {
    getAll(): Promise<any[]>;

    getFilterBarrio(params:any): Promise<any[]>

    getId(id:number): Promise<Cliente>

    create(data:any): Promise<any>
    
    update(id:number,data:any): Promise<any>

    delete(id:number): Promise<any>
}