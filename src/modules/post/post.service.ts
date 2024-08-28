import {BadRequestException, Injectable} from '@nestjs/common';
import {PostModel} from "./models/post.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreatePostResponse} from "./response";
import {AppError} from "../../common/constants/errors";

@Injectable()
export class PostService {
    constructor(@InjectModel(PostModel) private readonly postRepository: typeof PostModel) {}

    async createPost (user, dto): Promise<CreatePostResponse> {
        try {
            const post = {
                userId: user.id,
                name: dto.name,
                description: dto.description,
            }
            const newPost = await this.postRepository.create(post)
            return newPost
        } catch (e) {
            throw new Error(e)
        }
    }

    async getAllPosts (userId, page, count) {
        try {
            return await this.postRepository.findAndCountAll({
                where: {userId},
                offset: page * count, limit: count
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    async updatePost (id: string, postDto): Promise<CreatePostResponse> {
        try {
            const post = await this.postRepository.findOne({where: {id}})
            if (!post) throw new BadRequestException(AppError.POST_NOT_EXIST)
            post.name = postDto.name
            post.description = postDto.description
            await post.save()
            return postDto
        } catch (e) {
            throw new Error(e)
        }
    }

    async deletePost (userId: string, id: string): Promise<boolean> {
        try {
            await this.postRepository.destroy({where: {id, userId: userId}})
            return true
        } catch (e) {
            throw new Error(e)
        }
    }



}
