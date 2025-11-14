/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useBreakPoints from "@/features/hooks/useBreakPoints";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface MapComponentProps {
  className?: string;
  locationsList?: any;
  lat?: number;
  lng?: number;
}

export const Map = ({
  // className,
  locationsList,
  lat = 10.8443298,
  lng = 106.6328165,
}: MapComponentProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  const { isDesktopSize } = useBreakPoints();
  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps</div>;
  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: isDesktopSize ? "400px" : "300px",
      }}
      center={{ lat, lng }}
      zoom={13}
    >
      {locationsList &&
        locationsList.map((loc: any) => (
          <Marker
            key={loc.name}
            position={{ lat: loc.lat, lng: loc.lng }}
            // icon={customMarker}
            title={loc.name}
          >
            {loc.name}
          </Marker>
        ))}
    </GoogleMap>
  );
};
