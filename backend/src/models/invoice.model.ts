import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';

//
import {Property} from './property.model';
import {Payment} from './payment.model';


@model()
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'date',
    required: true,
  })
  dateTime: string;


  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // condominiumId: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // propertyId: string;

  @belongsTo(() => Property)
  propertyId: string;

  @hasOne(() => Payment)
  payment: Payment;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
