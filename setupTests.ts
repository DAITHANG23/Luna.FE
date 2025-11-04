// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });

jest.mock("lodash/debounce", () => ({
  __esModule: true,
  default: jest.fn(),
}));

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

jest.mock("i18next", () => ({
  __esModule: true,
  default: {
    use: () => ({
      use: () => ({
        use: () => ({
          init: jest.fn(),
        }),
      }),
    }),
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    ready: true,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: "en",
      supportedLngs: ["en", "vn"],
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    isFallback: false,
  })),
  default: {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    beforePopState: jest.fn(),
    ready: true,
  },
}));

jest.mock("@/api", () => ({
  __esModule: true,
  default: {
    account: {
      login: jest.fn(),
    },
  },
}));

jest.mock("@/features/hooks/AccountHooks/useLoginUser", () => ({
  __esModule: true,
  default: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/libs/redux/hooks", () => ({
  ...jest.requireActual("@/libs/redux/hooks"),
  useAppDispatch: () => jest.fn(),
}));

jest.mock("@/features/hooks/useNotification", () => ({
  __esModule: true,
  default: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
  }),
}));
