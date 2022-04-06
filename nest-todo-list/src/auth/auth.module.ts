import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategyService } from './local-strategy/local-strategy.service';
import { LocalAuthGuardService } from './local-auth-guard/local-auth-guard.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, LocalStrategyService, LocalAuthGuardService],
  exports: [AuthService],
})
export class AuthModule {}
