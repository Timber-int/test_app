import { DeleteResult } from 'typeorm';
import { IComment } from '../entity';
import { commentRepository } from '../repository';

class CommentService {
    public async getAllComments(): Promise<IComment[]> {
        return commentRepository.getAllComments();
    }

    public async getCommentById(id:number): Promise<IComment | undefined> {
        return commentRepository.getCommentById(id);
    }

    public async deleteCommentById(id:number): Promise<DeleteResult> {
        return commentRepository.deleteCommentById(id);
    }

    public async createComment(commentData: IComment): Promise<IComment> {
        return commentRepository.createComment(commentData);
    }
}

export const commentService = new CommentService();
