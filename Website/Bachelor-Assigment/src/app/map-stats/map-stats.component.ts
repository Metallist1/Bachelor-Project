import { Component, OnInit } from '@angular/core';
import {StatisticsState} from "../shared/states/statistics/statistics.state";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {GameMap} from "../shared/states/statistics/entities/game_map";
import {MapStatisticObject} from "../shared/states/statistics/entities/map_stat";
import {GetMapStatistic} from "../shared/states/statistics/statistics.action";

@Component({
  selector: 'app-map-stats',
  templateUrl: './map-stats.component.html',
  styleUrls: ['./map-stats.component.scss']
})
export class MapStatsComponent implements OnInit {

  selectedMap = 0;
  // @ts-ignore
  averageSurvivalTime: Date ;

  // @ts-ignore
  @Select(StatisticsState.getAllMaps) maps: Observable<GameMap[]>;
  // @ts-ignore
  @Select(StatisticsState.getMapStatistic) statistic: Observable<MapStatisticObject>;

  // @ts-ignore
  mapStatistic: MapStatisticObject;
  // @ts-ignore
  allMaps: GameMap[];

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.maps.subscribe( (data) => {
      this.allMaps = data;
    });

    this.statistic.subscribe( (data) => {
      if(data){
        this.mapStatistic = data;
        this.averageSurvivalTime = new Date(Math.round(Number(data.average_survival_time)));
      }
    });
  }

  onChange($event: any) {
    this.store.dispatch(new GetMapStatistic(this.selectedMap))
  }
}
