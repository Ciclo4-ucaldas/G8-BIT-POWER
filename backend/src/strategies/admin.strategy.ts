// PART 2.2 - AUTH JWT - TOKEN VAL

import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
//import {request} from 'http';
import parseBearerToken from 'parse-bearer-token';
import {AuthenticationService} from '../services';


export class EstrategiaAdministrador implements AuthenticationStrategy
{
  name: string = 'admin';

  constructor(
    @service(AuthenticationService)
    public servicioAutenticacion : AuthenticationService
  ) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined>
  {
    let token = parseBearerToken(request);

    if(token)
    {
      let datos = this.servicioAutenticacion.ValidateJwtToken(token);

      if(datos)
      {
        //if(datos.data) // datos.data.role
        //{
          let perfil: UserProfile = Object.assign({
            nombre: datos.data.name
          });

          return perfil;
        //}
      }
      else
      {
        throw new HttpErrors[401]('El token incluído no es válido.');
      }
    }
    else
    {
      throw new HttpErrors[401]('No se ha incluído un token en la solicitud.');
    }
  }
}
