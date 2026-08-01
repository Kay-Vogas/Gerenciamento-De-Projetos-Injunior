import type { User } from "@/@types/prisma/client.js"
import type { UserRepository } from "@/repositories/users-repository.js"
import { env } from "@/env/index.js"
import { hash } from "bcryptjs"

interface RegisterUserUseCaseRequest{
    name: string,
    email: string,
    password: string
}

type RegisterUserUseCaseResponse = {
    user: User
}

export class RegisterUserUseCase{

    constructor(private userRepository: UserRepository){}

    async execute({name,email,password}:RegisterUserUseCaseRequest)
    :Promise<RegisterUserUseCaseResponse>{

        const findByEmailOrName = await this.userRepository.findByEmailOrName(name,email)

        if(findByEmailOrName){
            throw new Error('Email ou Nome já existente no sistema!')
        }

        const hashPassword = await hash(password,env.HASH_SALT_ROUNDS)

        const user = await this.userRepository.create({
            name,
            email,
            password: hashPassword,
        })

        return {user}
    }
}