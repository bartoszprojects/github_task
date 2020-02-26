import {Component, OnInit, ViewChild, Renderer2} from '@angular/core';
import {MainService} from "../connections/main.service";
import {filter, finalize, flatMap, map, mapTo, shareReplay, tap, toArray} from "rxjs/operators";
import {SubjectService} from "../connections/subject.service";
import {ThemePalette} from "@angular/material/core";
// @ts-ignore
import {ProgressBarMode} from "@angular/material/progress-bar";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit {
  @ViewChild('my_promise', {static: true}) my_promise;

  displayedColumns: string[] = ['name', 'login', 'branches'];
  dataSource;
  show_table = false;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  show_error = false;

  constructor(private renderer: Renderer2, private service: MainService, private subjectService: SubjectService) {}

  ngOnInit() {
    this.getRepoData();
  }

  getRepoData() {
    let tempArray = [];
    const my_promise = this.my_promise.nativeElement;
    return this.subjectService.getData()
      .pipe(flatMap(res => res))
      .pipe(map((data: any) => { return data.filter(res => res.fork == false)}, toArray()
      )).pipe(tap((data: any) => {
        tempArray = [];
        return data.map(d => tempArray.push(
          {"name": d.name,
            "login": d.owner.login,
            "url": 'https://api.github.com/repos/' + d.owner.login + '/' + d.name + '/branches'
          }))
      }))
      .pipe(tap(value => this.renderer.addClass(my_promise, 'show_promise')))
      .subscribe(
        {
          next: res => {
            this.show_error = false;
            setTimeout(() => this.renderer.removeClass(my_promise, 'show_promise'), 500);
            this.show_table = true;
            this.getBranches(tempArray);
          },
          error: err => {
            this.show_table = false;
            this.show_error = true;
            console.log('Angular Error: ', err);
            this.dataSource = [];
            /* When there is any error in Subject subscribtion then observable is dead and it is called again*/
            this.getRepoData()
          },
        });
  }

  getBranches(tempArray) {
    tempArray.forEach((item, index) => {
      this.service.getDataFromBackend(item.url)
        .subscribe(result => {
          tempArray[index].branches = result;
          this.dataSource = tempArray;
        })
    });
  }
}
