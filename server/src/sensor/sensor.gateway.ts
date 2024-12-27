import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'
import { Logger } from "@nestjs/common";
import { RandomController } from 'src/random/random.controller';
import { Interval } from '@nestjs/schedule';

@WebSocketGateway({ cors: true })
export class SensorGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger(SensorGateway.name);
  @WebSocketServer() server: Server;
  
  handleConnection(client: Socket) {
    this.logger.log(`Client ID: ${client.id} connected`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ID: ${client.id} disconnected`)
  }

  @SubscribeMessage('telemetry-data')
  handleMessage(client: Socket, message: string) {
    client.emit('message', message)
  }

  @Interval(5000)
  sendRandomNumber() {
    const { getRandomNumber } = new RandomController
    const randomNumber = getRandomNumber()
    this.logger.log(randomNumber)
    this.server.emit('randomNumber', randomNumber);
  }
}
