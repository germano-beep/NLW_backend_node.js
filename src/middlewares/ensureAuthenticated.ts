import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


interface IPayLoad {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    //  Receber o nosso token
    const authToken = request.headers.authorization;


    // validar se token tá preenchido
    if (!authToken) {
        return response.status(401).end();
    }

    // ignora a primeira variável do array, e armazana o token na var token
    const [, token] = authToken.split(" ");

    try {
        
        // Validar se o token é válido
        const { sub } = verify(
            token,
            "6fc16ba6ada5c67eb6efb9b50d47685a"
        ) as IPayLoad;

        // Recuperar informações do usuário
        request.user_id = sub;

        return next();

    } catch (err) {
        return response.status(401).end();

    }

}