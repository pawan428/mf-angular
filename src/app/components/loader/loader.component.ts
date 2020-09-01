import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  text: string;
  visible: boolean;
  fullpage: boolean;
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.loaderService.loaderSubject.subscribe(l => {
      if (l) {
        this.text = l.text;
        this.visible = l.visible;
      }
    });
  }

  ngOnDestroy() {
    this.loaderService.loaderSubject.unsubscribe();
  }
}
