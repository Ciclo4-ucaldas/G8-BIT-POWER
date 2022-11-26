// PART 2.2 - AUTH JWT - TOKEN VAL

import {AuthenticationStrategy} from '@loopback/authentication';
import {hasInjections, service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
//import {request} from 'http';
import parseBearerToken from 'parse-bearer-token';
import { Role } from '../models';
import {AuthenticationService} from '../services';


export class EstrategiaHabitante implements AuthenticationStrategy
{
  name: string = 'habitante';

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
        if(datos.data.roles){
          let perfil: UserProfile = Object.assign({
            nombre: "no User"
          }); 
          let noHayPerfil:boolean=false;
        datos.data.roles.forEach((rol: Role) =>{
        console.log(rol.type);
          if( rol.type==2) // datos.data.role
          {
            noHayPerfil=true;
            //console.log("entro")
             perfil= Object.assign({
              nombre: datos.data.name
            });
          }
        });
        if(noHayPerfil){
        return perfil;
        }else{
          throw new HttpErrors[401]('no rol de habitante.');
        }
      }else{
        throw new HttpErrors[401]('no hay usuarios validos.');
      }
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
