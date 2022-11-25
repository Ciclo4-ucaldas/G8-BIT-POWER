import {injectable, /* inject, */ BindingScope} from '@loopback/core';

// PART 2.1 - AUTH JWT - TOKEN GEN
import {repository} from '@loopback/repository';
// PART 1 - SERVICES INTEGRATION - REG
const generator = require('password-generator');
const cryptoJS = require('crypto-js');
// PART 2.1 - AUTH JWT TOKEN GEN
const jwt = require('jsonwebtoken');
import {Keys} from '../config/keys';
import {User} from '../models';
import {UserRepository} from '../repositories';


@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(/* Add @inject to inject parameters */
    // PART 2.1 - AUTH JWT - TOKEN GEN
    @repository(UserRepository)
    public userRepository : UserRepository) {}

  /*
   * Add service methods here
   */

  // BEGIN PART 1 - SERVICES INTEGRATION - REG
  GeneratePassword()
  {
    let password = generator(12, false);

    return password;
  }

  EncryptPassword(password: string)
  {
    let encryptPassword = cryptoJS.MD5(password).toString();

    return encryptPassword;
  }
  // END PART 1 - SERVICES INTEGRATION - REG

  // BEGIN PART 2.1 - AUTH JWT - TOKEN GEN
  LoginUser(email: string, password: string)
  {
    try
    {
      let u = this.userRepository.findOne({where: {email: email, password: password}});

      if(u)
      {
        return u;
      }

      return false;
    }
    catch
    {
      return false;
    }
  }

  GenerateJwtToken(user: User)
  {
    let token = jwt.sign({
      // + role
      data : {
        id: user.id,
        email: user.email,
        name: user.firstName + ' ' + user.firstSurname
      }
    },
      Keys.JwtPassword);

    return token;
  }

  ValidateJwtToken(token: string)
  {
    try
    {
      let data = jwt.verify(token, Keys.JwtPassword);

      return data;
    }
    catch //(error)
    {
      //console.log(error);

      return false;
    }
  }
  // END PART 2.1 - AUTH JWT - TOKEN GEN
}
