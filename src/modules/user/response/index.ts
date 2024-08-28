import {IS_ARRAY, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PublicUser {
    @ApiProperty()
    @IsString()
    id: string

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
export class AuthUserResponse {
    @ApiProperty()
    user: PublicUser

    @ApiProperty()
    @IsString()
    token: string
}

export class AllUsers {
    @ApiProperty()
    rows: Array<PublicUser>

    @ApiProperty()
    count: number
}
