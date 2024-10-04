import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopDishAreaComponent } from "../top-dish-area/top-dish-area.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { SearchInputComponent } from "../search-input/search-input.component";
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,  // Add CommonModule here
    RouterLink,
    SearchInputComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  logo: string = 'assets/imgs/logo.png';
  menuOpen: boolean = false; // Track menu state
  darkMode: boolean = false; // Track dark mode state

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    console.log(this.darkMode)
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  constructor() { }
}
