import { type Customer } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const invoiceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const invoices = await ctx.prisma.invoice.findMany({
      include: {
        customer: true,
        productInvoices: {
          include: {
            product: true,
          },
        },
      },
    });

    return invoices.map(invoice => {
      let total = 0;
      invoice.productInvoices.forEach((productInvoice) => {
        total += productInvoice.product.price * productInvoice.quantity;
      });

      return {
        ...invoice,
        total,
        customerName: `${invoice.customer.lastName}`
      };
    });
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
    try {
      // Supprimer les lignes de facture associées
      await ctx.prisma.productInvoices.deleteMany({
        where: { invoiceId: id },
      });

      // Supprimer la facture
      const deletedInvoice = await ctx.prisma.invoice.delete({
        where: { id },
      });

      return deletedInvoice;
    } catch (error) {
      return { status: 400, message: "Failed to delete invoice." };
    }
  }),

  
    update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        customerName: z.string().optional(),
        date: z.date().optional(),
        isPaid: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, customerName, date, isPaid } = input;
      try {
        const {id: customerId} = await ctx.prisma.customer.findFirst({
          where: { lastName: customerName },
        }) as Customer;
        const updatedInvoice = await ctx.prisma.invoice.update({
          where: { id },
          data: {
            customerId,
            date,
            isPaid,
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
  create: publicProcedure
    .input(
      z.object({
        customerName: z.string(),
        date: z.date(),
        isPaid: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { customerName, date, isPaid } = input;
      try {
        const {id: customerId} = await ctx.prisma.customer.findFirst({
          where: { lastName: customerName },
        }) as Customer;
        
        const newInvoice = await ctx.prisma.invoice.create({
          data: {
            customerId,
            date,
            isPaid,
          },
        });
        return { status: 201, message: "Invoice created successfully.", data: newInvoice };
      } catch (error) {
        return { status: 400, message: error };
      }
    }),
    markAsPaid: publicProcedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { id } = input;
    try {
      const updatedInvoice = await ctx.prisma.invoice.update({
        where: { id },
        data: {
          isPaid: true,
        },
      });
      if (!updatedInvoice) {
        return { status: 404, message: "Invoice not found." };
      }
      return { status: 200, message: "Invoice marked as paid.", data: updatedInvoice };
    } catch (error) {
      return { status: 400, message: "Failed to mark invoice as paid." };
    }
  }),
  getTotal: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const productInvoices = await ctx.prisma.productInvoices.findMany({
        where: { invoiceId: id },
        include: {
          product: true,
        },
      });

      if (!productInvoices) {
        return { status: 404, message: "Invoice not found." };
      }

      let total = 0;
      productInvoices.forEach((productInvoice) => {
        total += productInvoice.product.price * productInvoice.quantity;
      });

      return { status: 200, total };
    }),


markAsUnpaid: publicProcedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { id } = input;
    try {
      const updatedInvoice = await ctx.prisma.invoice.update({
        where: { id },
        data: {
          isPaid: false,
        },
      });
      if (!updatedInvoice) {
        return { status: 404, message: "Invoice not found." };
      }
      return { status: 200, message: "Invoice marked as unpaid.", data: updatedInvoice };
    } catch (error) {
      return { status: 400, message: "Failed to mark invoice as unpaid." };
    }
  })
});
