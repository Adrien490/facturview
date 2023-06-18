import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/sign-in", "api/auth/session"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};