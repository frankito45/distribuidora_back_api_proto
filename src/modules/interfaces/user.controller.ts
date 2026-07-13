import { Request, Response } from "express";
import { prismaUserRepository } from "../infrastruture/prisma-usuario-repository";
import { UserService } from "../applitacation/user.service";

const repository = new prismaUserRepository()
const service = new UserService(repository)


export const login = async (req: Request, res: Response) => {
  console.log("Entró al login");

  try {
    const result = await service.buscarEmail(req.body);
    return res.json(result);

  } catch (error: any) {
    console.log(error);

    return res.status(401).json({
      message: error.message
    });
  }
}

export const crearUser = async(
    req:Request,
    res:Response
) => {

    try {
        console.log(req.body)
        const result = await service.createUser(req.body);
        return result

        
    } catch (error:any) {
        return res.status(401).json({
            message: error.message
        })
    }
}