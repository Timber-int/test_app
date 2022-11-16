export interface ITokenPair {
    accessToken: string,
    refreshToken: string;
}

export interface ITokenDataToSave {
    accessToken: string,
    refreshToken: string;
    userId: number;
}
export interface IActionTokenDataToSave {
    actionToken: string,
    userId: number;
}

export interface IUserPayload {
    userId: number,
    userEmail: string,
}
