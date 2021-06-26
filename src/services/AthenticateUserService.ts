import { getCustomRepository } from "typeorm";
import{ compare } from "bcryptjs";
import{ sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){

        const usersRepositories = getCustomRepository(UsersRepositories);

        // verificar se email existe

        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect");
        }
        // verificar se senha está correta

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email/password incorrect");
        }

        // gerar token
        const token = sign({
            email: user.email

        }, 
        "6fc16ba6ada5c67eb6efb9b50d47685a",
        {
            subject: user.id,
            expiresIn: "1d",
        }
        );
        
        return token;
    }
}

export{ AuthenticateUserService }