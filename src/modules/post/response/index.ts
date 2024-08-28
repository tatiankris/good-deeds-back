import {IsNumber, IsString} from "class-validator";

export class CreatePostResponse {
    @IsNumber()
    userId: number

    @IsString()
    name: string

    @IsString()
    description: string
}