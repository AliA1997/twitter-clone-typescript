import { Entity, Column, OneToMany } from 'typeorm';
import { Entity as AbstractEntity } from '../Entity';
import { Rant } from '../rants/Rant';

@Entity()
export class User extends AbstractEntity {

    @Column({
        nullable: true,
        default: null,
        type: 'varchar', 
        length: 30
    })
    first_name: string;

    @Column({
        nullable: true,
        default: null,
        type: 'varchar', 
        length: 30
    })
    last_name: string;

    @Column({
        nullable: true,
        default: null,
        type: 'longblob'
    })
    avatar: string;

    @Column({
        nullable: true,
        default: null,
        type: 'longblob'
    })
    avatarBackground: string;

    @Column({
        nullable: true,
        default: null,
        type: 'int'
    })
    age: number;

    @Column({
        nullable: true,
        default: null,
        type: 'varchar',
        length: 150
    })
    birth_place: string;

    @Column({
        nullable: false,
        default: "",
        type: 'varchar', 
        length: 30
    })
    email: string;
    
    @Column({
        nullable: false,
        default: "",
        type: 'varchar', 
        length: 30
    })
    username: string;
    
    @Column({
        nullable: false,
        default: '',
    })
    password?: string;

    @Column({
        nullable: true,
        default: null,
        type: 'varchar', 
        length: 20
    })
    phone_number: string;

    @OneToMany(type => Rant, rant => rant.user)
    rants: Rant[]
}
