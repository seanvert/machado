import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

const getPortraitLinkFromWikipediaProfilePage = (link: string) => {
  // TODO
  return Buffer.from(link, 'utf8')
}


export const authorRouter = createTRPCRouter({
  getById: protectedProcedure
  .input(z.object({
    id: z.number()
  }))
  .query(({ ctx, input }) => {
    return ctx.db.author.findUniqueOrThrow({
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
    return ctx.db.author.findMany({
      where: {
        name: input.name
      },
      take: 5,
    })
  }),

  create: protectedProcedure
    .input(z.object({ 
      name: z.string().min(1),
      wikipediaLink: z.string().url(),
    }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.author.create({
        data: {
          name: input.name,
          wikipediaLink: input.wikipediaLink,
          portrait: getPortraitLinkFromWikipediaProfilePage(input.wikipediaLink)
        },
      });
    }),
});
