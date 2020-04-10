import { Component, OnInit } from '@angular/core';
import { Scheme } from 'src/app/data/scheme';
import { Holding } from 'src/app/data/holding';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.css']
})
export class HoldingsComponent implements OnInit {
  schemeList: Holding[];
  constructor() { }

  ngOnInit() {
    this.schemeList = [
      { schemeName: "HDFC top 100 Equity Fund", cmv: 60000, imgPath: "1.jpg",investedAmount:50000 },
      { schemeName: "HDFC Tax Saver fund", cmv: 5800, imgPath: "1.jpg",investedAmount:6000  },
      { schemeName: "ICICI Tax Saver fund", cmv: 53000, imgPath: "3.jpg",investedAmount:52000  },
      // { schemeName: "Franklin Tempelton Blue Chip fund Direct Growth", cmv: 23.34, imgPath: "4.jpg" ,investedAmount:1000 },
      // { schemeName: "Mirae Asset Mid Cap Fund Dividened Payout", cmv: 23.34, imgPath: "5.jpg",investedAmount:4000  },

    ]
  }

}
