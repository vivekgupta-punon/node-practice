import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import User from "./UserModel"

@Entity({ name: "logs" })
export default class Log
{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    comment: string

    @Column()
    type: number

    @Column()
    created_by: number

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

}