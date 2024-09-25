import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  recipes!: any;
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(){
    this.recipesService.getRecipes().subscribe((res)=>{
      this.recipes = res;
    });
  }


  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
  }
}
