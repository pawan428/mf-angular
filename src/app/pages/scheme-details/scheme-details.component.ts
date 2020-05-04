import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Page } from 'src/app/data/page';

@Component({
  selector: 'app-scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrls: ['./scheme-details.component.css']
})
export class SchemeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.setPageTitle();
  }
  ngOnInit() {
  }
  setPageTitle() {
    let page = new Page();
    this.route.params.subscribe(param => {
      page.title = "Scheme Details";
      page.heading = param["name"].replace(/-/g, ' ').toUpperCase();
      //get more about this scheme from API.
      page.description = "Equity Schemes";
      page.icon="pe-7s-wallet icon-gradient bg-plum-plate";
      localStorage.setItem('page', JSON.stringify(page));
    });
  }
}
