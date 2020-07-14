import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AmountValidatorService {  
  validate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[1-9]{1}[0-9]*$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidAmount: true };
    };
  } 
}


