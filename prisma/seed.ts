import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice',
            posts: {
                create: {
                    name: 'Check out Prisma with Next.js',
                },
            },
            texts: {
                create: {
                    name: 'test',
                    contents: 'test',
                    exercise: {}
                },

            }
        },
    })
    for (let i = 0; i < 10; i++) {
        // create user from faker name and email
        const fakerEmail = faker.internet.email()
        const fakerName = faker.person.fullName()
        const user = await prisma.user.upsert({
            where: { email: fakerEmail },
            update: {},
            create: {
                email: fakerEmail,
                name: fakerName,
                posts: {
                    create: [
                        {
                            name: 'test' + i,
                        },
                        {
                            name: fakerName
                        },
                        {
                            name: fakerEmail
                        }
                    ],
                }
            },
        })

        // create exercises with new users
        const exercise = await prisma.exercise.upsert({
            where: { id: i + 1 },
            update: {},
            create: {
                name: 'exercise' + fakerName,
                contents: 'test',
                configs: 'test',
                progress: 'test',
                type: i,
                createdBy: {
                    connect: { id: user.id },
                },
            },
        })

        // create texts
        const text = await prisma.text.upsert({
            where: { id: i },
            update: {},
            create: {
                name: 'test' + fakerName,
                contents: 'test' + fakerEmail,
                exercise: { connect: { id: exercise.id } },
                createdBy: { connect: { id: user.id } },
            },
        })
    }


    const machado = await prisma.author.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Machado de Assis',
            wikipediaLink: "https://pt.wikipedia.org/wiki/Machado_de_Assis",
            portrait: Buffer.alloc(10),
        },
    })
    const memoriasPostumas = await prisma.work.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Memórias Póstumas',
            bookStoreLink: "https://pt.wikipedia.org/wiki/Machado_de_Assis",
            authorName: machado.name,
            author: { connect: { id: machado.id} }
        },
    })
    const quote = await prisma.quote.upsert({
        where: { id: 1 },
        update: {},
        create: {
            content: 'o tempo caleja a sensibilidade, e oblitera a memória das coisas',
            createdBy: {
                connect: { id: machado.id },
            },
            book: {
                connect: { id: memoriasPostumas.id },
            }
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob',
            posts: {
                create: [
                    {
                        name: 'Follow Prisma on Twitter',
                    },
                    {
                        name: 'Follow Nexus on Twitter',
                    },
                ],
            },
        },
    })

    console.log({ alice, bob })
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })