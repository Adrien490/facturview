import { type Product } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany();
    return products;
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const product = await ctx.prisma.product.findUnique({
        where: { id },
      });

      return product;
    }),
  deleteById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const deletedProduct = await ctx.prisma.product.delete({
        where: { id },
      });

      return deletedProduct;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        stock: z.number(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, stock, price } = input;
      try {
        const newProduct: Product = await ctx.prisma.product.create({
          data: {
            name,
            stock,
            price,
          },
        });
        return { status: 201, message: "Product created successfully.", data: newProduct };
      } catch (error) {
        return { status: 400, message: "Failed to create product." };
      }
    }),
    incrementStock: publicProcedure
    .input(
      z.object({
        id: z.number(),
        incrementValue: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, incrementValue } = input;
      try {
        const updatedProduct = await ctx.prisma.product.update({
          where: { id },
          data: {
            stock: incrementValue,
          },
        });
        if (!updatedProduct) {
          return { status: 404, message: "Product not found." };
        }
        return { status: 200, message: "Product stock incremented successfully.", data: updatedProduct };
      } catch (error) {
        return { status: 400, message: "Failed to increment product stock." };
      }
    }),

  decrementStock: publicProcedure
    .input(
      z.object({
        name: z.string(),
        decrementValue: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, decrementValue } = input;
      try {
        const productBeforeUpdate = await ctx.prisma.product.findFirst({ where: { name }});
        if (!productBeforeUpdate) {
          return { status: 404, message: "Product not found." };
        }
        const updatedProduct = await ctx.prisma.product.update({
          where: { id: productBeforeUpdate.id },
          data: {
            stock: productBeforeUpdate.stock - decrementValue,
          },
        });
        return { status: 200, message: "Product stock decremented successfully.", data: updatedProduct };
      } catch (error) {
        return { status: 400, message: "Failed to decrement product stock." };
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        stock: z.number().optional(),
        price: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, stock, price } = input;
      try {
        const updatedProduct = await ctx.prisma.product.update({
          where: { id },
          data: {
            name,
            stock,
            price,
          },
        });
        if (!updatedProduct) {
          return { status: 404, message: "Product not found." };
        }
        return { status: 200, message: "Product updated successfully.", data: updatedProduct };
      } catch (error) {
        return { status: 400, message: "Failed to update product." };
      }
    })
});
