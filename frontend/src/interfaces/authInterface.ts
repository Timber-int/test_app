export interface IUser {
    id?:number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string,
}

export interface IRegistration {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export interface ILogin {
    email: string,
    password: string,
}

export interface ITokenPair {
    accessToken: string,
    refreshToken: string;
}

export interface IUserResponse extends ITokenPair{
    user:IUser
}
