import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { User } from './models/user';
import { Page } from './models/page';
import { ErrorService } from './shared/services/error.service';
import { ErrorModel } from './models/error';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  page: Page; // for title, desciption, etc.
  globalError: ErrorModel;
  // used as inputs
  hasLoggedIn: boolean = false;
  currentUser;

  constructor(private router: Router, private authService: AuthService,
    private titleService: Title, private activatedRoute: ActivatedRoute,
    private errorService: ErrorService) {

  }
  ngOnInit() {
    this.authService.getLoggedInfo.subscribe(user => {
      this.currentUser = user;
      this.hasLoggedIn = user ? true : false;
    })
    this.errorService.globalError.subscribe(err => {
      this.globalError = err;
     
      //// uncomment below line to hide globalError box after some time.
      // setTimeout(() => {
      // this.globalError = null;        
      // }, 5000);
    })
    this.setPageTitle();
  }

  setPageTitle() {
    const appTitle = this.titleService.getTitle();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activatedRoute.firstChild;
        if (child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return appTitle;
      })).subscribe((title: string) => {
        const child = this.activatedRoute.firstChild;
        let page = new Page();
        page.title = child.snapshot.data['title'];
        page.heading = child.snapshot.data['title']; //use title by default in page Heading.
        page.description = child.snapshot.data['description'];
        page.icon = child.snapshot.data['icon'];
        //check if getting blank from router then getting it from that perticluar component.
        if (!child.snapshot.data["title"]) {
          let mypage = localStorage.getItem('page');
          if (mypage) {
            let storage = JSON.parse(mypage);
            page.title = storage["title"]
            page.heading = storage["heading"]
            page.description = storage["description"]
            page.icon = storage["icon"]
            title = page.title;
          }

        }
        this.page = page;
        this.titleService.setTitle(title);

      });
  }

  ngOnDestroy() {
    //this.authService.hasLoggedInsubject.unsubscribe();
  }
}
