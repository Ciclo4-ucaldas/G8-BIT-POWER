import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Condominium, CondominiumRelations, User, Section} from '../models';
import {UserRepository} from './user.repository';
import {SectionRepository} from './section.repository';

export class CondominiumRepository extends DefaultCrudRepository<
  Condominium,
  typeof Condominium.prototype.id,
  CondominiumRelations
> {

  public readonly admin: BelongsToAccessor<User, typeof Condominium.prototype.id>;

  public readonly sections: HasManyRepositoryFactory<Section, typeof Condominium.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('SectionRepository') protected sectionRepositoryGetter: Getter<SectionRepository>,
  ) {
    super(Condominium, dataSource);
    this.sections = this.createHasManyRepositoryFactoryFor('sections', sectionRepositoryGetter,);
    this.registerInclusionResolver('sections', this.sections.inclusionResolver);
    this.admin = this.createBelongsToAccessorFor('admin', userRepositoryGetter,);
    this.registerInclusionResolver('admin', this.admin.inclusionResolver);
  }
}
