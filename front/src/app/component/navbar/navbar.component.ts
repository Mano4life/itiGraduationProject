import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TopDishAreaComponent } from "../top-dish-area/top-dish-area.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
import { SearchInputComponent } from "../search-input/search-input.component";

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    TopDishAreaComponent,
    CommonModule,
    RouterLink,
    SearchInputComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  logo: string = 'assets/imgs/logo.png';
  isLogged: boolean = false;
  Userinfo!: any;
  UserId!: any;
  admin: boolean = false;
  premium: boolean = false;
  darkMode: boolean = false; // Track dark mode state
isCollapsed: boolean = true;

  constructor(private serv: UsersService, private router: Router) { }

  ngOnInit(): void {
    // Check for authentication tokens in localStorage
    this.isLogged = localStorage.getItem('auth_token') !== null || localStorage.getItem('admin_token') !== null || localStorage.getItem('premium_token') !== null;
    this.admin = localStorage.getItem('admin_token') !== null;
    this.premium = localStorage.getItem('premium_token') !== null;

    // Check for dark mode preference in localStorage
    const darkModeSetting = localStorage.getItem('darkMode');
    this.darkMode = darkModeSetting === 'true';
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    }
    
  }

  logout(): void {
    // Call service to logout user and clear localStorage tokens
    this.serv.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('premium_token');
    this.isLogged = false;

    // Navigate back to the home page after logout
    this.router.navigate(['/']);
  }

  // Toggle dark mode and persist the preference in localStorage
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode.toString()); // Store dark mode preference
  }

  // Switch between Bootstrap modals
  switchModals(currentModalId: string, nextModalId: string): void {
    // Hide the current modal
    const currentModalEl = document.getElementById(currentModalId);
    const currentModalInstance = bootstrap.Modal.getInstance(currentModalEl);
    if (currentModalInstance) {
      currentModalInstance.hide();
    }

    // Show the next modal
    const nextModalEl = document.getElementById(nextModalId);
    const nextModalInstance = new bootstrap.Modal(nextModalEl);
    nextModalInstance.show();
  }
}
