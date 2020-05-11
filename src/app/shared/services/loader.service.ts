import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


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
  show(text: string) {
    let loader= new Loader();
    loader.visible = true;
    if (text)
      loader.text = text;
    else
      loader.text = this.defaultText;
  
      this.loaderSubject.next(loader);
    }
}
class Loader {
  visible: boolean
  text: string

}
