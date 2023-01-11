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
