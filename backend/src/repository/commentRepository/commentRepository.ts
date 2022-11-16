import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { Comment, IComment } from '../../entity';
import { ICommentRepository } from './commentRepositoryInterface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async getAllComments(): Promise<IComment[]> {
        return getManager().getRepository(Comment).find();
    }

    public async createComment(comment: IComment): Promise<IComment> {
        return getManager().getRepository(Comment).save(comment);
    }

    public async deleteCommentById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Comment).delete({ id });
    }

    public async getCommentByUserId(userId: number): Promise<IComment | undefined> {
        return getManager().getRepository(Comment).findOne({ userId });
    }

    public async getCommentById(id: number): Promise<IComment | undefined> {
        return getManager().getRepository(Comment).findOne({ id });
    }

    public async getCommentByPostId(postId: number): Promise<IComment | undefined> {
        return getManager().getRepository(Comment).findOne({ postId });
    }
}

export const commentRepository = new CommentRepository();
