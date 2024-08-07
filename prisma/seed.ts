// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker";

const prisma  = new PrismaClient();

const fakerUser = (): any => ({
    name: faker.person.fullName(),//.name.firstName() + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
});

async function main() {
    for (let i = 0; i < 10; i++) {
        await prisma.user.create({ data: fakerUser() });
    }
};

  

main().catch((e) => console.error(e)).finally(async () => {
    await prisma.$disconnect();
});