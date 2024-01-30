import { createTRPCRouter, publicProcedure, } from "~/server/api/trpc";
import { z } from 'zod';
import { TRPCError } from "@trpc/server";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
    getUserByUsername: publicProcedure.input(z.object({
        username: z.string()
    })).query(async ({ ctx, input}) => {
        const user = await ctx.db.user.findFirstOrThrow({
            where: {
                name: input.username
            }
        })

        if (!user) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "User not found",
            })
        }
        return filterUserForClient(user)
    })
});
