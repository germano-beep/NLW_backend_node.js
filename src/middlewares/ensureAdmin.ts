import { Request, Response, NextFunction } from "express";


export function ensureAdmin(request: Request, response: Response, next: NextFunction){
    // verificar se usuário é admin

    const admin = true;

    // se for adm segue o fluxo
    if(admin){
        return next();
    }

    // caso não for adm
    return response.status(401).json({
        error: "Unauthorized",
    }); 

}