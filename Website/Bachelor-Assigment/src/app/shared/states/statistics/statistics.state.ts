import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {TestMethod} from "./statistics.action";
import {StatisticsService} from "./statistics.service";

export class StatisticsStateModel {
  testFunction: [] | undefined ;
}

@State<StatisticsStateModel>({
  name: 'stats',
  defaults: {
    testFunction: []
  },
})
@Injectable()
export class StatisticsState {
  constructor(private statisticsService: StatisticsService,
              private store: Store) {
    statisticsService.setUpAllTest().subscribe(
      (data) => {
        //this.store.dispatch(new SetUpAllAlarms(data as Alarm[]));
      });
  }

  @Selector()
  static getAllTest(state: StatisticsStateModel): any {
    return state.testFunction;
  }


  @Action(TestMethod)
  testMethod({getState, setState}: StateContext<StatisticsStateModel>): any {
    this.statisticsService.createTest();
  }

}
