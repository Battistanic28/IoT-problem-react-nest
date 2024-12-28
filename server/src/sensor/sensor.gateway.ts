import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'
import { Logger } from "@nestjs/common";
import { RandomController } from 'src/random/random.controller';

@WebSocketGateway({ cors: true })
export class SensorGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private intervalId = null
  private logger = new Logger(SensorGateway.name);
  @WebSocketServer() server: Server;
  
  handleConnection(client: Socket) {
    this.logger.log(`Client ID: ${client.id} connected`)
    this.intervalId = setInterval(() => {
      const { getRandomNumber } = new RandomController
      const randomNumber = getRandomNumber()
      this.logger.log(randomNumber)
      this.server.emit('randomNumber', randomNumber);
    }, 5000)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ID: ${client.id} disconnected`)
    if(this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  @SubscribeMessage('interval')
  handleMessage(client: Socket, newInterval: number) {
    client.emit('interval', newInterval)
  }
}
