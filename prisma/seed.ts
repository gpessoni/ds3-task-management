import { PrismaClient } from "@prisma/client";

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

    for (const priority of priorities) {
        const createdPriority = await prisma.priority.create({
            data: priority,
        });
        console.log("Prioridade criada:", createdPriority);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
