import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, usersService: UsersService ) {}

  async register ({ name, email, password}: RegisterDto) {
    const user = await this.usersService.findoneByEmail(email)
    
    if (user) {
      throw new BadRequestException('ya existe un usuario con esos datos');
    }
    
    return await this.usersService.create({ 
      name,
      email, 
      password: bcrypt.hash(password, 10)
    });
  }

  async validateUser(email: string, password: string): Promise<any> {o
    const user = { email, password: await bcrypt.hash('password', 10) };
    if (email === user.email && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login({email, password}: LoginDto) {
    const user = await this.usersService.findoneByEmail(email);
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
