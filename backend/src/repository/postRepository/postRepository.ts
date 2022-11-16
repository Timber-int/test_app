import {
    DeleteResult,
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IPost, Post } from '../../entity';
import { IPostRepository } from './postRepositoryInterface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async createPost(post: IPost): Promise<IPost> {
        return getManager()
            .getRepository(Post)
            .save(post);
    }

    public async getPostById(id: number): Promise<IPost | undefined> {
        return getManager()
            .getRepository(Post)
            .findOne({ id });
    }

    public async deletePostById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(Post)
            .delete({ id });
    }

    public async findPostByTitle(title: Partial<IPost>): Promise<IPost | undefined> {
        return getManager()
            .getRepository(Post)
            .createQueryBuilder('post')
            .where('post.title = :title', { title })
            .getOne();
    }

    public async getAllPosts(): Promise<IPost[]> {
        return getManager()
            .getRepository(Post)
            .find();
    }

    public async updatePostById(id: number, postData: Partial<IPost>): Promise<UpdateResult> {
        return getManager()
            .getRepository(Post)
            .update({ id },
                postData,
            );
    }
}

export const postRepository = new PostRepository();
