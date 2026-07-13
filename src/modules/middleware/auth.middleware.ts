import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function auth(
  req: any,
  res: Response,
  next: NextFunction
) {

  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    req.user = payload;

    next();

  } catch {

    return res.sendStatus(401);

  }


  

}

export function authorize(...roles: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.sendStatus(401);
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        message: "No tienes permisos para realizar esta acción",
      });
    }

    next();
  };
}