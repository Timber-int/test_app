import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { Comment, IComment } from '../entity';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
    public async getAllComments(): Promise<IComment[]> {
        return getManager().getRepository(Comment).find();
    }

    public async getCommentById(id: number): Promise<IComment | undefined> {
        return getManager().getRepository(Comment).findOne({ id });
    }

    public async deleteCommentById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Comment).delete({ id });
    }

    public async createComment(commentData: IComment): Promise<IComment> {
        return getManager().getRepository(Comment).save(commentData);
    }
}

export const commentRepository = new CommentRepository();
