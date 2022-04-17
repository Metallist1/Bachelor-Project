import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {StatisticsState} from "../shared/states/statistics/statistics.state";
import {Observable} from "rxjs";
import {GameMap} from "../shared/states/statistics/entities/game_map";
import {MapStatisticObject} from "../shared/states/statistics/entities/map_stat";
import {GeneralStatisticsObject} from "../shared/states/statistics/entities/general_stat";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  // @ts-ignore
  @Select(StatisticsState.getPlayersOnline) playersOnline: Observable<number>;
  // @ts-ignore
  @Select(StatisticsState.getBulletCount) bulletCount: Observable<number>;
  // @ts-ignore
  @Select(StatisticsState.getStepCount) stepCount: Observable<number>;
  // @ts-ignore
  @Select(StatisticsState.getGeneralStats) statistic: Observable<GeneralStatisticsObject>;

  // @ts-ignore
  generalStat: GeneralStatisticsObject;
  // @ts-ignore
  players: number;
  // @ts-ignore
  bullets: number;
  // @ts-ignore
  steps: number;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.playersOnline.subscribe( (data) => {
      this.players = data;
    });
    this.bulletCount.subscribe( (data) => {
      this.bullets = data;
    });
    this.stepCount.subscribe( (data) => {
      this.steps = data;
    });

    this.statistic.subscribe( (data) => {
      console.log(data);
      if(data){
        this.generalStat = data;
      }
    });
  }

  addEvent() {

  }
}
