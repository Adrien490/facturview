import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const customerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const customers = await ctx.prisma.customer.findMany();
    return customers;
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const customer = await ctx.prisma.customer.findUnique({
        where: { id },
      });

      return customer;
    }),
  deleteById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const deletedCustomer = await ctx.prisma.customer.delete({
        where: { id },
      });

      return deletedCustomer;
    }),
    create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, email } = input;
      try {
        const newCustomer = await ctx.prisma.customer.create({
          data: {
            firstName,
            lastName,
            email,
          },
        });
        return { status: 201, message: "Customer created successfully.", data: newCustomer };
      } catch (error) {
        return { status: 400, message: "Failed to create customer." };
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, firstName, lastName, email } = input;
      try {
        const updatedCustomer = await ctx.prisma.customer.update({
          where: { id },
          data: {
            firstName,
            lastName,
            email,
          },
        });
        if (!updatedCustomer) {
          return { status: 404, message: "Customer not found." };
        }
        return { status: 200, message: "Customer updated successfully.", data: updatedCustomer };
      } catch (error) {
        return { status: 400, message: "Failed to update customer." };
      }
    })
});
