import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Property,
  User,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyUserController {
  constructor(
    @repository(PropertyRepository)
    public propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Property',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Property.prototype.id,
  ): Promise<User> {
    return this.propertyRepository.owner(id);
  }
}
