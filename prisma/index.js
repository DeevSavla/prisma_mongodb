import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()
//prisma handles all the connections with the databases.
//prisma provides with methods to interact with models.
//prevents this from writing in all controller files.
