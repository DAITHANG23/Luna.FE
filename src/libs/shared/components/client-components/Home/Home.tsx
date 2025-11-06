import { Slider } from "@/libs/shared/components";
import {
  BusinessHighlights,
  ConceptsList,
  InformationRestaurants,
} from "@/libs/shared/components/client-components/Home";
import { BANNER_IMAGES } from "@/constants";

export default function Home() {
  return (
    <div>
      <Slider coverImages={BANNER_IMAGES} />
      <BusinessHighlights />
      <InformationRestaurants />
      <ConceptsList />
    </div>
  );
}
