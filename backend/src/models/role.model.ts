import {Entity, model, property, belongsTo} from '@loopback/repository';

// Enum
import {RolesList} from './RolesList.enum';
import {User} from './user.model';


// enum RolesList
// {
//   ADMIN = 'administrator',
//   OWNER = 'owner',
//   RESIDENT = 'resident'
// }


@model()
export class Role extends Entity {
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
  // role: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      enum: Object.values(RolesList),
    },
  })
  type: RolesList;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // userId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
