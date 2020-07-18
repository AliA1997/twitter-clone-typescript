// import { Model, Table, Column, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

// @Table
export abstract class Entity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({
        nullable: true
    })
    date_created?: Date;

    // @Column({
    //     nullable: true,
    //     default: null,
    //     onUpdate: true,
    //     type: 'datetime'
    // })
    @UpdateDateColumn({
        nullable: true
    })
    date_updated?: Date;

    // @Column({
    //     nullable: true,
    //     default: null,
    //     type: 'datetime'
    // })
    @DeleteDateColumn({
        nullable: true
    })
    date_deleted?: Date;
}
// export class Entity extends Model<Entity> {
//     @PrimaryKey
//     @Column
//     id: number;

//     @CreatedAt
//     creation_date: Date;

//     @UpdatedAt
//     updated_on: Date;

//     @DeletedAt
//     deleted_at: Date;
// }