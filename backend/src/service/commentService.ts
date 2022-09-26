import { IComment } from '../entity';
import { commentRepository } from '../repository';

class CommentService {
    public async getAllComments(): Promise<IComment[]> {
        return commentRepository.getAllComments();
    }

    public async createComment(commentData: IComment): Promise<IComment> {
        return commentRepository.createComment(commentData);
    }
}

export const commentService = new CommentService();
