import {Column, HasMany, Model, Table} from "sequelize-typescript";
import {PostModel} from "../../post/models/post.model";

@Table({
    tableName: 'users'
})
export class User extends Model {
    @HasMany(() => PostModel, {foreignKey: 'userId'})
    posts: PostModel[]

    @Column
    firstName: string

    @Column
    username: string

    @Column
    email: string

    @Column
    password: string
}