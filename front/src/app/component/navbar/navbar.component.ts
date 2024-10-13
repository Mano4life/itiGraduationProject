import { Component, HostListener, OnInit } from '@angular/core';
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
  isLogged:boolean=false;
  Userinfo!:any;
  UserId!:any;
  admin:boolean=false;
  premium:boolean=false;
  darkMode: boolean = false; // Track dark mode state

  constructor(private serv:UsersService, private router: Router) { }
  
  ngOnInit() {
    this.isLogged = localStorage.getItem('auth_token') !== null || localStorage.getItem('admin_token') !== null ||  localStorage.getItem('premium_token') !== null ;
    this.admin=localStorage.getItem('admin_token') !== null;
    this.premium=localStorage.getItem('premium_token') !==null;
  }

  isScrolledUp = false;
  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let currentScrollTop = window.scrollY;

    if (currentScrollTop > this.lastScrollTop || window.scrollY == 0) {
      // User is scrolling down
      this.isScrolledUp = false;
    } else {
      // User is scrolling up
      this.isScrolledUp = true;
    }

    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For mobile or negative scrolling
  }

  logout(){
    this.serv.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('premium_token');
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  // DarkMode
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    console.log(this.darkMode)
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
  
  // This method switches modals using Bootstrap's modal instance
  switchModals(currentModalId: string, nextModalId: string) {
    // Get the current modal instance and hide it
    const currentModalEl = document.getElementById(currentModalId);
    const currentModalInstance = bootstrap.Modal.getInstance(currentModalEl);
    if (currentModalInstance) {
      currentModalInstance.hide();
    }

    // Get the next modal instance and show it
    const nextModalEl = document.getElementById(nextModalId);
    const nextModalInstance = new bootstrap.Modal(nextModalEl);
    nextModalInstance.show();
  }


}
