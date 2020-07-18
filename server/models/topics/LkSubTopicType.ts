import { Entity, Column, ManyToOne } from 'typeorm';
import { Entity as AbstractEntity } from '../Entity';
import { LkTopicType } from './LkTopicType';

@Entity()
export class LkSubTopicType extends AbstractEntity {
    @Column()
    type: string;

    @ManyToOne(type => LkTopicType, lkTopicType => lkTopicType.sub_topics)
    parent_topic?: LkTopicType;

    @Column()
    parent_topic_id: number;
}