import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const priorities = [
        {
            level: "alta",
            default: true
        },
        {
            level: "média", 
            default: true
        },
        {
            level: "baixa",
            default: true
        }
    ];

    await prisma.priority.deleteMany();
    await prisma.user.deleteMany();

    for (const priority of priorities) {
        const createdPriority = await prisma.priority.create({
            data: priority,
        });
        console.log("Prioridade criada:", createdPriority);
    }

    const hashedPassword = await bcrypt.hash("123456", 10);
    
    const defaultUser = await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@admin.com",
            password: hashedPassword
        }
    });

    console.log("Usuário padrão criado:", defaultUser);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
