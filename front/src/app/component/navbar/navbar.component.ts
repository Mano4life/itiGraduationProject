import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';  // Import NgClass for using it in your component
import { SearchInputComponent } from "../search-input/search-input.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, SearchComponent, SearchInputComponent, LoginComponent, RegisterComponent, NgClass],  // Add NgClass to imports
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logo: string = 'assets/imgs/logo.png';
  isMenuOpen: boolean = false;

  constructor() { }

  // Toggle dark mode by adding/removing the dark-mode class on the body
  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  }

  // Check the localStorage for theme preference on component initialization
  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }

  // Toggle the visibility of the navigation menu on smaller screens
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
