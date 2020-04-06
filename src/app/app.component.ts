import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { 
  title = "Dashboard";
  description = "hello description";
  icon = "pe-7s-car icon-gradient bg-mean-fruit";
  hasLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService, 
    private titleService:Title, private activatedRoute: ActivatedRoute) {
    if (this.authService.isLoggedIn())
      this.router.navigate(['/dashboard']);
  }
  ngOnInit() {
    this.authService.hasLoggedInsubject.subscribe(x => {
      this.hasLoggedIn = x;
    });
    this.setPageTitle();  
  }
  
  setPageTitle()
  {
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
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
        const child = this.activatedRoute.firstChild;
        this.title = child.snapshot.data['title'];
        this.description = child.snapshot.data['description'];
        this.icon = child.snapshot.data['icon'];
      });
  }
  ngOnDestroy() {
    this.authService.hasLoggedInsubject.unsubscribe();
  }
}
