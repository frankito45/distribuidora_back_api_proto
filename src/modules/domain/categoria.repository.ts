export interface CategoriaRepository{
    
    getAll():Promise<any>

    getId(id:number):Promise<any>

    create(data: any): Promise<any>

    update(id: number,data: any):Promise<any>
    
    delete(id: number):Promise<any>
}