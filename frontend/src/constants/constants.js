export const CONSTANTS = {
    LOADING: 'Loading',
    RESOLVED: 'Resolved',
    REJECTED: 'Rejected',

    USER: 'user',

    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    NAME_REGEX: new RegExp(/^(([a-zA-Z-]{1,30})|([а-яА-ЯЁёІіЇїҐґЄє-]{1,30}))$/u),
}

export const TokenType = {
    ACCESS: 'ACCESS',
    REFRESH: 'REFRESH',
    ACTION: 'ACTION',
};
