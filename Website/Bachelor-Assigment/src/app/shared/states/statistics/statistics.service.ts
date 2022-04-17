import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  constructor(private socket: Socket) {
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
    return this.socket.fromEvent('current_player_count');
  }

  getSteps() {
    return this.socket.fromEvent('current_step_count');
  }

  getBulletCounts() {
    return this.socket.fromEvent('current_bullet_count');
  }

  getGeneralStats() {
    return this.socket.fromEvent('general_statistics');
  }
}
