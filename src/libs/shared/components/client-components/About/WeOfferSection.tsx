"use client";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { Award, Leaf, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

const WE_OFFER_LIST: Array<{
  icon: React.ReactNode;
  title: "offerTitle1" | "offerTitle2" | "offerTitle3";
  content: "contentOffer1" | "contentOffer2" | "contentOffer3";
}> = [
  {
    icon: <Award className="text-primary h-5 w-5" />,
    title: "offerTitle1",
    content: "contentOffer1",
  },
  {
    icon: <Leaf className="text-primary h-5 w-5" />,
    title: "offerTitle2",
    content: "contentOffer2",
  },
  {
    icon: <Users className="text-primary h-5 w-5" />,
    title: "offerTitle3",
    content: "contentOffer3",
  },
];

export const WeOfferSection = () => {
  const ref = useRef(null);

  const t = useTranslations("Home");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", latest => {
    if (latest > 0.2 && !visible) {
      setVisible(true);
    }
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-primary mb-6! text-center text-3xl font-semibold">
        {t("about.weOffer")}
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {WE_OFFER_LIST.map(item => (
          <div
            key={item.title}
            className="from-card bg-card to-secondary/30 border-primary/20 rounded-lg border bg-linear-to-br shadow-sm transition-shadow duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-2 p-6">
              {item.icon}
              <h3 className="text-primary">
                {t("about.offers", { offers: item.title })}
              </h3>
            </div>
            <p className="text-primary-text p-6 pt-0">
              {t("about.contentOffers", { contentOffers: item.content })}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
