import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RandomController } from './random/random.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SensorGateway } from './sensor/sensor.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, RandomController],
  providers: [AppService, SensorGateway],
})
export class AppModule {}
