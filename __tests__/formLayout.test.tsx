jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

import { FormLayout } from "@/libs/shared/components";
import { renderWithProviders } from "@/libs/test-utils/render-with-providers";
import { screen } from "@testing-library/react";

describe("FormLayout component", () => {
  test("Test form layout", () => {
    renderWithProviders(
      <FormLayout>
        <div>Children Content</div>
      </FormLayout>
    );
    expect(screen.getByText("Children Content")).toBeInTheDocument();
  });
});
