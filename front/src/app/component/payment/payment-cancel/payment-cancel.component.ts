import { Component } from '@angular/core';
import { PaymentService } from '../../../core/services/payment/payment.service';

@Component({
  selector: 'app-payment-cancel',
  // template: `<h1>Payment Canceled</h1>`,
  standalone: true,
  imports: [],
  templateUrl: './payment-cancel.component.html',
  styleUrl: './payment-cancel.component.css'
})
export class PaymentCancelComponent {
  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    // Call backend to handle cancel logic
    this.paymentService.handleCancel().subscribe((response: any) => {
      console.log(response.message); // You can also show this message to the user
    });
  }
}
