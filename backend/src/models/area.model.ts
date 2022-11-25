import {Entity, model, property, belongsTo} from '@loopback/repository';

// Enum
import {AreaTypes} from './AreaTypes.enum';
import {Property} from './property.model';


// enum AreaTypes
// {
//   PARKING_LOT = 'parkingLot',
//   UTILITY_ROOM = 'utilityRoom'
// }


@model()
export class Area extends Entity {
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
  // type?: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      enum: Object.values(AreaTypes),
    },
  })
  type?: AreaTypes;

  // @property({
  //   type: 'string',
  //   required: false,
  // })
  // propertyId?: string;

  // opcional/nullable ?
  @belongsTo(() => Property)
  propertyId?: string;

  constructor(data?: Partial<Area>) {
    super(data);
  }
}

export interface AreaRelations {
  // describe navigational properties here
}

export type AreaWithRelations = Area & AreaRelations;
