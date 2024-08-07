import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, readonly usersService: UsersService ) {}

  async register ({ name, email, password}: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email)
    
    if (user) {
      throw new BadRequestException('ya existe un usuario con esos datos');
    }
    
    return await this.usersService.create({ 
      name,
      email, 
      password: bcrypt.hash(password, 10)
    });
  }
  
  async login({email, password}: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if(!user) {
      throw new UnauthorizedException('el email o la contraseña no son correctos');
    }

    const ispPasswordValid = await bcrypt.compare(password, user.password);
    if(!ispPasswordValid) {
      throw new UnauthorizedException('el email o la contraseña no son correctos')
    }

    const payload = { email: user.email }

    const token = await this.jwtService.signAsync(payload)

    return {
      token,
      email,
    };
  }
}
