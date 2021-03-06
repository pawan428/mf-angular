import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { error } from 'protractor';
import { throwError } from 'rxjs';
import { MessageService } from '../services/message.service';

@Injectable()
export class UsernameValidator {

    debouncer: any;

    constructor(private loaderService: LoaderService, private userService: UserService, private messageService: MessageService) {

    }

    checkAvailability(control: FormControl): any {
if(!control.value)
return null;
        clearTimeout(this.debouncer);
        let ref = this;
        return new Promise(resolve => {
            this.debouncer = setTimeout(() => {
                this.loaderService.showText('Checking Availability');
                this.userService.getUserByEmail(control.value).subscribe(avl => {
                    if (avl) {
                        resolve({ 'emailInUse': true });
                    }
                    else {
                        resolve(null);
                    }
                    ref.loaderService.hide();
                })               
            }, 1000);
        })
    }

}