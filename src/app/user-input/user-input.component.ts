import {Component, OnInit, ViewChild, Renderer2} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, tap} from "rxjs/operators";
import {SubjectService} from "../connections/subject.service";
import {MainService} from "../connections/main.service";
import {filter, flatMap, map, mapTo, shareReplay, toArray} from "rxjs/operators";
import {from, Observable, of} from "rxjs";

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.sass']
})
export class UserInputComponent implements OnInit {
  @ViewChild('searchGitHub', {static: true}) input;
  data_from_input;

  constructor(private renderer: Renderer2, private service: MainService, private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.checkTyping()
  }
/*
* There is no button "search" which calls "search" function to get data from github.com
* I used input event: when user stop typing github username then app starts receiving data from github with
* given username from input. It also wait 2000 ms to do it. If user wanna to type new user, function is calling again.
*/
  checkTyping() {
    return fromEvent(this.input.nativeElement, 'input')
      .pipe(debounceTime(1500))
      .subscribe(value => {
          console.log(value);
          this.getDataFromBackend();
        }
      )
  }
/*
* I used RXSJ Subject to start emit data to any .subscribe in the project. In this case, data-table from another component
* is subscriber. This is one of ways to send data between components
*/
  getDataFromBackend() {
    this.subjectService.createNext(this.service.getDataFromBackend('https://api.github.com/users/' + this.data_from_input + '/repos'))
  }

}
