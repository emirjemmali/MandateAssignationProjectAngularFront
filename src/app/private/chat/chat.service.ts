import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ChatService {

  nombreOnline:number;
  private socket = io('http://localhost:5000');

  joinRoom(data)
  {
    this.socket.emit('join',data);
  }

  newUserJoined()
  {
    const observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new user joined', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();};
    });

    return observable;
  }

  UserConnected()
  {
    const observable = new Observable<{user:String}>(observer=>{
      this.socket.on('nombreOfOnlien', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();};
    });

    return observable;
  }

  leaveRoom(data)
  {
    this.socket.emit('leave',data);

  }

  userLeftRoom()
  {
    const observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('left room', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();};
    });

    return observable;
  }

  sendMessage(data)
  {

    this.socket.emit('message',data);
  }

  newMessageReceived()
  {
    const observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new message', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();};
    });

    return observable;
  }



}
