import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  teamMembers: any = [
    {
      name: 'Lindsay',
      role: 'Voice, Author, Creator',
      bio: 'Lindsay is the voice, author, and creator behind Pinch of Yum. She develops recipes and writes content for the blog and Instagram.',
      imageUrl: 'https://ibb.co/KyRfW9G'
    },
    {
      name: 'Bjork',
      role: 'Chief Tech Consultant',
      bio: 'Bjork is the chief tech consultant / business advisor / taste tester at Pinch of Yum.',
      imageUrl: 'https://placehold.co/600x400'
    },
    {
      name: 'Jenna',
      role: 'Communications Manager',
      bio: 'Jenna is the Communications Manager at Pinch of Yum. She manages much of the day-to-day communication with readers and brands.',
      imageUrl: 'https://placehold.co/600x400'

    }
  ];

  stars = Array(5).fill(0);
  currentHoveredStar = 0;    
  starRate = 0; 

  onStarHover(starValue: number) {
    this.currentHoveredStar = starValue;
  }

  onStarLeave() {
    this.currentHoveredStar = 0;
  }

  onStarClick(starValue: number) {
    this.starRate = starValue;
  }
}
