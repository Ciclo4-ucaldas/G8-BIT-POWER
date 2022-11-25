import {Entity, model, property, belongsTo} from '@loopback/repository';

//
import {Invoice} from './invoice.model';


@model()
export class Payment extends Entity {
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
  voucher: string;

  @property({
    type: 'date',
    required: true,
  })
  dateTime: string;

  @belongsTo(() => Invoice)
  invoiceId: string;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
