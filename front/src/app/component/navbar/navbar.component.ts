import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {  Renderer2, OnInit } from '@angular/core';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

 /* toggleDarkMode() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
      this.renderer.removeClass(body, 'dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      this.renderer.addClass(body, 'dark-mode');
      localStorage.setItem('theme', 'dark');
    }
    console.log(['a','b','c','d'].filter((value) => value.toLowerCase().includes('a')))

  }
*/
toggleDarkMode() {
  const body = document.body;
  const teamSection = document.querySelector('.team-section');
  const teamMembers = document.querySelectorAll('.team-member');
 // const navbar = document.querySelectorAll('.navbar');
 // console.log(navbar)
  if (body.classList.contains('dark-mode')) {
    this.renderer.removeClass(body, 'dark-mode');
    this.renderer.removeClass(teamSection, 'dark-mode');
   /* this.renderer.removeClass(navbar, 'dark-mode');*/
    teamMembers.forEach(member => {
      this.renderer.removeClass(member, 'dark-mode');
    });
    localStorage.setItem('theme', 'light');
  } else {
    this.renderer.addClass(body, 'dark-mode');
    this.renderer.addClass(teamSection, 'dark-mode');
   /* this.renderer.addClass(navbar, 'dark-mode');*/

    teamMembers.forEach(member => {
      this.renderer.addClass(member, 'dark-mode');
    });
    localStorage.setItem('theme', 'dark');
  }
 
}
  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }
  
}