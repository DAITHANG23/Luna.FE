import Image from "next/image";
import React from "react";

export const RestaurantLogin = () => {
  return (
    <div>
      <Image
        src={"/assets/images/restaurantLogin.png"}
        alt="restaurantLogin"
        width={432}
        height={324}
        className="rounded-lg shadow-xl"
      />
    </div>
  );
};
