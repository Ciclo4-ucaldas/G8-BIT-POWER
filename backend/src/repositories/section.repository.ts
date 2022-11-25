import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Section, SectionRelations, Condominium, Property} from '../models';
import {CondominiumRepository} from './condominium.repository';
import {PropertyRepository} from './property.repository';

export class SectionRepository extends DefaultCrudRepository<
  Section,
  typeof Section.prototype.id,
  SectionRelations
> {

  public readonly condominium: BelongsToAccessor<Condominium, typeof Section.prototype.id>;

  public readonly properties: HasManyRepositoryFactory<Property, typeof Section.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CondominiumRepository') protected condominiumRepositoryGetter: Getter<CondominiumRepository>, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(Section, dataSource);
    this.properties = this.createHasManyRepositoryFactoryFor('properties', propertyRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
    this.condominium = this.createBelongsToAccessorFor('condominium', condominiumRepositoryGetter,);
    this.registerInclusionResolver('condominium', this.condominium.inclusionResolver);
  }
}
