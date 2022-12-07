import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interface';
import { fileService, postService } from '../service';
import { IPost, IUser } from '../entity';

class PostController {
    public async getAllPosts(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                page,
                perPage,
                viewsSort,
                ...other
            } = req.query;

            const posts = await postService.getAllPosts(other, Number(perPage), Number(page), viewsSort as string);

            res.json({ posts });
        } catch (e) {
            next(e);
        }
    }

    public async getAllPostVideo(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const postVideos = await postService.getAllPostVideo();

            res.json({ postVideos });
        } catch (e) {
            next(e);
        }
    }

    public async createPostVideo(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const postVideo = req.files?.video as UploadedFile;

            const postVideoPath = await fileService.saveFile(postVideo, 'mp4');

            const video = await postService.createPostVideo({
                ...req.body,
                video: postVideoPath,
            });

            res.json({ video });
        } catch (e) {
            next(e);
        }
    }

    public async createPost(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { firstName, lastName } = req.user as IUser;

            const postPhoto = req.files?.photo as UploadedFile;

            const postPhotoPath = await fileService.saveFile(postPhoto, 'jpg');

            const post = await postService.createPost({
                ...req.body,
                photo: postPhotoPath,
                authorFirstName: firstName,
                authorLastName: lastName,
            });

            res.json({ post });
        } catch (e) {
            next(e);
        }
    }

    public async updatePostById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            let postPhotoPath;

            const postPhoto = req.files?.photo as UploadedFile;

            if (postPhoto) {
                postPhotoPath = await fileService.saveFile(postPhoto, 'jpg');
            }

            await postService.updatePostById(Number(id),
                postPhotoPath
                    ? { ...req.body, photo: postPhotoPath } : { ...req.body });

            const post = await postService.getPostById(Number(id));

            res.json({ post });
        } catch (e) {
            next(e);
        }
    }

    public async deletePostById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const post = await postService.getPostById(Number(req.params.id));

            await postService.deletePostById(Number(req.params.id));

            res.json({ post });
        } catch (e) {
            next(e);
        }
    }

    public async deleteVideoById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const video = await postService.getVideoById(Number(req.params.id));

            await postService.deletePostVideoById(Number(req.params.id));

            res.json({ video });
        } catch (e) {
            next(e);
        }
    }

    public async changePostViewsById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            // Доробити
            const postFromDB = req.post as IPost;

            await postService.changePostViewsById(postFromDB);

            const post = await postService.getPostById(Number(req.params.id));

            res.json({ post });
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostController();
