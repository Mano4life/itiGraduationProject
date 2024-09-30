import { Component } from '@angular/core';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { UsersService } from '../../../core/services/users/users.service';

@Component({
  selector: 'app-payment-success',
  // template: `<h1>Payemnt Successful!</h1>`,
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  user!:any;
  constructor(private paymentService: PaymentService, private usersService: UsersService) {}

  ngOnInit() {
    // Call backend to handle success logic
    this.paymentService.handleSuccess().subscribe((response: any) => {
      console.log(response.message); // You can also show this message to the user
    });

    this.usersService.getUser().subscribe((res)=>{
      this.user = res;
      console.log(res)
      this.usersService.EditUser({
        "name": this.user.name,
        "gender": this.user.gender,
        "date_of_birth": this.user.date_of_birth,
        "role": 'premium'
      }).subscribe((res)=>{
        console.log(res)
      })
    })
  }
}
