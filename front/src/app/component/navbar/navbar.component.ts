import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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
