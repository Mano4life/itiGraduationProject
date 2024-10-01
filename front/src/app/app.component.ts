import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { Renderer2 } from '@angular/core';
import { FooterComponent } from "./component/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private renderer: Renderer2) {}
  toggleDarkMode() {
    const body = document.body;
    const teamSection = document.querySelector('.team-section');
    const teamMembers = document.querySelectorAll('.team-member');
  
    if (body.classList.contains('dark-mode')) {
      this.renderer.removeClass(body, 'dark-mode');
      this.renderer.removeClass(teamSection, 'dark-mode');
      teamMembers.forEach(member => {
        this.renderer.removeClass(member, 'dark-mode');
      });
      localStorage.setItem('theme', 'light');
    } else {
      this.renderer.addClass(body, 'dark-mode');
      this.renderer.addClass(teamSection, 'dark-mode');
      teamMembers.forEach(member => {
        this.renderer.addClass(member, 'dark-mode');
      });
      localStorage.setItem('theme', 'dark');
    }
    console.log(['a','b','c','d'].filter((value) => value.toLowerCase().includes('a')))
  }


}
