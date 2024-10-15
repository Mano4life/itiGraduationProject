import { Component } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { Observable } from 'rxjs';
import { TopDishAreaComponent } from "../top-dish-area/top-dish-area.component";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [TopDishAreaComponent],
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
