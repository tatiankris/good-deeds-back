import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import {User} from "../../user/models/user.model";

@Table({
    tableName: 'posts'
})
export class PostModel extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number

    @Column
    name: string

    @Column
    description: string
}