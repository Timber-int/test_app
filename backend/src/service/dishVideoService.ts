import { DeleteResult } from 'typeorm';
import { DishVideo, IDishVideo } from '../entity';
import { dishVideoRepository } from '../repository';

export class DishVideoService {
    public async createVideo(video: IDishVideo): Promise<IDishVideo> {
        return dishVideoRepository.createVideo(video);
    }

    public async deleteVideoById(id: number): Promise<DeleteResult> {
        return dishVideoRepository.deleteVideoById(id);
    }

    public async getVideoById(id: number): Promise<DishVideo | undefined> {
        return dishVideoRepository.getVideoById(id);
    }

    public async getAllVideos(): Promise<DishVideo[]> {
        return dishVideoRepository.getAllVideos();
    }
}

export const dishVideoService = new DishVideoService();
