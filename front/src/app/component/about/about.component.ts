import { Subscription } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TopDishAreaComponent } from '../top-dish-area/top-dish-area.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, CommonModule, TopDishAreaComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
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

      imageUrl:
        'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
    },
    {
      name: 'Momen',
      role: 'Full stack Developer',
      bio: `In the backend, I developed the schemas, models, controllers, and services in Laravel for managing recipes, categories, subcategories, and ingredients. I integrated Mailgun for real email functionality and connected Cloudinary for seamless image uploads. I also implemented a subscription system using Stripe to enable premium service purchases for users and configured CORS to ensure secure cross-origin resource sharing. Additionally, I developed an OTP system for email verification.
      On the frontend, using Angular, I built key features like the personal profile page, the "Add Recipe" page, and the "Single Recipe" page. These include functionalities for rating, saving, commenting, and adjusting the number of servings, all while maintaining full integration with the backend and ensuring a responsive, user-friendly design.`,
      imageUrl:
        'https://preview.redd.it/6q7k7hfumj471.jpg?width=640&crop=smart&auto=webp&s=3411f42389cdb97c6968da623d074697bde3cbdc',
    },
    {
      name: 'Mariam',
      role: 'Frontend Developer',
      bio: `In Angular, I developed the Landing Page with complete functionality, design, and backend integration. 
        I also created and designed the admin add/edit recipe page and admin dashboard, including CRUD operations for users, recipes, and pending recipes. 
        Additionally, I assisted in implementing search functionality and the navigation bar. I developed the footer and the invalid route error page. 
        Furthermore, I designed login and registration popup cards, implemented a function to toggle password visibility, 
        and formatted the date of birth to yyyy-mm-dd. Finally, all components are fully responsive.`,
      imageUrl: 'https://i.pinimg.com/originals/35/c1/0e/35c10edc6ef5cfc52b6f76f9f9455b77.jpg'
    },
    {
      name: 'Dannel',
      role: 'Frontend Developer And Data Gathering',
      bio: `In Angular designed About page and navbar, developed search functionality,dark mode for all of the website,and data collecting.`,
      imageUrl: 'https://media.tenor.com/w3dtW9NFejcAAAAe/sleepy-cat.png',
    },
  ];

  // Dark Mode state
  darkMode: boolean = false;

  // Method to toggle dark mode
  toggleDarkMode() {
    this.darkMode = !this.darkMode; // Toggle the state
    document.body.classList.toggle('dark-mode', this.darkMode); // Apply the 'dark-mode' class to the body
  }
}
