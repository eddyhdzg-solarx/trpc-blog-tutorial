import { createRouter, userRouter } from "server";

export type AppRouter = typeof appRouter;

export const appRouter = createRouter().merge("users.", userRouter);
