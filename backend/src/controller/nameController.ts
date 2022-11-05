import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { nameService } from '../service';

class NameController {
    public async getAllNames(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const namesData = await nameService.getAllNames();

            res.json(namesData);
        } catch (e) {
            next(e);
        }
    }

    public async getNameById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const nameData = await nameService.getNameById(Number(req.params.id));

            res.json(nameData);
        } catch (e) {
            next(e);
        }
    }

    public async deleteNameById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const nameData = await nameService.getNameById(Number(req.params.id));

            await nameService.deleteNameById(Number(req.params.id));

            res.json(nameData);
        } catch (e) {
            next(e);
        }
    }

    public async updateNameById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            await nameService.updateNameById(Number(req.params.id), req.body);

            const nameData = await nameService.getNameById(Number(req.params.id));

            res.json(nameData);
        } catch (e) {
            next(e);
        }
    }

    public async updateNameRankById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.body;

            await nameService.updateNameRankById(Number(req.params.id), Number(id));

            const nameData = await nameService.getNameById(Number(id));

            res.json(nameData);
        } catch (e) {
            next(e);
        }
    }

    public async createName(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const nameData = await nameService.createName(req.body);

            res.json(nameData);
        } catch (e) {
            next(e);
        }
    }
}

export const nameController = new NameController();
