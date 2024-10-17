import { Component } from '@angular/core';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { UsersService } from '../../../core/services/users/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  // template: `<h1>Payemnt Successful!</h1>`,
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  user!:any;
  constructor(private paymentService: PaymentService, private usersService: UsersService) {}

  ngOnInit() {
    // Call backend to handle success logic
    this.paymentService.handleSuccess().subscribe((response: any) => {
    });

    this.usersService.getUser().subscribe((res)=>{
      this.user = res;
      this.usersService.EditUser({
        "name": this.user.name,
        "gender": this.user.gender,
        "date_of_birth": this.user.date_of_birth,
        "role": 'premium'
      }).subscribe((res)=>{
      })
    })
  }
}
