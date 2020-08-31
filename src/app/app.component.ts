import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router, NavigationEnd, ActivatedRoute, Event, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { Page } from './models/page';
import { MessageService } from './shared/services/message.service';
import { ResponseModel } from './models/response';
import { LoaderService } from './shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  page: Page; // for title, desciption, etc.
  globalMessage: ResponseModel;
  // used as inputs
  hasLoggedIn: boolean = false;
  currentUser;
  authS: Subscription;
  msgS: Subscription;
  headerLoader = false;

  constructor(private router: Router, private authService: AuthService,
    private titleService: Title, private activatedRoute: ActivatedRoute,
    private messageService: MessageService, private loaderService: LoaderService) {
    //show loader while navigating to other route
    this.router.events.subscribe(() => {
      this.messageService.reset();
      this.router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.headerLoader = true;
            break;
          }
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.headerLoader = false;

            break;
          }
          default: {
            break;
          }
        }
      })
    })
  }
  ngOnInit() {
    this.authS = this.authService.getLoggedInfo.subscribe(user => {
      this.currentUser = user;
      this.hasLoggedIn = user ? true : false;
    })

    this.setPageTitle();
  }
  // Shows and hides the loading spinner during RouterEvent changes

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
        console.log(title);
        const child = this.activatedRoute.firstChild;
        let page = new Page();
        page.title = child.snapshot.data['title'];
        page.heading = child.snapshot.data['title']; //use title by default in page Heading.
        page.description = child.snapshot.data['description'];
        page.icon = child.snapshot.data['icon'];
        console.log(child);
        //console.log(child.snapshot.data["title"]);

        // //check if getting blank from router then getting it from that perticluar component.
        if (!child.snapshot.data["title"]) {
          let mypage = sessionStorage.getItem('page');
          if (mypage) {
            let storage = JSON.parse(mypage);
            page.title = storage["title"]
            page.heading = storage["heading"]
            page.description = storage["description"]
            page.icon = storage["icon"]
            title = page.title;
            console.log(mypage);

          }
        }
        this.page = page;
        this.titleService.setTitle(title);
      });
  }

  ngOnDestroy() {

  }
}
