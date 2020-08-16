import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModel } from 'src/app/models/error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() globalError: ErrorModel;
  
  constructor() {
  }
  
  ngOnInit() {

  }
  close() {
    this.globalError=null;
  }
}
