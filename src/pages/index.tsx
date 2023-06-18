import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Navbar } from "~/components/shared/navbar/Navbar";
import { CustomerCreateButton } from "~/components/customers/CustomerCreateButton";
import { CustomerList } from "~/components/customers/CustomerList";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <main className="container mx-auto flex flex-col gap-8 py-8">
        <div className="flex gap-3">
          <CustomerCreateButton></CustomerCreateButton>
        </div>
        <div className="flex flex-col text-center shadow-xl">
          <div className="flex flex-row border-b border-secondary bg-contrast text-white rounded-lg p-3 font-bold">
            <div className="w-1/4 p-2">Prénom</div>
            <div className="w-1/4 p-2">Nom</div>
            <div className="w-1/4 p-2">Email</div>
            <div className="w-1/4 p-2"></div>
          </div>
          <CustomerList></CustomerList>
        </div>
      </main>
    </>
  );
};

export default Home;

