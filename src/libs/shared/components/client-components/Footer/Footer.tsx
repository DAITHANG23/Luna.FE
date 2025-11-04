"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Contact } from "@/libs/shared/components";
import { useTranslations } from "next-intl";

const Footer = () => {
  const currentYear = moment().year();
  const t = useTranslations("Translation");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return (
    <div className="text-white grid grid-cols-1 text-center sm:grid-cols-3 w-full p-[50px] gap-[20px] lg:gap-[50px] bg-[#1C252E]">
      <div className="w-full sm:w-[200px] lg:w-[350px]">
        <h4 className="text-white">{t(`footer.title`)}</h4>
        <p className="text-gray-400">{t(`footer.address`)}</p>
        <p className="text-gray-400">{t(`footer.responsible`)}</p>
        <div className="pt-4 flex justify-center">
          <Contact />
        </div>
      </div>

      <div>
        <h4 className="text-white"> {t(`footer.customerSupport`)}</h4>
        <p className="text-gray-400">{t(`footer.termsOfUse`)}</p>
        <p className="text-gray-400">{t(`footer.membershipPolicy`)}</p>
        <p className="text-gray-400">{t(`footer.privacyPolicy`)}</p>
      </div>

      <div>
        <h4 className="text-white">
          {t("footer.copyright", { currentYear: String(currentYear) })}
        </h4>
      </div>
    </div>
  );
};

export default Footer;
