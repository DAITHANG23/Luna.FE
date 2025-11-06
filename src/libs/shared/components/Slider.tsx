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
          isSmallSize ? "w-[90%] xl:w-[80%]! " : "w-full",
          " text-center items-center m-auto"
        )}
      >
        {coverImages &&
          coverImages.map((i) => {
            return (
              <div
                key={i.name}
                className={cn(
                  isSmallSize
                    ? "h-[300px] sm:h-[300px] lg:h-[550px] border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-md mb-10"
                    : "h-[219px] sm:h-[300px] lg:h-screen",

                  "w-full flex items-center justify-center overflow-hidden relative"
                )}
              >
                <Image
                  src={i.img}
                  alt={i.name}
                  fill
                  sizes="100vw"
                  loading="lazy"
                  className="object-cover sm:object-fill hover:scale-105 transition-transform duration-500"
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
                    ? "w-full! h-[500px]!"
                    : "w-full h-[200px] sm:h-[300px] lg:h-[550px]",
                  "flex items-center justify-center overflow-hidden relative border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-md mb-10"
                )}
              >
                <Image
                  src={i}
                  alt={`img-${index}`}
                  fill
                  loading="lazy"
                  sizes="100vw"
                  className="object-cover sm:object-fill hover:scale-105 transition-transform duration-500"
                />
              </div>
            );
          })}
      </SliderComponent>
    </div>
  );
};
