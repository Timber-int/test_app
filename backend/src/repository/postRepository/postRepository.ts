import {
    DeleteResult,
    EntityRepository, getManager, Like, Repository, UpdateResult,
} from 'typeorm';
import { IPost, Post } from '../../entity';
import { IPaginationResponse } from '../../interface';
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

    public async getAllPosts(
        searchObject: Partial<IPost> = {},
        limit: number = 1,
        page: number = 1,
        viewsSort: string = 'false',
    ): Promise<IPaginationResponse<IPost>> {
        const skip = limit * (page - 1);

        const [posts, itemCount] = await getManager()
            .getRepository(Post)
            .findAndCount({
                where: [{ title: Like(`%${searchObject.title}%`) }],
                skip,
                take: limit,
                relations: ['comments'],
                order: viewsSort === 'true' ? { views: 'DESC' } : { createdAt: 'DESC' },
            });

        return {
            page,
            perPage: limit,
            itemCount,
            data: posts,
        };
    }

    public async updatePostById(id: number, postData: Partial<IPost>): Promise<UpdateResult> {
        return getManager()
            .getRepository(Post)
            .update({ id },
                postData,
            );
    }

    public async changePostViewsById(post: IPost): Promise<UpdateResult> {
        const { views } = post;
        return getManager()
            .getRepository(Post)
            .update({ id: post.id },
                { views: views as number + 1 },
            );
    }
}

export const postRepository = new PostRepository();
