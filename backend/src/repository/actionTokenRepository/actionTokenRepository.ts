import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { ActionToken, IActionToken } from '../../entity';
import { IActionTokenRepository } from './actionTokenRepositoryInterface';
import { IActionTokenDataToSave } from '../../interface';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    public async getActionTokenByUserId(userId: number): Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne({ userId });
    }

    public async saveActionTokeToDB(token: IActionTokenDataToSave): Promise<ActionToken> {
        return getManager().getRepository(ActionToken).save(token);
    }

    public async deleteActionTokenById(userId: number): Promise<DeleteResult> {
        return getManager().getRepository(ActionToken).delete({ userId });
    }
}

export const actionTokenRepository = new ActionTokenRepository();
