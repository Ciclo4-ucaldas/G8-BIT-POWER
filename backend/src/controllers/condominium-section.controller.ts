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
  Condominium,
  Section,
} from '../models';
import {CondominiumRepository} from '../repositories';

export class CondominiumSectionController {
  constructor(
    @repository(CondominiumRepository) protected condominiumRepository: CondominiumRepository,
  ) { }

  @get('/condominiums/{id}/sections', {
    responses: {
      '200': {
        description: 'Array of Condominium has many Section',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Section)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Section>,
  ): Promise<Section[]> {
    return this.condominiumRepository.sections(id).find(filter);
  }

  @post('/condominiums/{id}/sections', {
    responses: {
      '200': {
        description: 'Condominium model instance',
        content: {'application/json': {schema: getModelSchemaRef(Section)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Condominium.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {
            title: 'NewSectionInCondominium',
            exclude: ['id'],
            optional: ['condominiumId']
          }),
        },
      },
    }) section: Omit<Section, 'id'>,
  ): Promise<Section> {
    return this.condominiumRepository.sections(id).create(section);
  }

  @patch('/condominiums/{id}/sections', {
    responses: {
      '200': {
        description: 'Condominium.Section PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section, {partial: true}),
        },
      },
    })
    section: Partial<Section>,
    @param.query.object('where', getWhereSchemaFor(Section)) where?: Where<Section>,
  ): Promise<Count> {
    return this.condominiumRepository.sections(id).patch(section, where);
  }

  @del('/condominiums/{id}/sections', {
    responses: {
      '200': {
        description: 'Condominium.Section DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Section)) where?: Where<Section>,
  ): Promise<Count> {
    return this.condominiumRepository.sections(id).delete(where);
  }
}
