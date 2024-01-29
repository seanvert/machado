import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const workRouter = createTRPCRouter({
  getById: protectedProcedure
  .input(z.object({
    id: z.number()
  }))
  .query(({ ctx, input }) => {
    return ctx.db.work.findUniqueOrThrow({
      where: {
        id: input.id
      }
    })
  }),

  getByName: protectedProcedure
  .input(z.object({
    name: z.string().min(1)
  }))
  .query(({ ctx, input }) => {
    return ctx.db.work.findMany({
      where: {
        name: input.name
      }
    })
  }),

  create: protectedProcedure
    .input(z.object({ 
      name: z.string().min(1),
      bookStoreLink: z.string().url(),
      authorName: z.string(),
      authorId: z.number()
     }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.work.create({
        data: {
          name: input.name,
          bookStoreLink: input.bookStoreLink,
          authorName: input.authorName,
          authorId: input.authorId
        },
      });
    }),

    modify: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1),
      bookStoreLink: z.string().url(),
      authorName: z.string()
    }))
    .mutation(({ ctx, input}) => {
      return ctx.db.work.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          bookStoreLink: input.bookStoreLink,
          authorName: input.authorName
        }
      })
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.work.findFirst({
    });
  }),
});
