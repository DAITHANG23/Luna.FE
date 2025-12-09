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
          "w-full! h-[300px]! xl:h-[350px]! 2xl:h-[600px]! py-12 flex items-center! text-center! gap-2",
        )}
        lazyLoad="progressive"
      >
        {imagesList.map((i) => (
          <div
            key={i}
            className={cn(
              "w-[300px]! h-[300px]!  2xl:w-[500px]! 2xl:h-[500px]! relative px-2",
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
