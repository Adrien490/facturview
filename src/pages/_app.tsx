import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';


import { api } from "~/utils/api";

import "~/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ClerkProvider, SignIn, useUser } from "@clerk/nextjs";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
    <ClerkProvider>
    
      <Component {...pageProps} />
      
      <ToastContainer />
    
    </ClerkProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
