import { STATUS } from '../errorCode';

export class ErrorHandler extends Error {
    message: string;

    status: number;

    constructor(message: string, status: number = STATUS.CODE_400) {
        super(message);
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}
