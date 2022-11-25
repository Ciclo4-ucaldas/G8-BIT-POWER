import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Property, PropertyRelations, Section, Area, Invoice, User} from '../models';
import {SectionRepository} from './section.repository';
import {AreaRepository} from './area.repository';
import {InvoiceRepository} from './invoice.repository';
import {UserRepository} from './user.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly section: BelongsToAccessor<Section, typeof Property.prototype.id>;

  public readonly areas: HasManyRepositoryFactory<Area, typeof Property.prototype.id>;

  public readonly invoices: HasManyRepositoryFactory<Invoice, typeof Property.prototype.id>;

  public readonly owner: BelongsToAccessor<User, typeof Property.prototype.id>;

  // public readonly residents: HasManyRepositoryFactory<User, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SectionRepository') protected sectionRepositoryGetter: Getter<SectionRepository>, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Property, dataSource);
    // this.residents = this.createHasManyRepositoryFactoryFor('residents', userRepositoryGetter,);
    // this.registerInclusionResolver('residents', this.residents.inclusionResolver);
    this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.invoices = this.createHasManyRepositoryFactoryFor('invoices', invoiceRepositoryGetter,);
    this.registerInclusionResolver('invoices', this.invoices.inclusionResolver);
    this.areas = this.createHasManyRepositoryFactoryFor('areas', areaRepositoryGetter,);
    this.registerInclusionResolver('areas', this.areas.inclusionResolver);
    this.section = this.createBelongsToAccessorFor('section', sectionRepositoryGetter,);
    this.registerInclusionResolver('section', this.section.inclusionResolver);
  }
}
