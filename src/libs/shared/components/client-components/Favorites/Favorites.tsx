"use client";
import useGetFavoriteConcepts from "@/features/hooks/ConceptsHooks/useGetFavoriteConcepts";
import useGetCheckInConcepts from "@/features/hooks/ConceptsHooks/useGetCheckInConcepts";
import { ROUTES } from "@/constants";
import { Spinner } from "@/libs/shared/components";
import { FavoriteConceptsView } from "./FavoriteRestaurantsView";
import { EmptyFavoriteRestaurant } from "./EmptyFavoriteRestaurant";
import { useRouter } from "@/libs/next-intl/navigation";

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
    <div className="mx-auto mt-20 mb-10 flex w-full flex-col gap-4 px-4 text-center sm:mt-42 sm:w-[60%] lg:h-screen">
      <hr className="h-[2px] w-full bg-gray-300" />
      <div className="mx-auto flex w-full flex-col gap-8 lg:mx-0 lg:flex-row">
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
