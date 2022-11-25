import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Condominium} from '../models';
import {CondominiumRepository} from '../repositories';

export class CondominiumController {
  constructor(
    @repository(CondominiumRepository)
    public condominiumRepository : CondominiumRepository,
  ) {}

  @post('/condominiums')
  @response(200, {
    description: 'Condominium model instance',
    content: {'application/json': {schema: getModelSchemaRef(Condominium)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominium, {
            title: 'NewCondominium',
            exclude: ['id'],
          }),
        },
      },
    })
    condominium: Omit<Condominium, 'id'>,
  ): Promise<Condominium> {
    return this.condominiumRepository.create(condominium);
  }

  @get('/condominiums/count')
  @response(200, {
    description: 'Condominium model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Condominium) where?: Where<Condominium>,
  ): Promise<Count> {
    return this.condominiumRepository.count(where);
  }

  @get('/condominiums')
  @response(200, {
    description: 'Array of Condominium model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Condominium, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Condominium) filter?: Filter<Condominium>,
  ): Promise<Condominium[]> {
    return this.condominiumRepository.find(filter);
  }

  @patch('/condominiums')
  @response(200, {
    description: 'Condominium PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominium, {partial: true}),
        },
      },
    })
    condominium: Condominium,
    @param.where(Condominium) where?: Where<Condominium>,
  ): Promise<Count> {
    return this.condominiumRepository.updateAll(condominium, where);
  }

  @get('/condominiums/{id}')
  @response(200, {
    description: 'Condominium model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Condominium, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Condominium, {exclude: 'where'}) filter?: FilterExcludingWhere<Condominium>
  ): Promise<Condominium> {
    return this.condominiumRepository.findById(id, filter);
  }

  @patch('/condominiums/{id}')
  @response(204, {
    description: 'Condominium PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominium, {partial: true}),
        },
      },
    })
    condominium: Condominium,
  ): Promise<void> {
    await this.condominiumRepository.updateById(id, condominium);
  }

  @put('/condominiums/{id}')
  @response(204, {
    description: 'Condominium PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() condominium: Condominium,
  ): Promise<void> {
    await this.condominiumRepository.replaceById(id, condominium);
  }

  @del('/condominiums/{id}')
  @response(204, {
    description: 'Condominium DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.condominiumRepository.deleteById(id);
  }
}
