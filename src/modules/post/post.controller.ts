import {Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import {AllPosts, PostDTO} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";
import {CreatePostResponse} from "./response";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @ApiTags('Posts')
    @ApiResponse({status: 200, type: PostDTO})
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createPost (@Body() postDto: PostDTO, @Req() request): Promise<CreatePostResponse> {
        const user = request.user
        return this.postService.createPost(user, postDto)
    }

    @ApiTags('Posts')
    @ApiResponse({status: 200, type: AllPosts})
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllPosts (@Query('page') page: number, @Query('count') count: number, @Req() request) {
        const userId = request.user.id
        return this.postService.getAllPosts(userId, page, count)
    }

    @ApiTags('Posts')
    @ApiResponse({status: 200, type: PostDTO})
    @UseGuards(JwtAuthGuard)
    @Patch('update')
    @ApiResponse({status: 200, type: PostDTO})
    updatePost (@Query('id') id: string, @Body() postDto: PostDTO) {
        return this.postService.updatePost(id, postDto)
    }

    @ApiTags('Posts')
    @UseGuards(JwtAuthGuard)
    @Delete()
    deletePost(@Query('id') id: string, @Req() request): Promise<boolean> {
        const userId = request.user.id
        return this.postService.deletePost(userId, id)
    }
}
