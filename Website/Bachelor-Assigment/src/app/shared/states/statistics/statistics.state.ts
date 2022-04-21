import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  GetMapStatistic,
  GetWeaponStatistic, Login, Register,
  SetUpAllMaps,
  SetUpAllWeapons, SetUpCurrentPlayers,
  SetUpGeneralStats, SetUpMapsStats, SetUpWeaponStats
} from "./statistics.action";
import {StatisticsService} from "./statistics.service";
import {GameMap} from "./entities/game_map";
import {GameWeapon} from "./entities/game_weapon";
import {MapStatisticObject} from "./entities/map_stat";
import {WeaponStatisticObject} from "./entities/weapon_stat";
import {GeneralStatisticsObject} from "./entities/general_stat";

export class StatisticsStateModel {
  listOfWeapons: GameWeapon[] | undefined ;
  listOfMaps: GameMap[] | undefined ;
  mapStats: MapStatisticObject | undefined ;
  weaponStats: WeaponStatisticObject | undefined ;
  playerCount: number | undefined;
  // @ts-ignore
  generalStats: GeneralStatisticsObject ;
}
@State<StatisticsStateModel>({
  name: 'stats',
  defaults: {
    listOfWeapons: [],
    listOfMaps: [],
    mapStats: undefined,
    weaponStats: undefined,
    playerCount: 0,
    generalStats: {
      current_step_count: "0",
      current_bullet_count: "0",
      most_common_skill: "None",
      most_user_loadout:"None",
      favorite_map: "De_Dust_2"
    },
  },
})
@Injectable()
export class StatisticsState {
  constructor(private statisticsService: StatisticsService,
              private store: Store) {
    statisticsService.getAllMaps().subscribe(
      (data) => {
        console.log(data);
        this.store.dispatch(new SetUpAllMaps(data as GameMap[]));
      });
    statisticsService.getAllWeapons().subscribe(
      (data) => {
        console.log(data);
        this.store.dispatch(new SetUpAllWeapons(data as GameWeapon[]));
      });
    statisticsService.getWeaponStats().subscribe(
      (data) => {
        console.log(data);
        this.store.dispatch(new SetUpWeaponStats(data as WeaponStatisticObject));
      });
    statisticsService.getMapsStats().subscribe(
      (data) => {
        console.log(data);
        this.store.dispatch(new SetUpMapsStats(data as MapStatisticObject));
      });
    statisticsService.getPlayersOn().subscribe(
      (data) => {
        console.log(data);
        this.store.dispatch(new SetUpCurrentPlayers(data as number));
      });
    statisticsService.getGeneralStats().subscribe(
      (data) => {
        console.log(data);
        this.store.dispatch(new SetUpGeneralStats(data as GeneralStatisticsObject));
      });
  }



  @Selector()
  static getAllMaps(state: StatisticsStateModel): any {
    return state.listOfMaps;
  }

  @Selector()
  static getMapStatistic(state: StatisticsStateModel): any {
    return state.mapStats;
  }

  @Selector()
  static getAllWeapons(state: StatisticsStateModel): any {
    return state.listOfWeapons;
  }

  @Selector()
  static getWeaponStatistic(state: StatisticsStateModel): any {
    return state.weaponStats;
  }

  @Selector()
  static getPlayersOnline(state: StatisticsStateModel): any {
    return state.playerCount;
  }
  @Selector()
  static getGeneralStats(state: StatisticsStateModel): any {
    return state.generalStats;
  }

  @Action(GetMapStatistic)
  getMapStatistic({getState, setState}: StateContext<StatisticsStateModel>, {map_id}: GetMapStatistic): any {
    this.statisticsService.getMapStatistic(map_id);
  }

  @Action(GetWeaponStatistic)
  getWeaponStatistic({getState, setState}: StateContext<StatisticsStateModel>, {weapon_id}: GetWeaponStatistic): any {
    this.statisticsService.getWeaponStatistic(weapon_id);
  }

  @Action(SetUpWeaponStats)
  setUpWeaponStats({getState, setState}: StateContext<StatisticsStateModel>,
             { weaponStat }: SetUpWeaponStats): any {
    const state = getState();
    setState({
      ...state,
      weaponStats: weaponStat,
    });
  }

  @Action(SetUpMapsStats)
  setUpMapsStats({getState, setState}: StateContext<StatisticsStateModel>,
             { mapsStat }: SetUpMapsStats): any {
    const state = getState();
    setState({
      ...state,
      mapStats: mapsStat,
    });
  }

  @Action(SetUpAllMaps)
  setUpAllMaps({getState, setState}: StateContext<StatisticsStateModel>,
             { allMaps }: SetUpAllMaps): any {
    const state = getState();
    setState({
      ...state,
      listOfMaps: allMaps,
    });
  }

  @Action(SetUpAllWeapons)
  setUpAllWeapons({getState, setState}: StateContext<StatisticsStateModel>,
             { allWeapons }: SetUpAllWeapons): any {
    const state = getState();
    setState({
      ...state,
      listOfWeapons: allWeapons,
    });
  }

  @Action(SetUpGeneralStats)
  setUpGeneralStats({getState, setState}: StateContext<StatisticsStateModel>,
             { generalStat }: SetUpGeneralStats): any {
    const state = getState();
    setState({
      ...state,
      generalStats: generalStat,
    });
  }

  @Action(SetUpCurrentPlayers)
  setUpCurrentPlayers({getState, setState}: StateContext<StatisticsStateModel>,
             { players }: SetUpCurrentPlayers): any {
    const state = getState();
    setState({
      ...state,
      playerCount: players,
    });
  }


  @Action(Login)
  login({getState, setState}: StateContext<StatisticsStateModel>,
        { username, password }: Login): any {
    this.statisticsService.login(username, password);
  }

  @Action(Register)
  register({getState, setState}: StateContext<StatisticsStateModel>,
        { username, password }: Register): any {
    this.statisticsService.register(username, password);
  }
}
