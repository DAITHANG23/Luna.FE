"use client";
import { ConceptModel } from "@/@types/models";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState, memo } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import {
  GET_CHECK_IN_CONCEPTS_KEY,
  GET_CONCEPTS_FAVORITE_KEY,
} from "@app/constants/queryKeys";
import useFavoriteConcepts from "@/features/hooks/ConceptsHooks/useFavoriteConcepts";
import apiService from "@/api/endpoints/index";
import useGetDataUser from "@/features/hooks/AccountHooks/useGetDataUser";
import { useQueryClient } from "@tanstack/react-query";
import useCheckInConcept from "@/features/hooks/ConceptsHooks/useCheckInConcept";
import { StarIcon } from "@/libs/assets";
import { Review } from "@shared/components/client-components/ConceptItem";
import { Modal, ModalCarousel } from "@/libs/shared/components";
import { DEFAULT_CONCEPTS_LIST } from "@/constants";
import RequestLogin from "./RequestLogin";

export type DialogType = "login" | "review" | null;
interface ConceptItemProps {
  concept: ConceptModel;
  isReviewBtn?: boolean;
  onClickConcept: (nameConcept: string) => void;
}
const ConceptItem = ({
  concept,
  isReviewBtn = false,
  onClickConcept,
}: ConceptItemProps) => {
  const { userData, refetch } = useGetDataUser();

  const queryClient = useQueryClient();
  const isFavoriteConceptSelected = userData?.data.data.favorites?.includes(
    concept._id
  );

  const isCheckInConceptSelected =
    userData?.data.data.checkInConcepts?.includes(concept._id);

  const [isFavoriteConcept, setIsFavoriteConcept] = useState(
    isFavoriteConceptSelected
  );

  const [isCheckedInConcept, setIsCheckedInConcept] = useState(
    isCheckInConceptSelected
  );

  useEffect(() => {
    if (isFavoriteConceptSelected) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFavoriteConcept(isFavoriteConceptSelected);
    }

    if (isCheckInConceptSelected) {
      setIsCheckedInConcept(isCheckInConceptSelected);
    }
  }, [isFavoriteConceptSelected, isCheckInConceptSelected]);

  const [isOpenModalImageList, setIsOpenModalImageList] = useState(false);

  const [openModal, setOpenModal] = useState<DialogType>(null);

  const { mutate: favoriteConcepts } = useFavoriteConcepts();

  const { mutate: checkInConcept } = useCheckInConcept();

  const typeConcept = useMemo(() => {
    if (!concept?.type) return "OTHER";
    return (
      DEFAULT_CONCEPTS_LIST.find(i => i.value === concept?.type)?.label || ""
    );
  }, [concept]);

  const handleClickFavorite = useCallback(
    async (idConcept: string) => {
      if (!userData) {
        return setOpenModal("login");
      }
      const formData = {
        idConcept: idConcept,
        userId: userData?.data.data._id || "",
      };
      if (isFavoriteConceptSelected) {
        await apiService.user.deleteFavoriteConcept({ formData });
        queryClient.invalidateQueries({
          queryKey: [GET_CONCEPTS_FAVORITE_KEY],
        });
        refetch();
      } else {
        favoriteConcepts(formData);
      }

      setIsFavoriteConcept(prev => !prev);
    },
    [
      isFavoriteConceptSelected,
      userData,
      refetch,
      favoriteConcepts,
      queryClient,
    ]
  );

  const handleClickCheckIn = useCallback(
    async (idConcept: string) => {
      if (!userData) {
        return setOpenModal("login");
      }
      const formData = {
        idConcept: idConcept,
        userId: userData?.data.data._id || "",
      };
      if (isCheckedInConcept) {
        await apiService.user.deleteCheckInConcept({ formData });
        queryClient.invalidateQueries({
          queryKey: [GET_CHECK_IN_CONCEPTS_KEY],
        });
        refetch();
      } else {
        checkInConcept(formData);
      }

      setIsCheckedInConcept(prev => !prev);
    },
    [isCheckedInConcept, userData, refetch, checkInConcept, queryClient]
  );

  return (
    <div className="relative flex h-104 cursor-pointer flex-col rounded-lg border-2 border-gray-300 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl sm:h-88 2xl:h-112.5 dark:bg-gray-700 dark:shadow-md dark:transition-shadow dark:duration-300 dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)]">
      <ModalCarousel
        setOpen={setIsOpenModalImageList}
        open={isOpenModalImageList}
        imagesList={concept?.images}
      />
      <Modal open={openModal} setOpen={setOpenModal}>
        {openModal === "review" && (
          <Review
            concept={concept}
            setIsOpenModal={setOpenModal}
            isOpenModal={openModal}
          />
        )}

        {openModal === "login" && <RequestLogin />}
      </Modal>
      <div className="relative h-[250px] w-full sm:h-[200px] 2xl:h-[300px]">
        <Image
          src={concept?.imageCover}
          alt={concept?.name}
          fill
          sizes="(max-width: 2560px) 600px, (max-width: 1440px) 322px, (max-width: 1024px) 464px, (max-width: 768px) 336px, (max-width: 425px) 389px"
          className="rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none"
          loading="lazy"
          onClick={() => onClickConcept(concept.name)}
        />
        <button
          className="absolute right-4 bottom-4 h-6 w-6 text-white"
          onClick={() => setIsOpenModalImageList(true)}
        >
          <Square2StackIcon className="h-8 w-8 text-white" />
        </button>
      </div>
      <div
        className="flex flex-col items-start justify-start gap-2 p-4"
        onClick={() => onClickConcept(concept.name)}
      >
        <h3 className="text-primary-text">{concept?.name || ""}</h3>
        <p className="text-primary-text text-sm">{typeConcept}</p>
        <p className="text-primary-text text-sm">{concept?.address || ""}</p>
        <div className="text-primary flex items-center justify-center gap-1 text-sm font-bold">
          <StarIcon />
          {concept?.avgRatings || 0}
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
          <a
            href="#"
            className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
          >
            {concept?.reviews?.length} reviews
          </a>
        </div>
      </div>
      {isReviewBtn && (
        <div>
          <hr className="mt-0! h-[2px] w-full bg-gray-300" />
          <div className="mx-4 mb-4 flex">
            <button
              className="rounded-full border border-black px-3 py-[2px] text-xs font-normal hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-black"
              onClick={() => {
                setOpenModal("review");
              }}
            >
              Review
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-[10px] right-[10px] flex gap-3">
        <button
          className="cursor-pointer rounded-full border-none bg-white p-1"
          onClick={() => {
            handleClickCheckIn(concept?._id);
          }}
        >
          {isCheckedInConcept ? (
            <CheckCircleIconSolid className="h-5 w-5 text-green-500" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-black" />
          )}
        </button>
        <button
          className="cursor-pointer rounded-full border-none bg-white p-1"
          onClick={() => handleClickFavorite(concept?._id)}
        >
          <div className="h-5 w-5">
            {isFavoriteConcept ? (
              <HeartIconSolid className="text-primary h-full w-full" />
            ) : (
              <HeartIcon className="h-full w-full text-black" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default memo(ConceptItem);
