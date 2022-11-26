import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';

// Enum
import {DocumentTypes} from './documentTypes.enum';
import {Role} from './role.model';
import {Condominium} from './condominium.model';
import {Property} from './property.model';


// enum DocumentTypes
// {
//   CC = 0,
//   TI = 1
// }


@model()
export class User extends Entity {
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
  firstName: string;

  @property({
    type: 'string',
  })
  secondName?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstSurname: string;

  @property({
    type: 'string',
  })
  secondSurname?: string;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // documentType: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      enum: Object.values(DocumentTypes),
    },
  })
  documentType: DocumentTypes;

  @property({
    type: 'string',
    required: true,
  })
  documentNumber: string;

  @property({
    type: 'boolean',
  })
  sex?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: false,
  })
  password: string;

  @property({
    type: 'boolean',
    required: true,
  })
  state: boolean;

  @property({
    type: 'string',
    required: false,
  })
  propertyId: string;

  @hasMany(() => Role)
  roles: Role[];

  @hasMany(() => Property, {keyTo: 'ownerId'})
  properties: Property[];

  @hasOne(() => Condominium, {keyTo: 'adminId'})
  condominium: Condominium;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
