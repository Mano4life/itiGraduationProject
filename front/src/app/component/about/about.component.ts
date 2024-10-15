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
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      imageUrl:
        'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
    },
    {
      name: 'Momen',
      role: 'Full stack Developer',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      imageUrl:
        'https://preview.redd.it/6q7k7hfumj471.jpg?width=640&crop=smart&auto=webp&s=3411f42389cdb97c6968da623d074697bde3cbdc',
    },
    {
      name: 'Mariam',
      role: 'Frontend Developer',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      imageUrl:
        'https://i.pinimg.com/originals/35/c1/0e/35c10edc6ef5cfc52b6f76f9f9455b77.jpg',
    },
    {
      name: 'Dannel',
      role: 'Frontend Developer And Data Gathering',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
