import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TopDishAreaComponent } from "../top-dish-area/top-dish-area.component";
import { Router, RouterLink } from '@angular/router';

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
      name: 'dinner',
      img: 'https://pinchofyum.com/wp-content/uploads/cropped-Tempeh-Bowls-6.jpg',
    },
    {
      id: 4,
      name: 'dessert',
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
      name: 'chicken',
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
      name: 'cake',
      img: 'https://www.davidlebovitz.com/wp-content/uploads/2015/05/Cranberry-Upside-Down-Cake-recipe-8-292x292.jpg',
    },
  ];

  constructor(private recipes: RecipesService,private router:Router) {}

  recipesArr!: any;
  findRecipes!: any;
  randomRecipesArr!: any;
  shuffle!: any;
  ngOnInit() {
    this.getNormalRecipes();
  }

  getNormalRecipes(){
    this.recipes.getRecipes().subscribe((res) => {
      this.recipesArr = res;
      this.findRecipes = this.recipesArr.filter( (recipe:any) => recipe.user.role != 'premium');
      console.log(this.findRecipes);
      
      this.randomRecipesArr = this.getRandomRecipes(4);
    });
  }

  // Display Random Recipes
  getRandomRecipes(count: number) {
    // [...]creates a shallow copy of recipesArr for shuffling. This way, the original array remains unchanged.
    this.shuffle = [...this.findRecipes].sort(() => 0.5 - Math.random());
    console.log(this.shuffle);
    return this.shuffle.slice(0, count);
  }

  categoryClicked(name: string) {
    this.router.navigate(['/recipes'], {
        queryParams: {
            category: name
        }
    });
}
  subcategoryClicked(name:string){
    this.router.navigate(['/recipes'],{
      queryParams:{
        subcategory:name
      }
      })
  }
}
