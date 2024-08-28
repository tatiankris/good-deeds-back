import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {CreateUserDTO} from "../user/dto";
import {AppError} from "../../common/constants/errors";
import {UserLoginDTO} from "./dto";
import * as bcrypt from 'bcrypt'
import {AuthUserResponse} from "../user/response";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly tokenService: TokenService
    ) {}

    async auth(email: string) {
        const publicUser = await this.userService.publicUser(email)
        if (!publicUser) throw new BadRequestException(AppError.USER_NOT_EXIST)
        return publicUser
    }

    async registerUser (dto: CreateUserDTO): Promise<CreateUserDTO> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (existUser) throw new BadRequestException(AppError.USER_EXIST)
        const existUserName = await this.userService.findUserByUserName(dto.username)
        console.log(existUserName)
        if (existUserName) throw new BadRequestException(AppError.USERNAME_EXIST)
        return this.userService.createUser(dto)
    }

    async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)
        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if (!validatePassword) throw new BadRequestException(AppError.INCORRECT_DATA)
        const user = await this.userService.publicUser(dto.email)
        const token = await this.tokenService.generateJWTToken(user)
        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                username: user.username,
                email: user.email
            },
            token
        }
    }
}
