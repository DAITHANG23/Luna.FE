"use client";
import { useAppContext } from "@/contexts/AppContext";
import { Link } from "@/libs/i18n/navigation";
import { LanguageSelect } from "@/libs/shared/components";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const NavbarsLogin = () => {
  const { setIsOpenDialog } = useAppContext();
  return (
    <div className="flex justify-between items-center p-4">
      <Link href={"/"}>
        <Image
          src={"/assets/images/logo.png"}
          alt="logo"
          width={130}
          height={60}
          className="rounded-lg"
        />
      </Link>

      <div className="flex justify-center items-center">
        <LanguageSelect />

        <div className="relative group">
          <button
            className="cursor-pointer sm:mr-20 hover:bg-gray-200 rounded-full p-2"
            onClick={() => setIsOpenDialog((prev) => !prev)}
          >
            <Cog6ToothIcon className="w-7 h-7 animate-[spin_5s_linear_infinite] text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarsLogin;
