export const CONSTANTS = {
    AUTHORIZATION: 'Authorization',
    HASH_SALT: 15,
    DATA_BASE: 'service',
    LOADING: 'Loading',
    RESOLVED: 'Resolved',
    REJECTED: 'Rejected',
    SIZE:'size',
    MEASURE: 'measure',

    SELECTED_PRODUCTS_KEY: 'Products selected',

    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})'),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    NAME_REGEX: new RegExp(/^(([a-zA-Z-]{1,30})|([а-яА-ЯЁёІіЇїҐґЄє-]{1,30}))$/u),
    PHONE_REGEXP: new RegExp('^(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){10,14}(\\s*)?$'),

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,

    PHOTOS_MIMETYPES: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp', // .webp
        'image/avif', // .avif
    ],
};
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

export const PhotoFormat = {
    jpg: 'jpg',
}
