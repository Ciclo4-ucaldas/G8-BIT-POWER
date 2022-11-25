import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core/dist/service';
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
  HttpErrors,
} from '@loopback/rest';

// PART 2.1 - AUTH JWT - TOKEN GEN
import {Keys} from '../config/keys';
import {User} from '../models';
import {Credentials} from '../models/credentials.model';
import {UserRepository} from '../repositories';
// PART 1 - SERVICES INTEGRATION - REG
import {AuthenticationService} from '../services';
const fetch = require('node-fetch');
//import fetch from 'node-fetch';
//import * as fetch from 'node-fetch';


@authenticate('admin')

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    // PART 1 - SERVICES INTEGRATION - REG
    @service(AuthenticationService)
    public serviceAuthentication : AuthenticationService
  ) {}

  @post('/login', {
    responses: {
      '200': {
        description: 'Identificación de usuarios'
      }
    }
  })
  async login(
    @requestBody() credentials : Credentials
  ) {
    let u = await this.serviceAuthentication.LoginUser(credentials.email, credentials.password);

    if(u)
    {
      let token = this.serviceAuthentication.GenerateJwtToken(u);

      return {
        data: {
          name: u.firstName,
          email: u.email,
          id: u.id
        },
        tk: token
      }
    }
    else
    {
      throw new HttpErrors[401]('Datos inválidos.');
    }
  }

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    // return this.userRepository.create(user);

    // BEGIN PART 1 - SERVICES INTEGRATION - REG
    let password = this.serviceAuthentication.GeneratePassword();
    let encryptPassword = this.serviceAuthentication.EncryptPassword(password);

    user.password = encryptPassword;

    let u = await this.userRepository.create(user);

    // Notificar al usuario
    let destination = user.email;
    let subject = 'Registro en la plataforma';
    let content = `Hola, ${user.firstName} su correo electrónico es: ${user.email} y su contraseña es: ${password}.`;

    fetch(`${Keys.NotificationsServiceUrl}/gmail?destino=${destination}&asunto=${subject}&contenido=${content}`)
    .then((data:any)  => {
      console.log(data);
    });

    return u;
    // END PART 1 - SERVICES INTEGRATION - REG
  }

  @authenticate.skip()

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @authenticate.skip()

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
