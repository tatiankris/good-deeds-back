import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt'
import {CreateUserDTO, UpdateUserDto} from "./dto";
import {PostModel} from "../post/models/post.model";
import {AppError} from "../../common/constants/errors";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    }

    async hashPassword (password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 10)
        } catch (e) {
            throw new Error(e)
        }
    }

    async findAllUsers (page: number, count: number) {
        try {
            return await this.userRepository.findAndCountAll({ offset: page * count, limit: count, attributes: {exclude: ['password']} })
        } catch (e) {
            throw new Error(e)
        }
    }

    async findUserById (id: number) {
        try {
            return await this.userRepository.findOne({
                where: { id },
                attributes: {exclude: ['password']},
                include: {
                    model: PostModel,
                    required: false
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    async findUserByEmail (email: string) {
        try {
            return await this.userRepository.findOne({where: {email}})
        } catch (e) {
            throw new Error(e)
        }
    }

    async findUserByUserName (username: string) {
        try {
            return await this.userRepository.findOne({where: {username}})
        } catch (e) {
            throw new Error(e)
        }
    }

    async getUserByUserName (username: string) {
            const user = await this.findUserByUserName(username)
            if (!user) throw new BadRequestException(AppError.USERNAME_NOT_EXIST)
            return user
    }

    async createUser (dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            dto.password = await this.hashPassword(dto.password)
            await this.userRepository.create({
                firstName: dto.firstName,
                username: dto.username,
                email: dto.email,
                password: dto.password
            })
            return await this.userRepository.findOne({
                where: { email: dto.email },
                attributes: {exclude: ['password']}
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    async publicUser (email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({
                where: { email },
                attributes: {exclude: ['password']}
            })
        } catch (e) {
            throw new Error(e)
        }

    }

    async updateUser (email: string, dto: UpdateUserDto): Promise<UpdateUserDto>{
       try {
           await this.userRepository.update(dto, { where: {email} })
           return dto
       } catch (e) {
           throw new Error(e)
       }
    }

    async deleteUser (email): Promise<boolean> {
        try {
            await this.userRepository.destroy({ where: {email} })
            return true
        } catch (e) {
            throw new Error(e)
        }
    }
}
