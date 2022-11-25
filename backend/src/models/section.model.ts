import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';

//
import {Condominium} from './condominium.model';
import {Property} from './property.model';


@model()
export class Section extends Entity {
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
  })
  description?: string;

  // @property({
  //   type: 'string',
  // })
  // condominiumId: string;

  @belongsTo(() => Condominium)
  condominiumId: string;

  @hasMany(() => Property)
  properties: Property[];

  constructor(data?: Partial<Section>) {
    super(data);
  }
}

export interface SectionRelations {
  // describe navigational properties here
}

export type SectionWithRelations = Section & SectionRelations;
