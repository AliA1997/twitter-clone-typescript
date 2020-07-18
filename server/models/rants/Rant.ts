import { Entity, Column, ManyToOne } from 'typeorm';
import { Entity as AbstractEntity } from '../Entity';
import { User } from '../user/User';

@Entity()
export class Rant extends AbstractEntity {

    @Column()
    body: string;

    @ManyToOne(type => User, user => user.rants)
    user?: User;

    @Column()
    user_id: number;    

    @Column()
    number_of_likes: number;

    @Column()
    number_of_replies: number;

    @Column()
    number_of_rerants: number;

    @Column()
    number_of_shares: number;
}