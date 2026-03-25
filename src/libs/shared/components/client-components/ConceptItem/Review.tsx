"use client";
import { ConceptModel, ReviewPost } from "@/@types/models";
import useReviewConcept from "@/features/hooks/ConceptsHooks/useReviewConcept";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface ReviewProps {
  concept: ConceptModel;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
}
export const Review = ({
  concept,
  setIsOpenModal,
  isOpenModal,
}: ReviewProps) => {
  const t = useTranslations("Concept");

  const [scoreReviewConcept, setScoreReviewConcept] = useState<number>(0);

  const [valueContentReview, setValueContentReview] = useState("");

  const [isDoneReview, setIsDoneReview] = useState(false);
  const { mutate: reviewPost } = useReviewConcept();

  useEffect(() => {
    if (!isOpenModal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDoneReview(false);
      setScoreReviewConcept(0);
      setValueContentReview("");
    }
  }, [isOpenModal]);

  const handleSubmitReviewConcept = () => {
    const formData: ReviewPost = {
      conceptId: concept._id,
      score: scoreReviewConcept,
      content: valueContentReview,
    };

    reviewPost(formData);
    setIsDoneReview(true);

    setScoreReviewConcept(0);
    setValueContentReview("");
  };

  const isInvalid =
    scoreReviewConcept <= 0 || valueContentReview.trim().length < 2;

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValueContentReview(value);
  };
  return (
    <div
      className={cn(
        isDoneReview ? "h-75 sm:h-60" : "h-auto sm:h-125",
        "mx-auto mt-10 w-full sm:w-170"
      )}
    >
      {isDoneReview ? (
        <div className="mx-auto w-[80%]">
          <h1 className="text-primary-text text-3xl">{t("allDone")} 🎉</h1>
          <p className="text-primary-text pt-10">{t("thankForSharing")}</p>
          <div className="mt-10 flex justify-end">
            <button
              className="rounded-lg bg-black px-[13px] py-[10px] text-sm text-white transition duration-200 hover:scale-105"
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              {t("button.close")}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-primary-text">
          <h1 className="text-center text-3xl">{t("pleaseShare")}</h1>
          <div className="mt-11">
            <p>{t("howWasTheRestaurant")}</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-center">
              {Array.from({ length: 5 }, (_, i) => {
                return (
                  <div key={i}>
                    <button
                      className={cn(
                        scoreReviewConcept - 1 === i && "bg-gray-300",
                        "h-8 w-8 rounded-md border pt-1 text-center hover:bg-gray-300"
                      )}
                      onClick={() => setScoreReviewConcept(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mx-auto mt-2 flex max-w-full justify-around text-gray-500 sm:max-w-100">
              <p> {t("terrible")}</p> <p> {t("amazing")}</p>
            </div>
          </div>
          <div className="mt-16">
            <label>{t("pleaseShareAnyAdditional")}</label>
            <textarea
              id="message"
              rows={4}
              className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder={t("placehoderTextarea")}
              onChange={e => handleChangeText(e)}
            />
            {valueContentReview.trim().length > 0 &&
              valueContentReview.trim().length < 5 && (
                <p className="text-primary text-sm">{t("validateReview")}</p>
              )}
          </div>
          <div className="mt-10 flex justify-end">
            <button
              className={cn(
                isInvalid
                  ? "bg-gray-400/50 hover:scale-1010"
                  : "bg-black hover:scale-105",
                "rounded-lg px-[13px] py-[10px] text-sm text-white transition duration-200"
              )}
              onClick={handleSubmitReviewConcept}
              disabled={isInvalid}
            >
              {t("button.submit")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
