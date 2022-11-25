import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Condominium,
  User,
} from '../models';
import {CondominiumRepository} from '../repositories';

export class CondominiumUserController {
  constructor(
    @repository(CondominiumRepository)
    public condominiumRepository: CondominiumRepository,
  ) { }

  @get('/condominiums/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Condominium',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Condominium.prototype.id,
  ): Promise<User> {
    return this.condominiumRepository.admin(id);
  }
}
