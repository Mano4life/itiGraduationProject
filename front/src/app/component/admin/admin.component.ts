import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableModule, RatingModule, CommonModule, PaginatorModule, ButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  // data!: Array<any> ;
  p: number = 1;
  products: Array<any> = [
    {
        id: '1',
        img: 'bamboo-watch.jpg',
        name: 'Bamboo Watch',
        username: "Mohamed Sadek",
    },
    {
        id: '2',
        img: 'blue-band.jpg',
        name: 'Blue Band',
        username: "Alaa Lashen",
    },
    {
        id: '3',
        img: 'blue-t-shirt.jpg',
        name: 'Blue T-Shirt',
        username: "Ahmed Morad",
    },
    {
        id: '4',
        img: 'bracelet.jpg',
        name: 'Bracelet',
        username: "Mirna Elhelbawy",
    },
    {
    id: '5',
    img: 'bamboo-watch.jpg',
    name: 'Bamboo Watch',
    username: "Mariam Ahmed",
  },
  {
      id: '6',
      img: 'black-watch.jpg',
      name: 'Black Watch',
      username: "Norhan Abu Bakr",
  },
  {
      id: '7',
      img: 'blue-band.jpg',
      name: 'Blue Band',
      username: "Mohamed Sadek",
  },
  {
      id: '8',
      img: 'blue-t-shirt.jpg',
      name: 'Blue T-Shirt',
      username: "Mohamed Sadek",
  },
  {
      id: '9',
      img: 'bracelet.jpg',
      name: 'Bra',
      username: "Mohamed Sadek",
  }
  ]

  constructor(private recipes: RecipesService) {}

  recipesArr!: any;
  ngOnInit() {
    this.recipes.getRecipes().subscribe((res) => {
      this.recipesArr = res;
      console.log(this.recipesArr);
    });
  }

  activeSection: string = 'recipes';
  // Method to switch sections
  changeSection(section: string) {
    this.activeSection = section;
  }
}
