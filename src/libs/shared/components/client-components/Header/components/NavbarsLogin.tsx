"use client";
import { useAppContext } from "@/contexts/AppContext";
import { Link } from "@/libs/next-intl/navigation";
import { LanguageSelect } from "@/libs/shared/components";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const NavbarsLogin = () => {
  const { setIsOpenDialog } = useAppContext();
  return (
    <div className="flex items-center justify-between p-4">
      <Link href={"/"}>
        <Image
          src={"/assets/images/logo.png"}
          alt="logo"
          width={130}
          height={60}
          className="rounded-lg"
        />
      </Link>

      <div className="flex items-center justify-center">
        <LanguageSelect />

        <div className="group relative">
          <button
            className="cursor-pointer rounded-full p-2 hover:bg-gray-200 sm:mr-20"
            onClick={() => setIsOpenDialog(prev => !prev)}
          >
            <Cog6ToothIcon className="text-primary h-7 w-7 animate-[spin_5s_linear_infinite]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarsLogin;
