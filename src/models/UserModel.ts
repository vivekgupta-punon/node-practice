import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export class UserEnum
{
    static STATUS_ACTIVE = 1
    static STATUS_INACTIVE = 0

    static statuses = {
        STATUS_ACTIVE   : "Active",
        STATUS_INACTIVE : "Inactive"
    }
}


@Entity({ name: "users" })
export default class User
{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    mobile: string

    @Column()
    password: string

    @Column({ nullable: true })
    token: string

    @Column({ default: UserEnum.STATUS_ACTIVE })
    status: number
}