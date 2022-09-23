import * as trpc from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createUserSchema } from "schema";
import { createRouter } from "server";

export const userRouter = createRouter().mutation("register-user", {
  input: createUserSchema,
  async resolve({ ctx, input }) {
    const { email, name } = input;

    console.log(input);

    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new trpc.TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        }
      }

      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  },
});
