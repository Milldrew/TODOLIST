import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategyService } from './local-strategy/local-strategy.service';
import { LocalAuthGuardService } from './local-auth-guard/local-auth-guard.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { JwtAuthGuardService } from './jwt-auth-guard/jwt-auth-guard.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategyService,
    LocalAuthGuardService,
    JwtStrategyService,
    JwtAuthGuardService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
