import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IName, Name } from '../../entity';
import { INameRepository } from './nameRepositoryInterface';

@EntityRepository(Name)
class NameRepository extends Repository<Name> implements INameRepository {
    public async getAllNames(): Promise<IName[]> {
        return getManager().getRepository(Name).find();
    }

    public async getNameById(id: number): Promise<IName | undefined> {
        return getManager().getRepository(Name).findOne({ id });
    }

    public async deleteNameById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Name).delete({ id });
    }

    public async updateNameById(id: number, dataToUpdate: Partial<IName>): Promise<UpdateResult> {
        return getManager().getRepository(Name).update({ id }, dataToUpdate);
    }

    public async updateNameRankById(id: number, IdToUpdate: number): Promise<UpdateResult> {
        return getManager().getRepository(Name).update({ id }, { id: IdToUpdate });
    }

    public async createName(data: Name): Promise<IName> {
        return getManager().getRepository(Name).save(data);
    }
}

export const nameRepository = new NameRepository();
