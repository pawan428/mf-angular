import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Loader } from 'src/app/data/loader';


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
    loader.text = this.defaultText;
    this.loaderSubject.next(loader);
  }
  show(text: string,fullpage) {
    let loader= new Loader();
    loader.visible = true;
    if (text)
      loader.text = text;
    else
      loader.text = this.defaultText;
  
      if(fullpage)
      loader.fullpage=fullpage;
      else
      loader.fullpage=false;

      this.loaderSubject.next(loader);
    }
}

