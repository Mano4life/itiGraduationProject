import { Component } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  constructor(private paymentService: PaymentService) {}

  makePayment() {
    this.paymentService.checkout().subscribe({
      next: (res: any) => {
        window.location.href = res.url;
      },
      error: (error: any) => {
        console.error('Payment initiation failed', error);
      },
    });
  }
}
