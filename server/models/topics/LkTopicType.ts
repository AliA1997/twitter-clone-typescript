import { Entity, Column, OneToMany } from 'typeorm';
import { Entity as AbstractEntity } from '../Entity';
import { LkSubTopicType } from './LkSubTopicType';

@Entity()
export class LkTopicType extends AbstractEntity {
    @Column()
    type: string;

    @Column()
    type_description: string;

    @OneToMany(type => LkSubTopicType, lkSubTopic => lkSubTopic.parent_topic)
    sub_topics?: LkSubTopicType[];
}