import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({
      exerciseId: z.number()
    }))
    .query(({ ctx, input }) => {
      return ctx.db.exercise.findUniqueOrThrow({
        where: {
          id: input.exerciseId
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
