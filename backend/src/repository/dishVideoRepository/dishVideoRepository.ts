import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { DishVideo, IDishVideo } from '../../entity';
import { IDishVideoRepository } from './dishVideoRepositoryInterface';

@EntityRepository(DishVideo)
export class DishVideoRepository extends Repository<DishVideo> implements IDishVideoRepository {
    public async createVideo(video: IDishVideo): Promise<IDishVideo> {
        return getManager().getRepository(DishVideo).save(video);
    }

    public async deleteVideoById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(DishVideo).delete({ id });
    }

    public async getVideoById(id: number): Promise<DishVideo | undefined> {
        return getManager().getRepository(DishVideo).findOne({ id });
    }

    public async getAllVideos(): Promise<DishVideo[]> {
        return getManager().getRepository(DishVideo).find();
    }
}

export const dishVideoRepository = new DishVideoRepository();
