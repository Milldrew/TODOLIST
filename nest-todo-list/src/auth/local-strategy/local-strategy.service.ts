import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('local-strategy validate service', username, password);
    const user = await this.authService.validateUser(username, password);
    console.log('after validate', user);
    if (!user) {
      throw new UnauthorizedException('User info invalid');
    }
    return user;
  }
}
