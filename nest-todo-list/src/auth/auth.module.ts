import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategyService } from './local-strategy/local-strategy.service';
import { LocalAuthGuardService } from './local-auth-guard/local-auth-guard.service';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategyService, LocalAuthGuardService],
})
export class AuthModule {}
