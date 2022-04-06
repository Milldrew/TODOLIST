import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuardService } from './auth/local-auth-guard/local-auth-guard.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuardService)
  @Post('auth/login')
  async login(@Request() req: any) {
    return req.user;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
