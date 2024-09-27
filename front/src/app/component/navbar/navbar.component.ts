import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopDishAreaComponent } from "../top-dish-area/top-dish-area.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TopDishAreaComponent, LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logo: string = 'assets/imgs/logo.png';

  constructor() { }


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
