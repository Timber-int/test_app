import { EntityRepository, getManager, Repository } from 'typeorm';
import { Comment, IComment } from '../entity';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
    public async getAllComments(): Promise<IComment[]> {
        return getManager().getRepository(Comment).find();
    }

    public async createComment(commentData: IComment): Promise<IComment> {
        return getManager().getRepository(Comment).save(commentData);
    }
}

export const commentRepository = new CommentRepository();
