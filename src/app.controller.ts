import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getIndex(): any {
    return {
      mensagem: 'hash-backend-challenge',
    };
  }
}
