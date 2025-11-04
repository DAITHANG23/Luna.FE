import { Contact } from "@/libs/shared/components";
import { render, screen } from "@testing-library/react";

describe("Contact component", () => {
  beforeEach(() => {
    render(<Contact />);
  });

  it("renders Facebook link", () => {
    const facebookLink = screen.getByRole("link", { name: /facebook/i });
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute(
      "href",
      "https://www.facebook.com/DomNguyen2306"
    );
  });

  it("renders LinkedIn link", () => {
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/domnguyen236/"
    );
  });

  it("renders GitHub link", () => {
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/DAITHANG23");
  });
});
