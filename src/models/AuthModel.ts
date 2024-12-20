import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import User from "./UserModel"

@Entity({ name: "authentication" })
export default class Authentication
{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    session_token: string

    @ManyToOne(() => User, (user) => user.id)
    user_id: number

    @Column()
    created_at: string

    @Column()
    updated_at: string

    @Column()
    expires_at: string
}