import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ResponseModel, MessageType } from 'src/app/models/response';
import { MessageService } from 'src/app/shared/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  globalMessage: ResponseModel;   
  msgSubscription: Subscription;
  constructor(private msgService: MessageService) {
  }

  ngOnInit() {
    this.msgSubscription = this.msgService.globalMessage.subscribe(m => {
      this.globalMessage = m;
    });
  }

  close() {
    this.globalMessage = null;
    //this.msgSubscription.unsubscribe();
  }
  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
  }
}
