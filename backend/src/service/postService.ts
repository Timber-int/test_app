import { DeleteResult, UpdateResult } from 'typeorm';
import { IPost, IPostVideo } from '../entity';
import { postRepository } from '../repository';
import { IPaginationResponse } from '../interface';

class PostService {
    public async createPost(post: IPost): Promise<IPost> {
        return postRepository.createPost(post);
    }

    public async createPostVideo(postVideoData: IPostVideo): Promise<IPostVideo> {
        return postRepository.createPostVideo(postVideoData);
    }

    public async getPostById(id: number): Promise<IPost | undefined> {
        return postRepository.getPostById(id);
    }

    public async getVideoById(id: number): Promise<IPostVideo | undefined> {
        return postRepository.getVideoById(id);
    }

    public async deletePostById(id: number): Promise<DeleteResult> {
        return postRepository.deletePostById(id);
    }

    public async deletePostVideoById(id: number): Promise<DeleteResult> {
        return postRepository.deletePostVideoById(id);
    }

    public async getAllPostVideo(): Promise<IPostVideo[]> {
        return postRepository.getAllPostVideo();
    }

    public async findPostByTitle(title: Partial<IPost>): Promise<IPost | undefined> {
        return postRepository.findPostByTitle(title);
    }

    public async getAllPosts(filterObject: Partial<IPost>, perPage: number, page: number, viewsSort: string): Promise<IPaginationResponse<IPost>> {
        return postRepository.getAllPosts(filterObject, perPage, page, viewsSort);
    }

    public async updatePostById(id: number, postData: Partial<IPost>): Promise<UpdateResult> {
        return postRepository.updatePostById(id, postData);
    }

    public async changePostViewsById(post: IPost): Promise<UpdateResult> {
        return postRepository.changePostViewsById(post);
    }
}

export const postService = new PostService();
