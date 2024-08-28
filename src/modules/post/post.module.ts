import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {PostModel} from "./models/post.model";

@Module({
  imports: [SequelizeModule.forFeature([PostModel])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
