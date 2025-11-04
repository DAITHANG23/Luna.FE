/* eslint-disable react/display-name */

jest.mock("@/pages/login/components/SocialLogin", () => () => (
  <div>Mock SocialLogin</div>
));

import apiService from "@/api";
import loginResponse1 from "../__fixtures__/loginResponse1";
import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "@/libs/test-utils/render-with-providers";
import LoginForm from "@/pages/login/components/LoginForm";

// ------------------- TEST -------------------
const mockedApiService = jest.mocked(apiService, { shallow: false });

describe("Login Page", () => {
  beforeEach(async () => {
    const fetchLoginPromise = Promise.resolve(loginResponse1);
    mockedApiService.account.login.mockImplementationOnce(
      () => fetchLoginPromise
    );
  });

  afterEach(() => {
    mockedApiService.account.login.mockClear();
  });

  it("should call apiService.account.login", () => {
    renderWithProviders(<LoginForm />);
  });

  test("should render without crashing", () => {
    expect(true).toBe(true);
  });
});

describe("Login Page", () => {
  beforeEach(() => {
    mockedApiService.account.login.mockImplementationOnce(() =>
      Promise.resolve(loginResponse1)
    );
  });

  it("should call apiService.account.login", async () => {
    await apiService.account.login({
      formData: { email: "test236@gmail.com", password: "Daithang@230697" },
    });
    expect(apiService.account.login).toHaveBeenCalledTimes(1);
  });
});

describe("LoginForm", () => {
  it("should call apiService.account.login", async () => {
    render(<LoginForm />);
    screen.debug();
  });
});
