import {GameMap} from "./entities/game_map";
import {GameWeapon} from "./entities/game_weapon";
import {WeaponStatisticObject} from "./entities/weapon_stat";
import {MapStatisticObject} from "./entities/map_stat";
import {GeneralStatisticsObject} from "./entities/general_stat";

export class GetMapStatistic {
  static readonly type = '[Auth] GetMapStatistic';
  constructor(public map_id: number) {}
}

export class GetWeaponStatistic {
  static readonly type = '[Auth] GetWeaponStatistic';
  constructor(public weapon_id: number) {}
}

export class SetUpAllMaps {
  static readonly type = '[Auth] SetUpAllMaps';
  constructor(public allMaps: GameMap[]) {}
}

export class SetUpAllWeapons {
  static readonly type = '[Auth] SetUpAllWeapons';
  constructor(public allWeapons: GameWeapon[]) {}
}

export class SetUpWeaponStats {
  static readonly type = '[Auth] SetUpWeaponStats';
  constructor(public weaponStat: WeaponStatisticObject) {}
}

export class SetUpMapsStats {
  static readonly type = '[Auth] SetUpMapsStats';
  constructor(public mapsStat: MapStatisticObject) {}
}


export class SetUpCurrentPlayers {
  static readonly type = '[Auth] SetUpCurrentPlayers';
  constructor(public players: number) {}
}

export class SetUpSteps {
  static readonly type = '[Auth] SetUpSteps';
  constructor(public steps: number) {}
}

export class SetUpBullets {
  static readonly type = '[Auth] SetUpBullets';
  constructor(public bullets: number) {}
}

export class SetUpGeneralStats {
  static readonly type = '[Auth] SetUpGeneralStats';
  constructor(public generalStat: GeneralStatisticsObject) {}
}


export class Login {
  static readonly type = '[Auth] Login';
  constructor(public username: string, public password: string) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public username: string, public password: string) {}
}
