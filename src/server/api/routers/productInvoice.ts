import { type Product } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productInvoiceRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
      const productInvoices = await ctx.prisma.productInvoices.findMany();
      return productInvoices;
    }),
    getById: publicProcedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .query(async ({ ctx, input }) => {
        const { id } = input;
        const productInvoice = await ctx.prisma.productInvoices.findUnique({
          where: { id },
        });
  
        return productInvoice;
      }),
    deleteById: publicProcedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id } = input;
        const deletedProductInvoice = await ctx.prisma.productInvoices.delete({
          where: { id },
        });
  
        return deletedProductInvoice;
      }),
      create: publicProcedure
      .input(
        z.object({
          productName: z.string(),
          invoiceId: z.number(),
          quantity: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { productName, invoiceId, quantity } = input;
        try {
            const {id: productId} = await ctx.prisma.product.findFirst({
                where: { name: productName },
              }) as Product;
            
            // Check if the product invoice already exists
            const existingProductInvoice = await ctx.prisma.productInvoices.findFirst({
              where: {
                productId,
                invoiceId,
              },
            });
    
            if (existingProductInvoice) {
              // If it exists, increase the quantity
              const updatedProductInvoice = await ctx.prisma.productInvoices.update({
                where: { id: existingProductInvoice.id },
                data: {
                  quantity: existingProductInvoice.quantity + quantity,
                },
              });
              return { status: 200, message: "Product Invoice updated successfully.", data: updatedProductInvoice };
            } else {
              // If it does not exist, create a new product invoice
              const newProductInvoice = await ctx.prisma.productInvoices.create({
                data: {
                  productId,
                  invoiceId,
                  quantity,
                },
              });
              return { status: 201, message: "Product Invoice created successfully.", data: newProductInvoice };
            }
        } catch (error) {
          return { status: 400, message: "Failed to create or update product invoice." };
        }
      }),
    
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          productId: z.number().optional(),
          invoiceId: z.number().optional(),
          quantity: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, productId, invoiceId, quantity } = input;
        try {
          const updatedProductInvoice = await ctx.prisma.productInvoices.update({
            where: { id },
            data: {
              productId,
              invoiceId,
              quantity,
            },
          });
          if (!updatedProductInvoice) {
            return { status: 404, message: "Product Invoice not found." };
          }
          return { status: 200, message: "Product Invoice updated successfully.", data: updatedProductInvoice };
        } catch (error) {
          return { status: 400, message: "Failed to update product invoice." };
        }
      })
  });
  