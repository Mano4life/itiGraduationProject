import { Component } from '@angular/core';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  standalone: true,
  imports: [RouterLink],
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
