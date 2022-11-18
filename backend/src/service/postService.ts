import { DeleteResult, UpdateResult } from 'typeorm';
import { IPost } from '../entity';
import { postRepository } from '../repository';

class PostService {
    public async createPost(post: IPost): Promise<IPost> {
        return postRepository.createPost(post);
    }

    public async getPostById(id: number): Promise<IPost | undefined> {
        return postRepository.getPostById(id);
    }

    public async deletePostById(id: number): Promise<DeleteResult> {
        return postRepository.deletePostById(id);
    }

    public async findPostByTitle(title: Partial<IPost>): Promise<IPost | undefined> {
        return postRepository.findPostByTitle(title);
    }

    public async getAllPosts(): Promise<IPost[]> {
        return postRepository.getAllPosts();
    }

    public async updatePostById(id: number, postData: Partial<IPost>): Promise<UpdateResult> {
        return postRepository.updatePostById(id, postData);
    }

    public async changePostViewsById(post: IPost): Promise<UpdateResult> {
        return postRepository.changePostViewsById(post);
    }
}

export const postService = new PostService();
