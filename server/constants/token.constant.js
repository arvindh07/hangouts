export const ACCESS_TOKEN = "jwtAccess";
export const REFRESH_TOKEN = "jwtRefresh";
// 60 seconds
export const ACCESS_TOKEN_EXPIRY = 60 * 1000;
export const ACCESS_TOKEN_IN_STR = "60s";
// 5 minutes
export const REFRESH_TOKEN_EXPIRY = 5 * 60 * 1000;
export const REFRESH_TOKEN_IN_STR = "2m";

export const JWT_REFRESH_PATH = "/api/user/refresh";

const tokenOptions = {
    httpOnly: true,
    secure: process.env.ENV === "production",
    sameSite: "Strict"
}

export const accessTokenOptions = {
    ...tokenOptions,
    path: "/",
    maxAge: ACCESS_TOKEN_EXPIRY
}

export const refreshTokenOptions = {
    ...tokenOptions,
    path: JWT_REFRESH_PATH,
    maxAge: REFRESH_TOKEN_EXPIRY
}