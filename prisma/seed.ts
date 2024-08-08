// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker";

const prisma  = new PrismaClient();


async function main() {
    for (let i = 0; i < 50; i++) {
        await prisma.user.create({ 
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                rooms: {
                    create: {}
                },
            }
        });
    }
};

  

main().catch((e) => console.error(e)).finally(async () => {
    await prisma.$disconnect();
});