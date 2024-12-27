import { Controller, Get } from '@nestjs/common';
import { v4 as uuid } from 'uuid'; 

@Controller('random')
export class RandomController {
  @Get()
  getRandomNumber(): { id: string, number: number, timestamp: string } {
    const randomNumber = Math.floor(Math.random() * 100); // Change 100 to your desired range
    return { 
      id: uuid(),
      number: randomNumber,
      timestamp: new Date().toISOString()
    };
  }
}
