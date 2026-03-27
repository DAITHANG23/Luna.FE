"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    className="mr-2"
  >
    <path
      fill="currentColor"
      d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
    />
  </svg>
);

interface SocialLoginProps {
  isButtonGoogleBelow?: boolean;
}

const SocialLogin = ({ isButtonGoogleBelow = false }: SocialLoginProps) => {
  const t = useTranslations("Translation");
  const handleGoogleLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/google`;
  };

  const line = useMemo(() => {
    return (
      <div className="relative flex items-center py-2">
        <div className="border-border border-primary-text grow border-t"></div>
        <span className="text-muted-foreground text-primary-text mx-4 shrink text-sm">
          {t("login.continueWith")}
        </span>
        <div className="border-border border-primary-text grow border-t"></div>
      </div>
    );
  }, [t]);

  return (
    <div
      className="animate-fade-up w-full space-y-4"
      style={{ animationDelay: "0.1s" }}
    >
      {!isButtonGoogleBelow && line}

      <button
        type="button"
        className="text-primary-text ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground dark:hover:text-accent-foreground shadow-button hover:shadow-button-hover inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon />
        <span>Google</span>
      </button>

      {isButtonGoogleBelow && line}
    </div>
  );
};

export default SocialLogin;
