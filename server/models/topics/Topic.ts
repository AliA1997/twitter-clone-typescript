import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Entity as AbstractEntity } from '../Entity';
import { LkTopicType } from './LkTopicType';

@Entity()
export class Topic extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToOne(type => LkTopicType)
    @JoinColumn()
    lk_topic_type?: LkTopicType;

    @Column()
    expires: Date;

    @Column()
    lk_topic_id: number;
}