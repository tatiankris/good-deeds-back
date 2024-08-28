import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PostDTO {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string
}

export class AllPosts {
    @ApiProperty()
    rows: Array<PostDTO>

    @ApiProperty()
    count: number
}