import {IsString} from "class-validator"
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string
}