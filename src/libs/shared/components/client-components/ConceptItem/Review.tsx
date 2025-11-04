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
        isDoneReview ? "h-[18.75rem] sm:h-[15rem]" : "h-auto sm:h-[31.25rem]",
        "w-full sm:w-[42.5rem] mt-10 mx-auto"
      )}
    >
      {isDoneReview ? (
        <div className="w-[80%] mx-auto">
          <h1 className="text-3xl text-primary-text">{t("allDone")} 🎉</h1>
          <p className="pt-10 text-primary-text">{t("thankForSharing")}</p>
          <div className="flex justify-end mt-10">
            <button
              className="bg-black text-white rounded-lg text-sm py-[10px] px-[13px] hover:scale-105 transition duration-200"
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
          <h1 className="text-3xl text-center">{t("pleaseShare")}</h1>
          <div className="mt-11">
            <p>{t("howWasTheRestaurant")}</p>
            <div className="flex gap-2 mt-4 justify-center items-center text-center">
              {Array.from({ length: 5 }, (_, i) => {
                return (
                  <div key={i}>
                    <button
                      className={cn(
                        scoreReviewConcept - 1 === i && "bg-gray-300",
                        "border rounded-md w-8 h-8 pt-1 text-center hover:bg-gray-300"
                      )}
                      onClick={() => setScoreReviewConcept(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-around mt-2 max-w-full sm:max-w-[25rem] mx-auto text-gray-500">
              <p> {t("terrible")}</p> <p> {t("amazing")}</p>
            </div>
          </div>
          <div className="mt-16">
            <label>{t("pleaseShareAnyAdditional")}</label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full mt-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("placehoderTextarea")}
              onChange={(e) => handleChangeText(e)}
            />
            {valueContentReview.trim().length > 0 &&
              valueContentReview.trim().length < 5 && (
                <p className="text-primary text-sm">{t("validateReview")}</p>
              )}
          </div>
          <div className="flex justify-end mt-10">
            <button
              className={cn(
                isInvalid
                  ? "bg-gray-400/50 hover:scale-1010"
                  : "bg-black hover:scale-105",
                "text-white rounded-lg text-sm py-[10px] px-[13px]  transition duration-200"
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
