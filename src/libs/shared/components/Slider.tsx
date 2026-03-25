"use client";

import SliderComponent from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { cn } from "@/utils";

interface SliderProps {
  isSmallSize?: boolean;
  coverImages?: Array<{ img: string; name: string }>;
  banners?: Array<string>;
  isDishesCarousel?: boolean;
}

export const Slider = ({
  isSmallSize = false,
  coverImages,
  banners,
  isDishesCarousel = false,
}: SliderProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container">
      <SliderComponent
        {...settings}
        className={cn(
          isSmallSize ? "w-[90%] xl:w-[80%]!" : "w-full",
          "m-auto items-center text-center"
        )}
      >
        {coverImages &&
          coverImages.map(i => {
            return (
              <div
                key={i.name}
                className={cn(
                  isSmallSize
                    ? "border-primary/20 mb-10 h-[300px] rounded-md border-2 shadow-lg transition-all duration-300 hover:shadow-xl sm:h-[300px] lg:h-[550px]"
                    : "h-[219px] sm:h-[300px] lg:h-screen",

                  "relative flex w-full items-center justify-center overflow-hidden"
                )}
              >
                <Image
                  src={i.img}
                  alt={i.name}
                  fill
                  sizes="100vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 hover:scale-105 sm:object-fill"
                />
              </div>
            );
          })}
        {banners &&
          banners.map((i, index) => {
            return (
              <div
                key={index}
                className={cn(
                  isDishesCarousel
                    ? "h-[500px]! w-full!"
                    : "h-[200px] w-full sm:h-[300px] lg:h-[550px]",
                  "border-primary/20 relative mb-10 flex items-center justify-center overflow-hidden rounded-md border-2 shadow-lg transition-all duration-300 hover:shadow-xl"
                )}
              >
                <Image
                  src={i}
                  alt={`img-${index}`}
                  fill
                  loading="lazy"
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 hover:scale-105 sm:object-fill"
                />
              </div>
            );
          })}
      </SliderComponent>
    </div>
  );
};
