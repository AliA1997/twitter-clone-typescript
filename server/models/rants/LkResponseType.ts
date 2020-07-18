import { Entity, Column } from 'typeorm';
import { Entity as AbstractEntity } from '../Entity';

@Entity()
export class LkResponseType extends AbstractEntity {
    @Column()
    type: string;

    @Column()
    type_description: string;
}