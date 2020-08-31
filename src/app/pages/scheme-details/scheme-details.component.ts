import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrls: ['./scheme-details.component.css']
})
export class SchemeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private loader:LoaderService) {
    this.loader.show('',true);

    this.setPageTitle();
    this.loader.hide();

  }
  ngOnInit() {
  }
  setPageTitle() {
    let page = new Page();

    this.route.params.subscribe(param => {
      let schemeName=param["name"].replace(/-/g, ' ').toUpperCase();
      page.title = `Bajaj Capital: ${schemeName}`;
      page.heading = schemeName;
      //get more about this scheme from API.
      page.description = "Equity Schemes";
      page.icon="pe-7s-monitor";
      sessionStorage.setItem('page', JSON.stringify(page));
    });
  }
}
