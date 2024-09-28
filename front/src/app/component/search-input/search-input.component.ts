import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../core/services/recipes/recipes.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  searchResults$!: Observable<any[]>;
  searchQuery: string = '';

  private searchResultSource = new BehaviorSubject<any[]>([]);
  recipes: any[] = [];

  constructor(private recipesService: RecipesService) {
    this.recipesService.getRecipes().subscribe((res: any) => {
      this.recipes = res;
      this.searchResults$ = this.searchResultSource.asObservable();
    });
  }

  search(query: string) {
    if (query.trim() === '') {
      this.searchResultSource.next([]);
    } else {
      const filteredResults = this.recipes.filter((recipe: any) => {
        const nameMatches = recipe.name.toLowerCase().includes(query.toLowerCase());
        const ingredientsMatch = recipe.ingredients?.some((ingredient: string) =>
          ingredient.toLowerCase().includes(query.toLowerCase())
        );
  
        return nameMatches || ingredientsMatch;
      });
  
      this.searchResultSource.next(filteredResults);
    }
  }

  onClear() {
    this.searchQuery = '';
    this.search(''); 
  }
}
