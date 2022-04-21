import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {StatisticsState} from "../shared/states/statistics/statistics.state";
import {Observable} from "rxjs";
import {GetMapStatistic, GetWeaponStatistic} from "../shared/states/statistics/statistics.action";
import {GameWeapon} from "../shared/states/statistics/entities/game_weapon";
import {WeaponStatisticObject} from "../shared/states/statistics/entities/weapon_stat";

@Component({
  selector: 'app-gun-stats',
  templateUrl: './gun-stats.component.html',
  styleUrls: ['./gun-stats.component.scss']
})
export class GunStatsComponent implements OnInit {

  kd = 0;
  hitRate = 0;
  selectedWeapon = 0;

  // @ts-ignore
  @Select(StatisticsState.getAllWeapons) weapons: Observable<GameWeapon[]>;
  // @ts-ignore
  @Select(StatisticsState.getWeaponStatistic) statistic: Observable<WeaponStatisticObject>;

  // @ts-ignore
  weaponStatistic: WeaponStatisticObject;
  // @ts-ignore
  allWeapons: GameWeapon[];

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.weapons.subscribe( (data) => {
      this.allWeapons = data;
    });

    this.statistic.subscribe( (data) => {
      if(data){
        this.weaponStatistic = data;
        // @ts-ignore
        this.hitRate = data.hit_rate * 100;
        // @ts-ignore
        this.kd = (data.total_deaths / data.total_kills).toFixed(2);
      }
    });
  }

  onChange($event: any) {
    this.store.dispatch(new GetWeaponStatistic(this.selectedWeapon))
  }

}
