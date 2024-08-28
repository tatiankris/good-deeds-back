import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {AllUsers, PublicUser} from "./response";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiTags('Users')
    @ApiResponse({status: 200, type: AllUsers})
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllUsers (@Query('page') page: number, @Query('count') count: number,) {
        return this.userService.findAllUsers(page, count)
    }

    @ApiTags('Users')
    @ApiResponse({status: 200, type: PublicUser})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserById (@Param() params: { id: string }) {
        const id = +params.id
        return this.userService.findUserById(id)
    }

    @ApiTags('Users')
    @ApiResponse({status: 200, type: PublicUser})
    @UseGuards(JwtAuthGuard)
    @Get('username/:username')
    getUserByUsername (@Param() params: { username: string }) {
        const username = params.username
        return this.userService.getUserByUserName(username)
    }

    @ApiTags('Users')
    @ApiResponse({status: 200, type: PublicUser})
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser (@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
        const user = request.user
        return this.userService.updateUser(user.email, updateDto)
    }

    @ApiTags('Users')
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser (@Req() request): Promise<boolean>{
        const user = request.user
        return this.userService.deleteUser(user.email)
    }
}
