import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router'; // Use RouterModule instead of RouterLink
import { TopDishAreaComponent } from "../top-dish-area/top-dish-area.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { SearchInputComponent } from "../search-input/search-input.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,  SearchInputComponent, LoginComponent, RegisterComponent], // RouterModule instead of RouterLink
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
toggleNavbar() {
throw new Error('Method not implemented.');
}
  logo: string = 'assets/imgs/logo.png';

  constructor(private renderer: Renderer2) { }

  /* toggleDarkMode() {
    const body = document.body;
    const teamSection = document.querySelector('.team-section');
    const teamMembers = document.querySelectorAll('.team-member');

    if (body.classList.contains('dark-mode')) {
      this.renderer.removeClass(body, 'dark-mode');
      if (teamSection) this.renderer.removeClass(teamSection, 'dark-mode');
      teamMembers.forEach(member => {
        this.renderer.removeClass(member, 'dark-mode');
      });
      localStorage.setItem('theme', 'light');
    } else {
      this.renderer.addClass(body, 'dark-mode');
      if (teamSection) this.renderer.addClass(teamSection, 'dark-mode');
      teamMembers.forEach(member => {
        this.renderer.addClass(member, 'dark-mode');
      });
      localStorage.setItem('theme', 'dark');
    }
  }
*/
  toggleResponsiveMenu() {
    const topnav = document.getElementById('myTopnav');

    if (topnav) {
      if (topnav.className === 'topnav') {
        topnav.className += ' responsive';
      } else {
        topnav.className = 'topnav';
      }
    }
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }
}
