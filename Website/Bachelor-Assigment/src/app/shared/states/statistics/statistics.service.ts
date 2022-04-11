import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  constructor(private socket: Socket) {
  }

  setUpAllTest(){
    return this.socket.fromEvent('all_test');
  }

  createTest( ) {
    this.socket.emit('create_test', {label: "Hello World",});
  }

}
