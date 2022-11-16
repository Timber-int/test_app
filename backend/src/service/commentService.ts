import { DeleteResult } from 'typeorm';
import { IComment } from '../entity';
import { commentRepository } from '../repository';

class CommentService {
    public async getAllComments(): Promise<IComment[]> {
        return commentRepository.getAllComments();
    }

    public async createComment(comment: IComment): Promise<IComment> {
        return commentRepository.createComment(comment);
    }

    public async deleteCommentById(id: number): Promise<DeleteResult> {
        return commentRepository.deleteCommentById(id);
    }

    public async getCommentByUserId(userId: number): Promise<IComment | undefined> {
        return commentRepository.getCommentByUserId(userId);
    }

    public async getCommentById(id: number): Promise<IComment | undefined> {
        return commentRepository.getCommentById(id);
    }

    public async getCommentByPostId(postId: number): Promise<IComment | undefined> {
        return commentRepository.getCommentByPostId(postId);
    }
}

export const commentService = new CommentService();
