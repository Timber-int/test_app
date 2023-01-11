import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { Token } from '../../entity';
import { ITokenDataToSave } from '../../interface';
import { ITokenRepository } from './tokenRepositoryInterface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async getTokenByUserId(userId: number): Promise<Token | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async saveTokeToDB(token: ITokenDataToSave): Promise<Token> {
        return getManager().getRepository(Token).save(token);
    }

    public async deleteTokenById(userId: number): Promise<DeleteResult> {
        return getManager().getRepository(Token).delete({ userId });
    }
}

export const tokenRepository = new TokenRepository();
