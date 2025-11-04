/* eslint-disable react/display-name */

jest.mock("@/libs/shared/components/MapComponent", () => () => (
  <div>Mock MapComponent</div>
));

jest.mock("@/libs/shared/components", () => ({
  SliderComponent: () => <div>Mock SliderComponent</div>,
  Contact: () => <div>Mock Contact</div>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LayoutMotion: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@/pages/about/components/WeOfferSection", () => () => (
  <div>Mock WeOfferSection</div>
));
import { screen } from "@testing-library/react";
import About from "@/pages/about";
import { renderWithProviders } from "@/libs/test-utils/render-with-providers";

describe("About Page", () => {
  test("email", () => {
    renderWithProviders(<About />);

    expect(
      screen.getByText(/Nguyendaithang23061997@gmail.com/)
    ).toBeInTheDocument();
  });
});
