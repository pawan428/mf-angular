import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { TestBed } from '@angular/core/testing';

@Injectable()
export class UsernameValidator {

    debouncer: any;

    constructor(private loaderService: LoaderService) {

    }

    checkAvailability(control: FormControl): any {

        clearTimeout(this.debouncer);
        let ref = this;
        return new Promise(resolve => {
            this.debouncer = setTimeout(() => {
                this.loaderService.show('Checking Availability',false);
                let avlPromise = this.isAvailable(control.value);
                avlPromise.then(function (avl) {
                    if (avl) {
                        resolve(null);
                    }
                    else {
                        resolve({ 'usernameInUse': true });
                    }
                    ref.loaderService.hide();
                })
            }, 1000);
        })
    }

    isAvailable(val) {
        //call here api to check value from database.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let bool;
                if (val !== "test@test.com")
                    bool = true;
                else
                    bool = false;

                resolve(bool);
            }, 2000);
        })
    }
}