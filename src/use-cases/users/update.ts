import type { Prisma, User } from '@/@types/prisma/client.js'
import type { UserRepository } from '@/repositories/users-repository.js'

interface UpdateUserUseCaseResquest {
  id: string
  name?: string | undefined
  email?: string | undefined
}

type UpdateUserUseCaseResponse = {
  user: User
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    name,
    email,
  }: UpdateUserUseCaseResquest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate = await this.userRepository.findBy({ id })

    if (!userToUpdate) {
      throw new Error('Usuário não encontrado no sistema')
    }

    const data: Prisma.UserUpdateInput = {}

    if (name !== undefined) {
      data.name = name
    }

    if (email !== undefined) {
      data.email = email
    }

    const user = await this.userRepository.update(userToUpdate.id, data)

    return { user }
  }
}
