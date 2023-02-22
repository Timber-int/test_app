import { DeleteResult } from 'typeorm';
import { Gender, IGender } from '../entity';
import { genderRepository } from '../repository';

class GenderService {
    public async getAllGenders(): Promise<Gender[]> {
        return genderRepository.getAllGenders();
    }

    public async getGenderByTitle(title: string): Promise<Gender | undefined> {
        return genderRepository.getGenderByTitle(title);
    }

    public async getGenderById(id: number): Promise<Gender | undefined> {
        return genderRepository.getGenderById(id);
    }

    public async createGender(gender: IGender): Promise<Gender> {
        return genderRepository.createGender(gender);
    }

    public async deleteGenderById(id: number): Promise<DeleteResult> {
        return genderRepository.deleteGenderById(id);
    }
}

export const genderService = new GenderService();
