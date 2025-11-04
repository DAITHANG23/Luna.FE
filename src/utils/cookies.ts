export const getJWTCookies = (name: string): string | null => {
  const cname = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return null;
};

export const clearJWTCookies = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getRefreshToken = () => {
  let refreshToken;
  if (process.env.NODE_ENV === "development") {
    refreshToken = localStorage.getItem("refreshToken");
  } else if (process.env.NODE_ENV === "production") {
    refreshToken = getJWTCookies("jwt");
  }
  return refreshToken;
};

const cookie = {
  getRefreshToken: () => {
    return getJWTCookies(`refreshToken`) as string;
  },
  getAccessToken: () => {
    return getJWTCookies(`accessToken`) as string;
  },
};

export default cookie;
