import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  freeWriting: publicProcedure
  .query(({ ctx }) => {
    // TODO n fazer
    return "Escrita Livre"
  }),

  initializeAllStartingWithLetter: protectedProcedure
  .query(({ ctx }) => {
    // TODO n fazxer
    // ver se tem dados do usuário deste tipo de exercício
    // se tiver fazer a lógica para adivinhar a próxima letra
    // se não tem, inicializar os dados
    return 1
  }),

  getById: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(({ ctx, input }) => {
      return ctx.db.exercise.findUniqueOrThrow({
        where: {
          id: input.id
        }
      })
    }),

  create: protectedProcedure
    .input(z.object({ 
      name: z.string().min(1),
      contents: z.string().min(1),
      configs: z.string().min(2),
      type: z.number(),
      progress: z.string(),
      createdBy: z.string()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.exercise.create({
        data: {
          name: input.name,
          contents: input.contents,
          configs: input.configs,
          progress: input.progress,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.exercise.findMany({
      orderBy: { id: "desc" }
    })
  }),
});
