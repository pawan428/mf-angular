import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Loader } from 'src/app/models/loader';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderSubject = new BehaviorSubject<Loader>(null);
  private defaultText = 'loading...'

  constructor() {
  }

  hide() {
    let loader= new Loader();   
    loader.visible = false;
    this.loaderSubject.next(loader);
  }

  show() {
    let loader= new Loader();
    loader.visible = true; 
      loader.text = this.defaultText; 
      this.loaderSubject.next(loader);
    }
  showText(text: string) {
    let loader= new Loader();
    loader.visible = true;
    if (text)
      loader.text = text;
    else
      loader.text = this.defaultText; 
      this.loaderSubject.next(loader);
    }
}

