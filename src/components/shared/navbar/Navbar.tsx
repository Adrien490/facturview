import React, { type Key } from "react";
import { NavbarItem } from "./NavbarItem";

export const Navbar = () => {
  const menu = [
    {
      text: "Clients",
      link_to: "customers",
    },
    {
      text: "Produits",
      link_to: "products",
    },
    {
      text: "Factures",
      link_to: "invoices",
    },
  ];
  return (
    <nav className="flex h-24 items-center bg-contrast shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-2xl text-white">
            <h1>FacturView</h1>
          </div>
          <div className="flex justify-start gap-9">
            {menu.map((item, index: Key) => {
              return (
                <NavbarItem
                  key={index}
                  text={item.text}
                  link_to={item.link_to}
                ></NavbarItem>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
