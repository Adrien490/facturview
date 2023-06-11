import { createTRPCRouter } from "~/server/api/trpc";
import { customerRouter } from "./routers/customer";
import { invoiceRouter } from "./routers/invoice";
import { productRouter } from "./routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  customers: customerRouter,
  products: productRouter,
  invoices: invoiceRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
