import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const quoteRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(({ ctx, input }) => {
      return ctx.db.quote.findUniqueOrThrow({
        where: {
          id: input.id
        }
      })
    }),

  getByName: protectedProcedure
    .input(z.object({
      content: z.string().min(1)
    }))
    .query(({ ctx, input }) => {
      return ctx.db.quote.findMany({
        where: {
          content: input.content
        },
        take: 5
      })
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

});
