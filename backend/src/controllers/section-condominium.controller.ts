import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Section,
  Condominium,
} from '../models';
import {SectionRepository} from '../repositories';

export class SectionCondominiumController {
  constructor(
    @repository(SectionRepository)
    public sectionRepository: SectionRepository,
  ) { }

  @get('/sections/{id}/condominium', {
    responses: {
      '200': {
        description: 'Condominium belonging to Section',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Condominium)},
          },
        },
      },
    },
  })
  async getCondominium(
    @param.path.string('id') id: typeof Section.prototype.id,
  ): Promise<Condominium> {
    return this.sectionRepository.condominium(id);
  }
}
