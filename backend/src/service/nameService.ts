import { DeleteResult } from 'typeorm';
import { IName, Name } from '../entity';
import { nameRepository } from '../repository';

class NameService {
    public async getAllNames(): Promise<IName[]> {
        return nameRepository.getAllNames();
    }

    public async getNameById(id: number): Promise<IName | undefined> {
        return nameRepository.getNameById(id);
    }

    public async deleteNameById(id: number): Promise<DeleteResult> {
        return nameRepository.deleteNameById(id);
    }

    public async updateNameById(id: number, dataToUpdate: Partial<IName>): Promise<DeleteResult> {
        return nameRepository.updateNameById(id, dataToUpdate);
    }

    public async createName(data: Name): Promise<IName> {
        return nameRepository.createName(data);
    }
}

export const nameService = new NameService();
