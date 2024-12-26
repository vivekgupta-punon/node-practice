import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import User from "./UserModel"

@Entity({ name: "authentication" })
export default class Authentication
{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    token: string

    @Column()
    user_id: number

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @Column()
    expires_at: string
}