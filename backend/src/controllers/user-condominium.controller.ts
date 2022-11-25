import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Condominium,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCondominiumController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/condominium', {
    responses: {
      '200': {
        description: 'User has one Condominium',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Condominium),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Condominium>,
  ): Promise<Condominium> {
    return this.userRepository.condominium(id).get(filter);
  }

  @post('/users/{id}/condominium', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Condominium)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominium, {
            title: 'NewCondominiumInUser',
            exclude: ['id'],
            optional: ['adminId']
          }),
        },
      },
    }) condominium: Omit<Condominium, 'id'>,
  ): Promise<Condominium> {
    return this.userRepository.condominium(id).create(condominium);
  }

  @patch('/users/{id}/condominium', {
    responses: {
      '200': {
        description: 'User.Condominium PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominium, {partial: true}),
        },
      },
    })
    condominium: Partial<Condominium>,
    @param.query.object('where', getWhereSchemaFor(Condominium)) where?: Where<Condominium>,
  ): Promise<Count> {
    return this.userRepository.condominium(id).patch(condominium, where);
  }

  @del('/users/{id}/condominium', {
    responses: {
      '200': {
        description: 'User.Condominium DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Condominium)) where?: Where<Condominium>,
  ): Promise<Count> {
    return this.userRepository.condominium(id).delete(where);
  }
}
