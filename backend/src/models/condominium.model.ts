import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';

//
import {User} from './user.model';
import {Section} from './section.model';


@model()
export class Condominium extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  bankAccount: string;

  @property({
    type: 'string',
    required: true,
  })
  bankName: string;

  @property({
    type: 'number',
    required: true,
  })
  interest: number;

  @property({
    type: 'string',
    required: true,
  })
  invoiceStart: string;

  @property({
    type: 'number',
    required: true,
  })
  budget: number;

  @property({
    type: 'number',
    required: true,
  })
  totalArea: number;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // adminId: string;

  @belongsTo(() => User)
  adminId: string;

  @hasMany(() => Section)
  sections: Section[];

  constructor(data?: Partial<Condominium>) {
    super(data);
  }
}

export interface CondominiumRelations {
  // describe navigational properties here
}

export type CondominiumWithRelations = Condominium & CondominiumRelations;
