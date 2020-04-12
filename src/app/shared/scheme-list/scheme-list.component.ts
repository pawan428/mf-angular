import { Component, OnInit, Input } from '@angular/core';
import { Holding } from 'src/app/data/holding';

@Component({
  selector: 'app-scheme-list',
  templateUrl: './scheme-list.component.html',
  styleUrls: ['./scheme-list.component.css']
})
export class SchemeListComponent implements OnInit {
  @Input() schemeList;
  holdingList:Holding;
  constructor() { }

  ngOnInit() {
//this.holdingList=this.schemeList;

setTimeout(() => {
  this.holdingList = this.schemeList.map(a => Object.assign(
    {schemeName:a.schemeName,
      investedAmount:a.investedAmount, 
      cmv:a.cmv,
      currentGain:(a.cmv-a.investedAmount),
      wholeReturn:((a.cmv-a.investedAmount)*100/a.investedAmount).toFixed(1)  
    }));
}, 4000); 
  }

}
