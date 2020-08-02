import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  schemeList:any;
  users;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.schemeList = [   
      { id: 3, schemeName: "ICICI Tax Saver fund", NAV: 540.00, return: 15, risk:'high', rating:5 },
      { id: 4, schemeName: "Franklin Tempelton Blue Chip fund Direct Growth", NAV: 23.14, return: 12, risk:'medium', rating:4.5 },
      { id: 5, schemeName: "Mirae Asset Mid Cap Fund Dividened Payout", NAV: 55.34, return: 10 , risk:'low', rating:5},
      ];

  }
}
