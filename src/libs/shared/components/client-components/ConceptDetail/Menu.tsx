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
    return dishes?.filter(d => d.type === "alacarte");
  }, [dishes]);

  const buffetDishes = useMemo(() => {
    return dishes?.filter(d => d.type === "Buffet");
  }, [dishes]);

  const comboDishes = useMemo(() => {
    return dishes?.filter(d => d.type === "Combo");
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
        ""
    );
  }, [alacarteDishes, buffetDishes, comboDishes]);

  const dishesList = useMemo(() => {
    const selectedDish =
      dishes &&
      dishes.find(
        d => d.category === chooseItemDishes || d.name === chooseItemDishes
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
        .map(i => i.category)
        .filter(Boolean) as string[];

      listItem.push(...categoryList);
    }

    if (buffetDishes) {
      const buffetList = buffetDishes
        .map(i => i.name)
        .filter(Boolean) as string[];
      listItem.push(...buffetList);
    }

    if (comboDishes) {
      const comboList = comboDishes
        .map(i => i.name)
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
            className="!dark:hover:text-black mb-4 flex items-center gap-2 rounded-lg border border-solid border-black px-3 font-normal hover:bg-gray-200 dark:border-white"
          >
            <ArrowLeftIcon className="text-primary-text h-5 w-5" />
            <span className="text-primary-text text-base font-normal">
              {t("button.goBack")}
            </span>
          </button>
        </div>

        <div className="w-full pt-4 pr-2 pb-12.5 lg:flex">
          <div className="fixed bottom-0 left-0 z-50 mx-auto h-[50px] w-full overflow-x-auto bg-white shadow-md lg:hidden">
            <div className="flex h-full w-max items-center gap-4 px-4">
              {itemNavbarList.map(item => (
                <div
                  key={item}
                  className="bg-primary hover:bg-primary/80 cursor-pointer rounded-full px-3 py-1 font-semibold whitespace-nowrap text-white transition-colors"
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
                          : "text-primary-text",
                        "flex cursor-pointer items-center justify-between border-b-2 py-3 text-lg font-bold"
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
                          ? "h-auto! p-4 opacity-100"
                          : "max-h-0 p-0 opacity-0"
                      }`}
                    >
                      {dishes?.map(item => {
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
                              "hover:text-primary cursor-pointer p-2 text-base font-bold"
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
              <div className="grid w-full grid-cols-2 gap-5 lg:mb-20 lg:w-4/5 lg:w-[80%] lg:gap-x-5 lg:gap-y-4 lg:pl-8 xl:grid-cols-3 xl:pl-20">
                {dishesList?.map((i, idx) => {
                  if (typeof i === "string") {
                    return (
                      <div
                        key={i}
                        className="relative mb-4 h-45 w-52 cursor-pointer"
                      >
                        <Image
                          src={i}
                          alt="Dish Image"
                          className="rounded object-cover"
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
                        <div className="relative h-40 w-full cursor-pointer 2xl:h-50">
                          <Image
                            src={i?.image || "/favicon.ico"}
                            alt={i.name}
                            className="rounded object-cover"
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
                          <p className="text-primary-text font-medium">
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
              <div className="flex w-full flex-col items-center justify-center gap-2 gap-4 lg:mb-20 lg:flex-row lg:gap-x-5 lg:gap-y-4 lg:pl-8 xl:pl-20">
                <div className="w-full lg:w-[50%]">
                  {Array.isArray((dishesList as Dish)?.images) &&
                  ((dishesList as Dish).images?.length ?? 0) > 0 ? (
                    <Slider
                      isDishesCarousel
                      banners={(dishesList as Dish)?.images}
                    />
                  ) : (
                    <div className="relative h-75 w-full cursor-pointer">
                      <Image
                        src={(dishesList as Dish)?.image || "/favicon.ico"}
                        alt={"img"}
                        className="rounded object-cover"
                        fill
                        sizes="(max-width:640px) 100vw, 50vw"
                        loading="lazy"
                        onClick={() => {
                          setIsOpenImage(true);
                          setImageSrc(
                            (dishesList as Dish)?.image || "/favicon.ico"
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-[40%]">
                  <h3 className="text-primary-text font-medium">
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
