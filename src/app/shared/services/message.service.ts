import { Injectable, EventEmitter, Output } from '@angular/core';
import { ResponseModel, MessageType } from 'src/app/models/response';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ThemeSettingComponent } from 'src/app/components/_layout/theme-setting/theme-setting.component';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  @Output() globalMessage: EventEmitter<ResponseModel> = new EventEmitter();

  constructor() { }
  reset() {
    this.globalMessage.next(null);
  }
  showMessage(message, type) {
    // let em: ResponseModel = error;
    // if (error.ok) { // for success
    //   em.message = error.message;
    //   setTimeout(() => {
    //     this.reset()
    //   }, 3000);
    // }
    // else { // for error 
    //   if (error.status === 0 || error.status === 500 || typeof error.error == "object") {
    //     em.message = "Internal Server Error"; //set common error
    //   }
    //   else {
    //     em.message = error.error;
    //   }
    // }
    // this.globalMessage.next(em);

    if (!type)
      type = 'info';
    let em: ResponseModel = { type, message };
    this.globalMessage.next(em);
  }
  showPersistentMessage(message, type) {
    if (!type)
      type = 'info';
    let em: ResponseModel = { type, message };
    this.globalMessage.next(em);
  }
}
