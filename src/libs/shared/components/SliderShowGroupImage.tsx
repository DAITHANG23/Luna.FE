"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cn } from "@/utils/css";
import Image from "next/image";

interface SliderShowGroupImageProps {
  imagesList: Array<string>;
}

export const SliderShowGroupImage = ({
  imagesList,
}: SliderShowGroupImageProps) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 500,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "30px",
        },
      },
    ],
  };
  return (
    <div className="slider-container items-center! text-center!">
      <Slider
        {...settings}
        className={cn(
          "flex h-[300px]! w-full! items-center! gap-2 py-12 text-center! xl:h-[350px]! 2xl:h-[600px]!"
        )}
        lazyLoad="progressive"
      >
        {imagesList.map(i => (
          <div
            key={i}
            className={cn(
              "relative h-[300px]! w-[300px]! px-2 2xl:h-[500px]! 2xl:w-[500px]!"
            )}
          >
            <Image
              src={i}
              alt="test"
              fill
              className="object-fit"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
