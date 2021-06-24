import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


class CreateTagService{

    async execute(name:string){

        const tagsRepositories = getCustomRepository(TagsRepositories);

        //caso não passe nome
        if(!name){
            throw new Error("Incorrect name!");
            
        }

        // SELECT * FROM TAGS WHERE NAME = 'name'
        const tagAlreadyExists = await tagsRepositories.findOne({
            name,
        });

        // caso a tag com esse nome já exista
        if(tagAlreadyExists){
            throw new Error("Tag already exists!");
        }

        // caso não exista, é criado uma nova tag
        const tag = tagsRepositories.create({
            name
        });

        // salva no repositório
        await tagsRepositories.save(tag);

        return tag;
    }

}

export{ CreateTagService }
