import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopDishAreaComponent } from "../top-dish-area/top-dish-area.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TopDishAreaComponent, LoginComponent, RegisterComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logo: string = 'assets/imgs/logo.png';
  isLogged:boolean=false;
  Userinfo!:any;
  UserId!:any;

  constructor(private serv:UsersService) { }
  ngOnInit() {
    this.isLogged = localStorage.getItem('auth_token') !== null;

    if (this.isLogged) {
      this.serv.getUser().subscribe({
        next: (res) => {
          this.Userinfo = res;
          this.UserId = this.Userinfo.id ;
          console.log(this.Userinfo);
          
          },
          error: (err) => {
            console.error(err);
            }
      })
      
    }
    
  }
  logout(){
    this.serv.logout();
    localStorage.removeItem('auth_token');
    this.isLogged = false;
  }

  // Dannle
toggleDarkMode() {
throw new Error('Method not implemented.');
}
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const navLinks = document.querySelector('.nav-links');
    if (this.menuOpen) {
      navLinks?.classList.add('open');
    } else {
      navLinks?.classList.remove('open');
    }
  }
  

 
}
