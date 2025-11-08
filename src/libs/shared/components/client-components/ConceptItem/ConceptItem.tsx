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

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutate: favoriteConcepts } = useFavoriteConcepts();

  const { mutate: checkInConcept } = useCheckInConcept();

  const typeConcept = useMemo(() => {
    if (!concept?.type) return "OTHER";
    return (
      DEFAULT_CONCEPTS_LIST.find((i) => i.value === concept?.type)?.label || ""
    );
  }, [concept]);

  const handleClickFavorite = useCallback(
    async (idConcept: string) => {
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

      setIsFavoriteConcept((prev) => !prev);
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

      setIsCheckedInConcept((prev) => !prev);
    },
    [isCheckedInConcept, userData, refetch, checkInConcept, queryClient]
  );

  return (
    <div className="relative h-104 sm:h-88 2xl:h-112.5 flex flex-col border-2 border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-xl duration-300 transition-all ease-in-out dark:bg-gray-700 dark:shadow-md dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] dark:transition-shadow dark:duration-300">
      <ModalCarousel
        setOpen={setIsOpenModalImageList}
        open={isOpenModalImageList}
        imagesList={concept?.images}
      />
      <Modal open={isOpenModal} setOpen={setIsOpenModal}>
        <Review
          concept={concept}
          setIsOpenModal={setIsOpenModal}
          isOpenModal={isOpenModal}
        />
      </Modal>
      <div className="w-full h-[250px] sm:h-[200px] 2xl:h-[300px] relative">
        <Image
          src={concept?.imageCover}
          alt={concept?.name}
          fill
          sizes="(max-width: 2560px) 600px, (max-width: 1440px) 322px, (max-width: 1024px) 464px, (max-width: 768px) 336px, (max-width: 425px) 389px"
          className="rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none"
          loading="lazy"
          onClick={() => onClickConcept(concept.name)}
        />
        <button
          className="absolute bottom-4 right-4 text-white w-6 h-6"
          onClick={() => setIsOpenModalImageList(true)}
        >
          <Square2StackIcon className="text-white w-8 h-8" />
        </button>
      </div>
      <div
        className="p-4 flex flex-col justify-start items-start gap-2"
        onClick={() => onClickConcept(concept.name)}
      >
        <h3 className="text-primary-text">{concept?.name || ""}</h3>
        <p className="text-primary-text text-sm">{typeConcept}</p>
        <p className="text-primary-text text-sm">{concept?.address || ""}</p>
        <div className="text-primary text-sm flex gap-1 justify-center items-center font-bold">
          <StarIcon />
          {concept?.avgRatings || 0}
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
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
          <hr className="w-full bg-gray-300 h-[2px] mt-0!" />
          <div className="mb-4 flex mx-4">
            <button
              className="border border-black rounded-full py-[2px] px-3 text-xs font-normal hover:bg-gray-200 dark:border-white dark:text-white dark:hover:bg-black"
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              Review
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-[10px] right-[10px] flex gap-3">
        <button
          className="border-none bg-white rounded-full p-1 cursor-pointer"
          onClick={() => {
            handleClickCheckIn(concept?._id);
          }}
        >
          {isCheckedInConcept ? (
            <CheckCircleIconSolid className="text-green-500 w-5 h-5" />
          ) : (
            <CheckCircleIcon className="text-black w-5 h-5" />
          )}
        </button>
        <button
          className="border-none bg-white rounded-full p-1 cursor-pointer"
          onClick={() => handleClickFavorite(concept?._id)}
        >
          <div className="w-5 h-5">
            {isFavoriteConcept ? (
              <HeartIconSolid className="text-primary w-full h-full" />
            ) : (
              <HeartIcon className="text-black w-full h-full" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default memo(ConceptItem);
