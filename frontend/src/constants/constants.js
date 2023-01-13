export const CONSTANTS = {
    LOADING: 'Loading',
    RESOLVED: 'Resolved',
    REJECTED: 'Rejected',

    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    NAME_REGEX: new RegExp(/^(([a-zA-Z-]{1,30})|([а-яА-ЯЁёІіЇїҐґЄє-]{1,30}))$/u),
}

export const UserRole = {
    USER: 'user',
    ADMIN: 'admin',
    MANAGER: 'manager',
    CUSTOMER: 'customer',
};

export const TokenType = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    ACTION_TOKEN: 'ACTION_TOKEN',
};

export const AUTHORIZATION = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTQ2YmFkYzk3NjQyZTZhMGYxOTY2NTFmNDJhOTRlNyIsInN1YiI6IjYxMmY1MGM5MmNlZmMyMDA0M2EzZTFjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CcSe5mX4pDvxDvyfy-4Gca2q1SABsR24vCFpq2yNHFo';
export const img_300 = 'https://image.tmdb.org/t/p/w300';
export const img_500 = 'https://image.tmdb.org/t/p/w500';
export const unavailable = 'https://www.movienewz.com/img/films/poster-holder.jpg';
export const API_KEY = '7146badc97642e6a0f196651f42a94e7';
