import { JoinColumn, OneToOne, Entity, Column } from 'typeorm';
import { Entity as AbstractEntity } from '../Entity';
import { LkResponseType } from './LkResponseType';
import { Rant } from './Rant';

@Entity()
export class Response extends AbstractEntity {
    @OneToOne(type => LkResponseType)
    @JoinColumn()
    lk_response_type: LkResponseType;

    @Column()
    rant_id: number;
}