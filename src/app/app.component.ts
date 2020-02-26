import {Component, OnInit} from '@angular/core';
import {MainService} from "./connections/main.service";
import {map, mapTo, shareReplay, tap, toArray} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private service: MainService) {
  }
  ngOnInit() {
  }
}
