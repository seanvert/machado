import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exercisesRouter = createTRPCRouter({
  freeWriting: publicProcedure
  .query(({ ctx }) => {
    return "Escrita Livre"
  }),

  initializeAllStartingWithLetter: protectedProcedure
  .query(({ ctx }) => {
    // ver se tem dados do usuário deste tipo de exercício
    // se tiver fazer a lógica para adivinhar a próxima letra
    // se não tem, inicializar os dados
    return 1
  }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getAllByUser: protectedProcedure.query(({ ctx}) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    })
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
