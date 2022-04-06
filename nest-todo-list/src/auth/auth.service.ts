import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByName(username);
    console.log({ user });
    if (user && user.password === password) {
      const { password, ...result } = user;
      console.log({ result });
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, sub: user.userId };
    console.log({ payload }, 'login');
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
