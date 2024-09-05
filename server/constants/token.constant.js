export const ACCESS_TOKEN = "jwtAccess";
export const REFRESH_TOKEN = "jwtRefresh";
// 60 seconds
export const ACCESS_TOKEN_EXPIRY = 5 * 60 * 1000;
export const ACCESS_TOKEN_IN_STR = "5m";
// 5 minutes
export const REFRESH_TOKEN_EXPIRY = 10 * 60 * 1000;
export const REFRESH_TOKEN_IN_STR = "10m";

export const JWT_REFRESH_PATH = "/api/user/refresh";

const tokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax"
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