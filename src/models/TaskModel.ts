import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import User from "./UserModel"


export class TaskEnum
{
    static LEVEL_ONE     = 1;
    static LEVEL_TWO     = 2;
    static LEVEL_THREE   = 2;

    static levels = {
        LEVEL_ONE     : "Level 1",
        LEVEL_TWO     : "Level 2",
        LEVEL_THREE   : "Level 3",
    }

    static STATUS_PENDING    = 1;
    static STATUS_IN_PROGRESS= 2;
    static STATUS_COMPLETED  = 3;
    static STATUS_CANCELLED  = 4;
    static STATUS_EXPIRED    = 5;

    static statuses = {
        STATUS_PENDING    : "Pending",
        STATUS_IN_PROGRESS: "In Progress",
        STATUS_COMPLETED  : "Completed",
        STATUS_CANCELLED  : "Cancelled",
        STATUS_EXPIRED    : "Backlog"
    }
}


@Entity({ name: "tasks" })
export default class Task
{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    task: string

    @Column()
    user_id: number

    @Column({ default: TaskEnum.STATUS_PENDING })
    status: number

    @Column({ default: TaskEnum.LEVEL_ONE })
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