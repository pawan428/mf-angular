import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class UsernameValidator {

    debouncer: any;

    constructor() {

    }

    checkUsername(control: FormControl): any {

        clearTimeout(this.debouncer);

        return new Promise(resolve => {

            this.debouncer = setTimeout(() => {

                //this.authProvider.validateUsername(control.value).subscribe((res) => {
                    console.log(control.value);
                if (control.value === "test@test.com") { //call here api to check value from database.
                    resolve({ 'usernameInUse': true });
                }
                else {
                    resolve(null);
                }
            }, 1000);

        });
    }

}