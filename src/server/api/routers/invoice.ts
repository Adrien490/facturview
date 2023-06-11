import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const invoiceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const invoices = await ctx.prisma.invoice.findMany({
      include: {
        customer: true,
      },
    });
    return invoices.map(invoice => ({
      ...invoice,
      customerName: `${invoice.customer.lastName}`
    }));
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const invoice = await ctx.prisma.invoice.findUnique({
        where: { id },
      });

      return invoice;
    }),
  deleteById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const deletedInvoice = await ctx.prisma.invoice.delete({
        where: { id },
      });

      return deletedInvoice;
    }),
  create: publicProcedure
    .input(
      z.object({
        customerId: z.number(),
        date: z.date(),
        isPaid: z.boolean(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { customerId, date, isPaid, price } = input;
      try {
        const newInvoice = await ctx.prisma.invoice.create({
          data: {
            customerId,
            date,
            isPaid,
            price,
          },
        });
        return { status: 201, message: "Invoice created successfully.", data: newInvoice };
      } catch (error) {
        return { status: 400, message: "Failed to create invoice." };
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        customerId: z.number().optional(),
        date: z.date().optional(),
        isPaid: z.boolean().optional(),
        price: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, customerId, date, isPaid, price } = input;
      try {
        const updatedInvoice = await ctx.prisma.invoice.update({
          where: { id },
          data: {
            customerId,
            date,
            isPaid,
            price,
          },
        });
        if (!updatedInvoice) {
          return { status: 404, message: "Invoice not found." };
        }
        return { status: 200, message: "Invoice updated successfully.", data: updatedInvoice };
      } catch (error) {
        return { status: 400, message: "Failed to update invoice." };
      }
    }),
});
