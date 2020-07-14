import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmountValidatorService } from 'src/app/shared/validators/amount-validators.service';


@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent implements OnInit {
  @Input() selectedScheme;
  purchaseForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private amountValidator: AmountValidatorService
  ) { }

  get f() {
    return this.purchaseForm.controls;
  }

  ngOnInit() {
    this.purchaseForm = this.fb.group({
      amount: ['', Validators.compose([Validators.required, this.amountValidator.validate()])],
    });
  }

  getScheme(val) {
    console.log('get', val);
  }
  onSubmit() {
    this.submitted = true;
    if (this.purchaseForm.valid) {
      console.log(this.purchaseForm.value);
    }
  }
  closeModal() {
    this.submitted = false;
    this.purchaseForm.reset();
  }
}
