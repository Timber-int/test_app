import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { CONSTANTS } from '../constants';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { IRequestExtended } from '../interface';
import { STATUS } from '../errorCode';

class FileMiddleware {
    async checkIsPhotoFileExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            if (!req.files?.photo) {
                next(new ErrorHandler(MESSAGE.PHOTO_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            const {
                name,
                size,
                mimetype,
            } = req.files.photo as UploadedFile;

            if (size > CONSTANTS.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`${MESSAGE.TO_BIG_PHOTO_FILE}: ${name}`));
                return;
            }

            if (!CONSTANTS.PHOTOS_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler(MESSAGE.WRONG_FILE_FORMAT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    async checkIsPhotoToUpdateFileExist(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            if (!req.files?.photo) {
                next();
                return;
            }

            const {
                name,
                size,
                mimetype,
            } = req.files?.photo as UploadedFile;

            if (size > CONSTANTS.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`${MESSAGE.TO_BIG_PHOTO_FILE}: ${name}`));
                return;
            }

            if (!CONSTANTS.PHOTOS_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler(MESSAGE.WRONG_FILE_FORMAT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
