import { Locale } from "next-intl";

export interface IRoute {
  name: string;
  route: string;
  logo: string;
  width: number;
  height: number;
}

export interface LanguageListType {
  name: "english" | "vietnamese";
  value: Locale;
  img: string;
}

export interface GetErrorMessageProps {
  translate: any;
  errorCode: string;
  data: Record<string, string>;
}
