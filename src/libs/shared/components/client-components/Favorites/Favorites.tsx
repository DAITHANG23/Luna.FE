"use client";
import useGetFavoriteConcepts from "@/features/hooks/ConceptsHooks/useGetFavoriteConcepts";
import useGetCheckInConcepts from "@/features/hooks/ConceptsHooks/useGetCheckInConcepts";
import { ROUTES } from "@/constants";
import { Spinner } from "@/libs/shared/components";
import { FavoriteConceptsView } from "./FavoriteRestaurantsView";
import { EmptyFavoriteRestaurant } from "./EmptyFavoriteRestaurant";
import { useRouter } from "@/libs/i18n/navigation";

export const Favorites = () => {
  const { conceptsData, isLoading: isLoadingGetFavoriteConcepts } =
    useGetFavoriteConcepts();

  const { checkInConceptsData, isLoading: isLoadingGetCheckInConcepts } =
    useGetCheckInConcepts();

  const favoriteConceptsData = conceptsData?.data?.data || [];

  const checkInConcepts = checkInConceptsData?.data?.data || [];

  const router = useRouter();

  if (isLoadingGetCheckInConcepts || isLoadingGetFavoriteConcepts)
    return (
      <div className="mt-34">
        <Spinner />
      </div>
    );
  return (
    <div className="flex flex-col gap-4 mt-20 sm:mt-42 mb-10 px-4 w-full lg:h-screen sm:w-[60%] text-center mx-auto">
      <hr className="w-full bg-gray-300 h-[2px]" />
      <div className="flex flex-col lg:flex-row w-full gap-8 mx-auto lg:mx-0">
        <div
          onClick={() => {
            router.push(ROUTES.FAVORITE_CONCEPTS.FAVORITE_RESTAURANTS);
          }}
        >
          {favoriteConceptsData && favoriteConceptsData.length > 0 ? (
            <FavoriteConceptsView data={favoriteConceptsData} />
          ) : (
            <EmptyFavoriteRestaurant />
          )}
        </div>
        <div
          onClick={() => {
            router.push(ROUTES.FAVORITE_CONCEPTS.CHECKIN_RESTAURANTS);
          }}
        >
          {checkInConcepts && checkInConcepts.length > 0 ? (
            <FavoriteConceptsView data={checkInConcepts} isVisitedConcept />
          ) : (
            <EmptyFavoriteRestaurant isVisitedConcept />
          )}
        </div>
      </div>
    </div>
  );
};
