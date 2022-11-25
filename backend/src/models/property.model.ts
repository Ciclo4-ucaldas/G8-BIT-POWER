import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';

// Enum
import {PropertyTypes} from './PropertyTypes.enum';
import {Section} from './section.model';
import {Area} from './area.model';
import {Invoice} from './invoice.model';
import {User} from './user.model';


// enum PropertyTypes
// {
//   apartment,
//   studioApartment,
//   Local
// }


@model()
export class Property extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // type: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      enum: Object.values(PropertyTypes),
    },
  })
  type: PropertyTypes;

  @property({
    type: 'number',
    required: true,
  })
  coefficient: number;

  @property({
    type: 'number',
    required: true,
  })
  totalArea: number;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // condominiumId: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // sectionId: string;

  @belongsTo(() => Section)
  sectionId: string;

  @belongsTo(() => User)
  ownerId: string;

  @hasMany(() => Area)
  areas: Area[];

  @hasMany(() => Invoice)
  invoices: Invoice[];

  // @hasMany(() => User)
  // residents: User[];

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
