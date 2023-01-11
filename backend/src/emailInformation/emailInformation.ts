import { EmailActionEnum } from './enums';

export const emailInformation = {
    [EmailActionEnum.LOGIN]: {
        subject: 'Hi!!!',
        templateName: 'login',
    },
    [EmailActionEnum.LOGOUT]: {
        subject: 'See you soon!!!',
        templateName: 'logout',
    },
    [EmailActionEnum.REGISTRATION]: {
        subject: 'Welcome!!!',
        templateName: 'registration',
    },

    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Don\' worry you always car change you password!!!',
        templateName: 'forgotPassword',
    },

    [EmailActionEnum.CHANGE_PASSWORD]: {
        subject: 'You password is change!!!',
        templateName: 'changePassword',
    },

};
