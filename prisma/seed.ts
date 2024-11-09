import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function cleanDb() {
    await prisma.post.deleteMany({})
    await prisma.text.deleteMany({})
    await prisma.exercise.deleteMany({})
    await prisma.quote.deleteMany({})
    return prisma.work.deleteMany({})
    await prisma.author.deleteMany({})   
    
}

async function main() {
    await cleanDb()


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
        const automaticWriting = await prisma.exercise.upsert({
            where: { id: i + 10 },
            update: {},
            create: {
                name: 'Automatic Writing' ,
                contents: `From his famed treatise, The Surrealist Manifesto, Breton describes his specific technique for automatic writing: 
                Find a place as conducive as possible to the concentration of the spirit.\n
                Enter the most passive, or receptive state of mind possible.\n
                Dispense with any preoccupations with the genius or talent of others.\n
                Repeat that literature is one of the saddest roads that lead everywhere.\n
                Write quickly, without preconceived topic, unable to stop or to be tempted to read what is written.\n
                Let the first sentence that comes to mind remain and continue like this.\n
                Trust in the inexhaustible nature of the murmur.\n
                If silence threatens, due to a \“lack of inattention,\” write any letter, returning to a state of arbitrariness.\n
                André Bretón defined automatic writing as a way of creating art through pure spontaneous thought, \“free from aesthetic or moral preoccupations.\” This appealed to many freethinkers of the time. He was as charismatic as he was enigmatic, and his following grew.\n`,
                configs: '{ configs: teste}',
                progress: '{ progress: { automaticWriting: 100}}',
                type: i,
                createdBy: {
                    connect: { id: user.id },
                },
            },
        })

        const associacaoLivre = await prisma.exercise.upsert({
            where: { id: i + 80},
            update: {},
            create: {
                name: 'Associação Livre',
                contents: `Escreva a primeira palavra que vier à cabeça quando ler as palavras. Não se preocupe com qualquer \n
                tipo de relação lógica ou de sentido.`,
                configs: '{ configs: teste}',
                progress: '{ progress: { automaticWriting: 100}}',
                type: i,
                createdBy: {
                    connect: { id: user.id },
                },
            }
            });
        const escritaAutomatica = await prisma.exercise.upsert({
            where: { id: i + 60 },
            update: {},
            create: {
                name: 'Escrita Automática',
                contents: `A partir de seu famoso tratado, O Manifesto Surrealista, Breton descreve sua técnica específica para escrita automática:
                Encontre um lugar tão propício quanto possível para a concentração do espírito.\n
                Entre no estado mais passivo ou receptivo da mente possível.\n
                Dispense quaisquer preocupações com o gênio ou talento dos outros.\n
                Repita que a literatura é uma das estradas mais tristes que levam a todos os lugares.\n
                Escreva rapidamente, sem um tópico preconcebido, incapaz de parar ou ser tentado a ler o que está escrito.\n
                Deixe a primeira frase que vem à mente permanecer e continue assim.\n
                Confie na natureza inexaurível do murmúrio.\n
                Se o silêncio ameaçar, devido a uma \"falta de atenção\", escreva qualquer letra, retornando a um estado de arbitrariedade.\n
                André Bretón definiu a escrita automática como uma forma de criar arte por meio do pensamento espontâneo puro, \"livre de preocupações estéticas ou morais\". Isso atraiu muitos livres-pensadores da época. Ele era tão carismático quanto enigmático, e seu séquito cresceu.\n`,
                configs: '{ configs: teste}',
                progress: '{ progress: { automaticWriting: 100}}',
                type: i,
                createdBy: {
                    connect: { id: user.id },
                },
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
                    exerciseId: 1
                },

            }
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