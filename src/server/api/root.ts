import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { exerciseRouter } from "./routers/exercise";
import { authorRouter } from "./routers/author";
import { quoteRouter } from "./routers/quote";
import { workRouter } from "./routers/work";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  exercise: exerciseRouter,
  author: authorRouter,
  quote: quoteRouter,
  work: workRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
