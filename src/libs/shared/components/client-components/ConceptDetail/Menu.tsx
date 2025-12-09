"use client";
import { Dish } from "@/@types/models";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import _ from "lodash";
import { cn } from "@/utils";
import Image from "next/image";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import { Slider } from "@/libs/shared/components";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface MenuProps {
  dishes: Array<Dish>;
  conceptName: string;
}

const Menu = ({ dishes, conceptName }: MenuProps) => {
  const t = useTranslations("Concept");
  const locale = useLocale();
  const router = useRouter();

  const alacarteDishes = useMemo(() => {
    return dishes?.filter((d) => d.type === "alacarte");
  }, [dishes]);

  const buffetDishes = useMemo(() => {
    return dishes?.filter((d) => d.type === "Buffet");
  }, [dishes]);

  const comboDishes = useMemo(() => {
    return dishes?.filter((d) => d.type === "Combo");
  }, [dishes]);

  const [openSideBar, setOpenSideBar] = useState<number | null>(0);
  const [chooseItemDishes, setChooseItemDishes] = useState<string | null>(null);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChooseItemDishes(
      alacarteDishes[0]?.category ||
        buffetDishes[0]?.name ||
        comboDishes[0]?.name ||
        "",
    );
  }, [alacarteDishes, buffetDishes, comboDishes]);

  const dishesList = useMemo(() => {
    const selectedDish =
      dishes &&
      dishes.find(
        (d) => d.category === chooseItemDishes || d.name === chooseItemDishes,
      );

    return selectedDish?.items && selectedDish?.items?.length > 0
      ? selectedDish?.items
      : selectedDish;
  }, [dishes, chooseItemDishes]);

  const onToggleSidebar = (index: number, dishes: Array<Dish>) => {
    setOpenSideBar(index);
    setChooseItemDishes(dishes[0]?.name || dishes[0]?.category || "");
  };

  const onChooseItem = (value: string) => {
    setChooseItemDishes(value);
  };
  const navItem = [
    { type: "Alacarte", dishes: alacarteDishes },
    { type: "Buffet", dishes: buffetDishes },
    { type: "Combo", dishes: comboDishes },
  ];

  const itemNavbarList = useMemo(() => {
    const listItem: Array<string> = [];

    if (alacarteDishes) {
      const categoryList = alacarteDishes
        .map((i) => i.category)
        .filter(Boolean) as string[];

      listItem.push(...categoryList);
    }

    if (buffetDishes) {
      const buffetList = buffetDishes
        .map((i) => i.name)
        .filter(Boolean) as string[];
      listItem.push(...buffetList);
    }

    if (comboDishes) {
      const comboList = comboDishes
        .map((i) => i.name)
        .filter(Boolean) as string[];
      listItem.push(...comboList);
    }

    return listItem;
  }, [comboDishes, buffetDishes, alacarteDishes]);

  return (
    <>
      {isOpenImage && (
        <Lightbox
          mainSrc={imageSrc}
          onCloseRequest={() => setIsOpenImage(false)}
        />
      )}
      <div>
        <div className="mt-4">
          <button
            onClick={() => router.push(`/${locale}/${conceptName}`)}
            className="flex gap-2 font-normal items-center border border-solid dark:border-white rounded-lg border-black px-3 hover:bg-gray-200 mb-4 !dark:hover:text-black"
          >
            <ArrowLeftIcon className="text-primary-text w-5 h-5" />
            <span className="font-normal text-base text-primary-text">
              {t("button.goBack")}
            </span>
          </button>
        </div>

        <div className="lg:flex pr-2 pb-12.5 w-full pt-4">
          <div className="fixed lg:hidden bottom-0 left-0 w-full mx-auto h-[50px] bg-white shadow-md z-50 overflow-x-auto">
            <div className="flex gap-4 px-4 h-full items-center w-max">
              {itemNavbarList.map((item) => (
                <div
                  key={item}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-primary text-white font-semibold cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => onChooseItem(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cn("hidden lg:block lg:w-[20%]")}>
            {navItem.map(({ type, dishes }, index) => {
              return (
                dishes &&
                dishes.length > 0 && (
                  <div className="pt-2" key={index}>
                    <div
                      className={cn(
                        openSideBar === index
                          ? "border-primary text-primary"
                          : " text-primary-text",
                        "border-b-2 flex justify-between  cursor-pointer py-3 items-center text-lg font-bold",
                      )}
                      onClick={() => onToggleSidebar(index, dishes)}
                    >
                      {_.capitalize(type)}
                      <span>
                        {openSideBar === index ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        )}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openSideBar === index
                          ? "opacity-100 h-auto! p-4"
                          : "opacity-0 max-h-0 p-0"
                      }`}
                    >
                      {dishes?.map((item) => {
                        const itemDishes =
                          (item.type === "alacarte"
                            ? item.category
                            : item.name) || "";
                        return (
                          <div
                            key={itemDishes}
                            className={cn(
                              chooseItemDishes === itemDishes
                                ? "text-primary"
                                : "text-primary-text",
                              "p-2 cursor-pointer font-bold hover:text-primary text-base",
                            )}
                            onClick={() => onChooseItem(itemDishes)}
                          >
                            {item.type === "alacarte"
                              ? item.category
                              : item.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              );
            })}
          </div>

          <div className="lg:w-[80%]">
            {Array.isArray(dishesList) && dishesList?.length > 0 ? (
              <div className="w-full lg:w-[80%] lg:w-4/5 lg:pl-8 gap-5 lg:gap-x-5 lg:gap-y-4 xl:pl-20 lg:mb-20 grid grid-cols-2 xl:grid-cols-3">
                {dishesList?.map((i, idx) => {
                  if (typeof i === "string") {
                    return (
                      <div
                        key={i}
                        className="mb-4 w-52 h-45 relative cursor-pointer"
                      >
                        <Image
                          src={i}
                          alt="Dish Image"
                          className="object-cover rounded"
                          fill
                          sizes="100px"
                          loading="lazy"
                          onClick={() => {
                            setIsOpenImage(true);
                            setImageSrc(i);
                          }}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={i._id ?? idx} className="mb-4 h-auto">
                      <div className="flex flex-col items-center">
                        <div className="w-full h-40 2xl:h-50 relative cursor-pointer">
                          <Image
                            src={i?.image || "/favicon.ico"}
                            alt={i.name}
                            className="object-cover rounded"
                            fill
                            loading="lazy"
                            sizes="(max-width:640px) 50vw, 25vw"
                            onClick={() => {
                              setIsOpenImage(true);
                              setImageSrc(i?.image || "/favicon.ico");
                            }}
                          />
                        </div>

                        <div className="max-w-full pt-2 text-center">
                          <p className="font-medium text-primary-text ">
                            {i.name}
                          </p>
                          <p className="text-gray-500">
                            {i.price.toLocaleString()} đ
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full lg:pl-8 gap-2 lg:gap-x-5 lg:gap-y-4 xl:pl-20 lg:mb-20 flex lg:flex-row flex-col justify-center items-center gap-4">
                <div className="w-full lg:w-[50%]">
                  {Array.isArray((dishesList as Dish)?.images) &&
                  ((dishesList as Dish).images?.length ?? 0) > 0 ? (
                    <Slider
                      isDishesCarousel
                      banners={(dishesList as Dish)?.images}
                    />
                  ) : (
                    <div className="w-full h-75 relative cursor-pointer">
                      <Image
                        src={(dishesList as Dish)?.image || "/favicon.ico"}
                        alt={"img"}
                        className="object-cover rounded"
                        fill
                        sizes="(max-width:640px) 100vw, 50vw"
                        loading="lazy"
                        onClick={() => {
                          setIsOpenImage(true);
                          setImageSrc(
                            (dishesList as Dish)?.image || "/favicon.ico",
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-[40%]">
                  <h3 className="font-medium text-primary-text ">
                    {(dishesList as Dish)?.name}
                  </h3>
                  <p className="text-gray-500">
                    {(dishesList as Dish)?.price.toLocaleString()}đ
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Menu);
