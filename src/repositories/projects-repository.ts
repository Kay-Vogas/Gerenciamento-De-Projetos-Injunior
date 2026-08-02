import type { Prisma, Project } from "@/@types/prisma/client.js";

export interface ProjectsRepository{

    create(data:Prisma.ProjectCreateInput):Promise<Project>
    list():Promise<Project[]>
    findBy(where:Prisma.ProjectWhereInput):Promise<Project | null>
    update(id: string ,data: Prisma.ProjectUpdateInput): Promise<Project>
    delete(id: string):Promise<Project>
}