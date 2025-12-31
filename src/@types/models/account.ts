export interface UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  password: string;
  passwordConfirm: string;
  email: string;
  gender: string;
  numberPhone: string;
  role: string;
  avatar?: File | string;
  avatarUrl?: string;
  fullName: string;
  googleId?: string;
  favorites: Array<string>;
  checkInConcepts: Array<string>;
  refreshToken?: string;
}
export type Gender = "male" | "female";
export interface UserLogin extends Partial<UserModel> {}

export interface LoginResponse {
  sessionId?: string;
  data: {
    user: UserLogin;
  };
  status: string;
}

export interface VerifyOtpCreateAccountResponse {
  status: string;
}

export interface UserResponse {
  data: { data: UserModel };
  status: string;
}

export interface ErrorObject {
  messageError: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
  name?: string;
  expiredAt?: string;
}
export interface ErrorResponse {
  status: string;
  error: ErrorObject;
  message: string;
}

// export interface RefreshTokenResponse {
//   accessToken: string;
// }

export interface UpdatePasswordType {
  passwordConfirm: string;
  password: string;
  passwordCurrent: string;
}

export interface ForgotPasswordType {
  email?: string;
  firstName?: string;
  dateOfBirth?: string;
  lastName?: string;
  address?: string;
  fullName?: string;
  numberPhone?: string;
  password?: string;
  passwordConfirm?: string;
  token?: string;
  otp?: string;
}
