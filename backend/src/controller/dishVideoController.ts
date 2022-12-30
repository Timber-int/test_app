import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interface';
import { dishVideoService, fileService } from '../service';

class DishVideoController {
    public async createDishVideo(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const dishVideo = req.files?.video as UploadedFile;

            const dishVideoPath = await fileService.saveFile(dishVideo, 'mp4');

            const video = await dishVideoService.createVideo({
                ...req.body,
                video: dishVideoPath,
            });

            res.json({ video });
        } catch (e) {
            next(e);
        }
    }

    public async deleteVideoById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const video = await dishVideoService.getVideoById(Number(req.params.id));

            await dishVideoService.deleteVideoById(Number(req.params.id));

            res.json({ video });
        } catch (e) {
            next(e);
        }
    }

    public async getAllVideos(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const videos = await dishVideoService.getAllVideos();

            res.json({ videos });
        } catch (e) {
            next(e);
        }
    }
}

export const dishVideoController = new DishVideoController();
