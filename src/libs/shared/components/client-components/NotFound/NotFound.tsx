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
    <div className="my-20 flex flex-col items-center justify-center gap-4 text-center sm:my-34">
      <NotFound />
      <h2 className="text-primary mt-[16px]">{title}</h2>

      <Link href={"/"}>
        <button className="rounded-lg bg-gray-800 px-4 py-[6px] text-white shadow-lg hover:bg-gray-600">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
