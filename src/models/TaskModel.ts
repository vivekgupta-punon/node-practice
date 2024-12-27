import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import User from "./UserModel"


export class TaskEnum
{
    static LEVEL_LOW     = 1;
    static LEVEL_MEDIUM  = 2;
    static LEVEL_HIGHT   = 2;

    static levels = {
        [TaskEnum.LEVEL_LOW]     : "Low",
        [TaskEnum.LEVEL_MEDIUM]  : "Medium",
        [TaskEnum.LEVEL_HIGHT]   : "High",
    }

    static STATUS_PENDING       = 1;
    static STATUS_IN_PROGRESS   = 2;
    static STATUS_COMPLETED     = 3;
    static STATUS_TESTED        = 3;
    static STATUS_CANCELLED     = 4;
    static STATUS_EXPIRED       = 5;

    static statuses = {
        [TaskEnum.STATUS_PENDING]    : "Pending",
        [TaskEnum.STATUS_IN_PROGRESS]: "In Progress",
        [TaskEnum.STATUS_COMPLETED]  : "Completed",
        [TaskEnum.STATUS_CANCELLED]  : "Cancelled",
        [TaskEnum.STATUS_EXPIRED]    : "Backlog"
    }
}


@Entity({ name: "tasks" })
export default class Task
{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ type: "text" })
    content: string

    @Column({ nullable: true })
    user_id: number

    @Column({ default: TaskEnum.STATUS_PENDING })
    status: number

    @Column({ default: TaskEnum.LEVEL_LOW })
    level: number

    @Column()
    created_by: number
    
    @Column()
    updated_by: number
    
    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
    
    @Column()
    expires_at: string
}