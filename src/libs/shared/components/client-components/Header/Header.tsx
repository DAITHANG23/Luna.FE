"use client";
import React from "react";
import Navbars from "./components/Navbars";
import NavbarsLogin from "./components/NavbarsLogin";
import { ROUTES } from "@/constants";
import { usePathname } from "@/libs/i18n/navigation";

const Header = () => {
  const pathname = usePathname();

  const isLoginPage =
    pathname === `${ROUTES.LOGIN.INDEX}` ||
    pathname === `${ROUTES.REGISTER.INDEX}` ||
    pathname?.includes(`${ROUTES.RESET_PASSWORD.INDEX}`) ||
    pathname === `${ROUTES.FORGOT_PASSWORD.INDEX}`;
  return (
    <div className="not-prose">
      {isLoginPage ? <NavbarsLogin /> : <Navbars />}
    </div>
  );
};

export default Header;
