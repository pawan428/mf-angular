import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmountValidatorService } from 'src/app/shared/validators/amount-validators.service';


@Component({
  selector: 'app-redeem-modal',
  templateUrl: './redeem-modal.component.html',
  styleUrls: ['./redeem-modal.component.css']
})
export class RedeemModalComponent implements OnInit {
  @Input() selectedScheme;
  @Input() scheme;
  redeemForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private amountValidator:AmountValidatorService
  ) { }

  get f() {
    return this.redeemForm.controls;
  }

  ngOnInit() {
    this.redeemForm = this.fb.group({
      amount: ['', Validators.compose([Validators.required, this.amountValidator.validate()])],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.redeemForm.valid) {
      ///alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.log(this.redeemForm.value);
    }
  }
  closeModal()
  {
    this.submitted = false;
    this.redeemForm.reset();
  }

}
