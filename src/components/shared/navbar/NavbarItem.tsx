import Link from "next/link";
import React from "react";

interface NavbarItemProps {
  text: string;
  link_to: string;
}

export const NavbarItem = ({ text, link_to }: NavbarItemProps) => {
  return (
    <Link href={`/${link_to}`} legacyBehavior>
      <a className="text-white">{text}</a>
    </Link>
  );
};
