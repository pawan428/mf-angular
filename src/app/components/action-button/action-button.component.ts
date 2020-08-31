import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Scheme } from 'src/app/models/scheme';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {
  @Input() scheme;
  @Output() loadScheme = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  selectScheme(scheme)
  {
    //this.loadScheme=val;
    this.loadScheme.emit(scheme);
  }
}
