import {Injectable} from "@angular/core";
import {SocketOne, SocketTwo} from "../../../app.module";

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  constructor(private socket: SocketOne, private userSocket: SocketTwo) {
  }

  getMapStatistic(map_id: number) {
    this.socket.emit('get_statistics_by_map_id', {id: map_id});
  }

  getWeaponStatistic(weapon_id: number) {
    this.socket.emit('get_statistics_by_weapon_id', {id: weapon_id});
  }

  getAllMaps() {
    return this.socket.fromEvent('all_maps');
  }

  getAllWeapons() {
    return this.socket.fromEvent('all_weapons');
  }

  getWeaponStats() {
    return this.socket.fromEvent('weapon_statistics');
  }

  getMapsStats() {
    return this.socket.fromEvent('map_statistics');
  }

  getPlayersOn() {
    return this.userSocket.fromEvent('current_player_count');
  }

  getGeneralStats() {
    return this.socket.fromEvent('general_statistics');
  }

  login(username: string, password: string) {
    this.userSocket.emit('login', {username: username, password: password});
  }

  register(username: string, password: string) {
    this.userSocket.emit('register', {username: username, password: password});
  }
}
