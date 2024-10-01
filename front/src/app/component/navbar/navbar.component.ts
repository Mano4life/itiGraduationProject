import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
import { SearchInputComponent } from "../search-input/search-input.component";

declare var bootstrap: any;
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LoginComponent, RegisterComponent,CommonModule, RouterLinkActive, SearchInputComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logo: string = 'assets/imgs/logo.png';
  isLogged:boolean=false;
  Userinfo!:any;
  UserId!:any;
  admin:boolean=false;
  constructor(private serv:UsersService, private router: Router) { }
  ngOnInit() {
    this.isLogged = localStorage.getItem('auth_token') !== null || localStorage.getItem('admin_token') !== null ;
    this.admin=localStorage.getItem('admin_token') !== null;
    console.log(this.admin)
  }

  logout(){
    this.serv.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin_token');
    this.isLogged = false;
    this.router.navigate(['/']);
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