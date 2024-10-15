import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TopDishAreaComponent } from '../top-dish-area/top-dish-area.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, CommonModule, TopDishAreaComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers: any = [
    {
      name: 'Raghad',
      role: 'Full stack Developer',
      bio: `In Laravel, developed features for user management,
       including user accounts, comments, recipe saving, and recipe ratings, 
       along with the corresponding schema, models, controllers, and services.
      implemented user authentication using Sanctum and resetting password.
      In Angular, created a comprehensive "All Recipes" page with full functionality and integrated it with the backend.
      Additionally,developed a public user profile and implemented user editing capabilities in the admin dashboard,
      assisting in the design of personal profiles.`,

      imageUrl: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
    },
    {
      name: 'Momen',
      role: 'Full stack Developer',
      bio: `In Laravel, developed the schemas, models, controllers, and services for recipes, categories, subcategories, and ingredients. 
      integrated Laravel with Mailgun to enable sending real emails and
      connected Cloudinary for image uploads. 
      Additionally, implemented an OTP system for email verification.
      In Angular, I created a personal profile, an "Add Recipe" page, and a "Single Recipe" page with "rating" ,"save","comment","change serving number",
      ensuring full functionality, design, and backend connectivity. `,
      imageUrl: 'https://preview.redd.it/6q7k7hfumj471.jpg?width=640&crop=smart&auto=webp&s=3411f42389cdb97c6968da623d074697bde3cbdc'
    },
    {
      name: 'Mariam',
      role: 'Frontend Developer',
      bio: `In Angular, developed the Landing Page with complete functionality,
       design, and backend integration. also created and designed admin add/edit recipe page and admin dashboard with CRUD operations for users, recipes, and pending recipes,
      and assisted with implementing search functionality and the navigation bar. `,
      imageUrl: 'https://i.pinimg.com/originals/35/c1/0e/35c10edc6ef5cfc52b6f76f9f9455b77.jpg'
    },
    {
      name: 'Dannel',
      role: 'Frontend Developer And Data Gathering',
      bio: `In Angular designed About page and navbar, developed search functionality,dark mode for all of the website,and data collecting.`,
      imageUrl: 'https://media.tenor.com/w3dtW9NFejcAAAAe/sleepy-cat.png'
    }
  ];

  // Dark Mode state
  darkMode: boolean = false;

  // Method to toggle dark mode
  toggleDarkMode() {
    this.darkMode = !this.darkMode; // Toggle the state
    document.body.classList.toggle('dark-mode', this.darkMode); // Apply the 'dark-mode' class to the body
  }
}
