import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  onRecipeClick(id: number) {
    this.router.navigate(['/recipes', id]);
  }
}
