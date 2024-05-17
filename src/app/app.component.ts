import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  messages: string[] = [];
  connected: boolean = false;
  sendMessageText: string = '';

  constructor(private socket: Socket) { 
    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connected = true;
    });
    
    this.socket.on('connection', (message: any) => {
      console.log('Received message ID:', message);
    });

    this.socket.on('message', (message: any) => {
      console.log('Received message:', message);
      this.messages.push(message);
    });
    
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  sendMessage() {
    console.log('Sending message')
    this.socket.emit('message', this.sendMessageText);
    this.messages.push(this.sendMessageText)
  }

  disconnect() {
    this.socket.disconnect();
  }

  connect() {
    this.socket.connect();
  }

}