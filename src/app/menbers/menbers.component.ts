import { Component, OnInit } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-menbers',
  templateUrl: './menbers.component.html',
  styleUrls: ['./menbers.component.css'],
})
export class MenbersComponent implements OnInit {
  member: Member = {
    id: 1,
    name: '田中太郎',
  };

  constructor() {}

  ngOnInit(): void {}
}
