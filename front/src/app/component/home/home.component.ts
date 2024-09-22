import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { 
  faceImg: string = 'assets/imgs/home-banner.png';
  videoUrl: string = 'https://max-themes.net/demos/recibo/upload/pizza.mp4';
  userImg: string = 'assets/imgs/raspberries-7213407_640.jpg';

  categories: any[] = [
    {
      id: 1,
      name: 'Dinner',
      img: 'https://pinchofyum.com/wp-content/uploads/Salmon-Tacos-61-1-840x1200.jpg'
    },
    {
      id: 2,
      name: 'Lunch',
      img: 'https://pinchofyum.com/wp-content/uploads/Marry-Me-Chicken-6-840x1200.jpg',
    },
    {
      id: 3,
      name: 'Lunch',
      img:'https://pinchofyum.com/wp-content/uploads/cropped-Tempeh-Bowls-6.jpg',
    },
    {
      id: 4,
      name: 'Lunch',
      img:'https://pinchofyum.com/wp-content/uploads/butter-chicken-3-840x1200.jpg',
    },
  ]

  subCategories: any[] = [
    {
      id: 1,
      name: 'Dinner',
      img: 'https://pinchofyum.com/wp-content/uploads/Salmon-Tacos-61-1-840x1200.jpg'
    },
    {
      id: 2,
      name: 'Lunch',
      img: 'https://pinchofyum.com/wp-content/uploads/Marry-Me-Chicken-6-840x1200.jpg',
    },
    {
      id: 3,
      name: 'Lunch',
      img:'https://pinchofyum.com/wp-content/uploads/cropped-Tempeh-Bowls-6.jpg',
    },
    {
      id: 4,
      name: 'Lunch',
      img:'https://pinchofyum.com/wp-content/uploads/butter-chicken-3-840x1200.jpg',
    },  
    {
      id: 5,
      name: 'Dinner',
      img: 'https://pinchofyum.com/wp-content/uploads/Salmon-Tacos-61-1-840x1200.jpg'
    },
    {
      id: 6,
      name: 'Lunch',
      img: 'https://pinchofyum.com/wp-content/uploads/Marry-Me-Chicken-6-840x1200.jpg',
    },
    {
      id: 7,
      name: 'Lunch',
      img:'https://pinchofyum.com/wp-content/uploads/cropped-Tempeh-Bowls-6.jpg',
    },
    {
      id: 8,
      name: 'Lunch',
      img:'https://pinchofyum.com/wp-content/uploads/butter-chicken-3-840x1200.jpg',
    }, 
  ];
  
}
