import { Component, OnInit } from '@angular/core';
import {TestMethod} from "../shared/states/statistics/statistics.action";
import {Select, Store} from "@ngxs/store";
import {StatisticsState} from "../shared/states/statistics/statistics.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  // @ts-ignore
  @Select(StatisticsState.getAllTest) allTests: Observable<[]>;
  tests: [] | undefined;

  constructor(private store: Store) {
    // @ts-ignore
    this.allTests.subscribe((data) => {
      console.log(data);
      this.tests = data;
    });
  }

  ngOnInit(): void {
  }

  createTest() {
    this.store.dispatch(new TestMethod());
  }

}
