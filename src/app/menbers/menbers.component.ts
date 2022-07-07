import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menbers',
  templateUrl: './menbers.component.html',
  styleUrls: ['./menbers.component.css']
})
export class MenbersComponent implements OnInit {

  member = "田中太郎"

  constructor() { }

  ngOnInit(): void {
  }

}
