/* eslint-disable prettier/prettier */
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
@WebSocketGateway({cors: {origin: ['http://192.168.119.17:4200']}})
//@WebSocketGateway({cors: {origin: ['http://192.168.1.96:4200']}})
//const configService = new ConfigService();
//@WebSocketGateway({cors: {origin: [configService.get('SOCKET_SERVER_ORIGIN')]}})
export class WaitingLineGateway implements OnGatewayConnection, OnGatewayDisconnect{
  /*@SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }*/
  @WebSocketServer()
  server:Server

  handleConnection(client: any, ...args: any[]) {
    console.log("Conexion Hecha", client.id );
    
  }

  handleDisconnect(client: any) {
    console.log('Desconectado', client.id)
  }

  @SubscribeMessage('sendMessage')
  handleMessage(socket : Socket, message:string){
    this.server.emit('newMessage', message)
  }


  @SubscribeMessage('tv:set:add-target-call')
  handleTVAddAppointmentTemp(socket: Socket, object:any){
    this.server.emit('tv:get:add-target-call', object)
  }

  @SubscribeMessage('tv:set:refresh-target-call')
  handleTVRefreshTargetCall(socket: Socket, object:any){
    console.log("**Recibido en servidor*",object)
    this.server.emit('tv:get:refresh-target-call', object)
  }


  /*codigo optimizado*/


  @SubscribeMessage('tv:set')
  handleTV(socket: Socket, object:any){
    console.log("**Recibido en servidor*",object)
    this.server.emit('tv:get:'+object.hqId, object.data)
  }
  @SubscribeMessage('waiting-line:set')
  handleWaitingLine(socket: Socket, object:any){
    console.log("**Recibido en servidor*",object)
    
    this.server.emit('waiting-line:get:'+object.tellId, object.data)
  }

  @SubscribeMessage('print-server:set')
  handlePrintServer(socket: Socket, object:any){
    
    console.log("**Recibido en servidor*",object, socket.id )
                                  
    this.server.emit('print-server:get:'+object.hqId+':'+object.token, object.data)   
  }



}
