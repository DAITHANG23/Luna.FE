import { NotFound } from "@/libs/assets";
import Link from "next/link";
import React from "react";
interface NotFoundPageProps {
  title: string;
  buttonText: string;
}
const NotFoundPage = ({
  title = "Trang không tìm thấy",
  buttonText = "Về trang chủ",
}: NotFoundPageProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center my-20 sm:my-34">
      <NotFound />
      <h2 className="text-primary mt-[16px]">{title}</h2>

      <Link href={"/"}>
        <button className="text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-lg px-4 py-[6px]">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
