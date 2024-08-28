import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDTO} from "../user/dto";
import {UserLoginDTO} from "./dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthUserResponse} from "../user/response";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    auth (@Req() request) {
        const user = request.user
        return this.authService.auth(user.email)
    }

    @ApiTags('Auth')
    @ApiResponse({status: 201, type: CreateUserDTO})
    @Post('register')
    register (@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.registerUser(dto)
    }

    @ApiTags('Auth')
    @ApiResponse({status: 200, type: AuthUserResponse})
    @Post('login')
    login (@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
        const res = this.authService.loginUser(dto)
        console.log(res)
        return res
    }
}
