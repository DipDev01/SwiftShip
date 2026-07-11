import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  async getStatus() {
    return this.appService.checkDatabaseConnection();
  }
  @Get('hello')
  getHello() {
    return {
      message: 'Hello World!',
    };
  }
}
