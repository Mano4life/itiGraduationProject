import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TopDishAreaComponent } from "../top-dish-area/top-dish-area.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, TopDishAreaComponent,RouterLink, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  faceImg: string = 'assets/imgs/home-banner.png';
  videoUrl: string = 'https://max-themes.net/demos/recibo/upload/pizza.mp4';
  userImg: string = 'assets/imgs/raspberries-7213407_640.jpg';

  categories: any[] = [
    {
      id: 1,
      name: 'Breakfast',
      img: 'https://images.pexels.com/photos/5589030/pexels-photo-5589030.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      name: 'Lunch',
      img: 'https://pinchofyum.com/wp-content/uploads/Marry-Me-Chicken-6-840x1200.jpg',
    },
    {
      id: 3,
      name: 'Dinner',
      img: 'https://pinchofyum.com/wp-content/uploads/cropped-Tempeh-Bowls-6.jpg',
    },
    {
      id: 4,
      name: 'Desserts',
      img: 'https://www.twopeasandtheirpod.com/wp-content/uploads/2019/06/cropped-Brownies-7-420x420.jpg',
    },
  ];

  subCategories: any[] = [
    {
      id: 1,
      name: 'Beef',
      img: 'https://therecipecritic.com/wp-content/uploads/2017/04/koreanbeefcrop-300x300.png',
    },
    {
      id: 2,
      name: 'Chieckn',
      img: 'https://therecipecritic.com/wp-content/uploads/2020/05/chickenmarinade_5-300x300.jpg',
    },
    {
      id: 3,
      name: 'Noodles',
      img: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      name: 'Soups',
      img: 'https://therecipecritic.com/wp-content/uploads/2019/12/creamy_sausage_tortellini-300x300.jpg',
    },
    {
      id: 5,
      name: 'Bread',
      img: 'https://images.pexels.com/photos/2067631/pexels-photo-2067631.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      name: 'Salads',
      img: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 7,
      name: 'Pies & Tarts',
      img: 'https://www.davidlebovitz.com/wp-content/uploads/2016/06/Frangipan-French-fruit-tart-recipe-4-292x292.jpg',
    },
    {
      id: 8,
      name: 'Cakes',
      img: 'https://www.davidlebovitz.com/wp-content/uploads/2015/05/Cranberry-Upside-Down-Cake-recipe-8-292x292.jpg',
    },
  ];

  constructor(private recipes: RecipesService) {}

  recipesArr!: any;

  ngOnInit() {
    this.recipes.getRecipes().subscribe((res) => {
      this.recipesArr = res;
      console.log(this.recipesArr);
    });
  }

  // Display Random Recipes
  getRandomRecipes(count: number) {
    const shuffle = this.recipesArr?.sort(() => 0.5 - Math.random());
    return shuffle?.slice(0, count);
  }
}
