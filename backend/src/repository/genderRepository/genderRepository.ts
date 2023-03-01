import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { Gender, IGender } from '../../entity';
import { IGenderRepository } from './genderRepositoryInterface';

@EntityRepository(Gender)
class GenderRepository extends Repository<Gender> implements IGenderRepository {
    public async getAllGenders(): Promise<Gender[]> {
        return getManager()
            .getRepository(Gender)
            .find();
    }

    public async getGenderByTitle(title: string): Promise<Gender | undefined> {
        return getManager()
            .getRepository(Gender)
            .findOne({ title });
    }

    public async getGenderById(id: number): Promise<Gender | undefined> {
        return getManager()
            .getRepository(Gender)
            .findOne({ id }, { relations: ['genderCategory'] });
    }

    public async createGender(gender: IGender): Promise<Gender> {
        return getManager()
            .getRepository(Gender)
            .save(gender);
    }

    public async deleteGenderById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(Gender)
            .delete({ id });
    }
}

export const genderRepository = new GenderRepository();
