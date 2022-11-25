import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Role, Condominium, Property} from '../models';
import {RoleRepository} from './role.repository';
import {CondominiumRepository} from './condominium.repository';
import {PropertyRepository} from './property.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly roles: HasManyRepositoryFactory<Role, typeof User.prototype.id>;

  public readonly condominium: HasOneRepositoryFactory<Condominium, typeof User.prototype.id>;

  public readonly properties: HasManyRepositoryFactory<Property, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('CondominiumRepository') protected condominiumRepositoryGetter: Getter<CondominiumRepository>, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(User, dataSource);
    this.properties = this.createHasManyRepositoryFactoryFor('properties', propertyRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
    this.condominium = this.createHasOneRepositoryFactoryFor('condominium', condominiumRepositoryGetter);
    this.registerInclusionResolver('condominium', this.condominium.inclusionResolver);
    this.roles = this.createHasManyRepositoryFactoryFor('roles', roleRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
