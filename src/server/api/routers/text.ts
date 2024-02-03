import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";

export const textRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      contents: z.string().min(1),
      exerciseId: z.number(),
    }))
    .mutation(({ ctx, input }) => {

      return ctx.db.text.create({
        data: {
          name: input.name,
          contents: input.contents,
          exercise: { connect: { id: input.exerciseId } },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

    getById: protectedProcedure
    .input(z.object({
      textId: z.number()
    }))
    .query(({ ctx, input }) => {
      return ctx.db.text.findUniqueOrThrow({
        where: {
          id: input.textId
        }
      })
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.text.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.text.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  }),
  getAllByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.text.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    })
  }),
});


