import { Component, OnInit, Input } from '@angular/core';
import { Holding } from 'src/app/models/holding';

@Component({
  selector: 'app-scheme-list',
  templateUrl: './scheme-list.component.html',
  styleUrls: ['./scheme-list.component.css']
})
export class SchemeListComponent implements OnInit {
  @Input() schemeList;
  selectedScheme;
  constructor() { }

  ngOnInit() {
  }
  
  initScheme(val) {
    this.selectedScheme = val;
  }
}