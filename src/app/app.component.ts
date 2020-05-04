import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { User } from './data/user';
import { Page } from './data/page';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // for page heading and title
  // title;
  // description;
  // icon;
  page: Page; // for title, desciption, etc.
  // used as inputs
  hasLoggedIn: boolean;
  currentUser: User;
  constructor(private router: Router, private authService: AuthService,
    private titleService: Title, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.authService.getLoggedInfo.subscribe(user => {
      this.currentUser = user;
      this.hasLoggedIn = user ? true : false;
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
      })
    ).subscribe((title: string) => {
      const child = this.activatedRoute.firstChild;
      let page = new Page();
      page.title = child.snapshot.data['title'];
      page.heading = child.snapshot.data['title']; //use title by default in page Heading.
      page.description = child.snapshot.data['description'];

      //check if getting blank from router then getting it from that perticluar component.
      if (!child.snapshot.data["title"]) {
        let storage = JSON.parse(localStorage.getItem('page'));
        if (storage) {
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
