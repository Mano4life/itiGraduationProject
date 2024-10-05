import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { Router } from '@angular/router';

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

  constructor(private recipesService: RecipesService,private router: Router) {
    this.recipesService.getRecipes().subscribe((res: any) => {
      this.recipes = res;
      this.searchResults$ = this.searchResultSource.asObservable();
    });
  }

  displayedResults: any[] = [];
  search(query: string) {
    if (query.trim() === '') {
      this.searchResultSource.next([]);
    } else {
      const filteredResults = this.recipes.filter((recipe: any) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      this.searchResultSource.next(filteredResults);
      this.displayedResults = filteredResults;
    }
  }


  onClear() {
    this.searchQuery = '';
    this.search(''); 
  }

  onSelect(id:number){
    this.router.navigate(['/recipes', id]);
    this.onClear()
  }

//   const filteredResults = this.recipes.filter((recipe: any) => {
//     const nameMatches = recipe.name.toLowerCase().includes(query.toLowerCase());
//     const ingredientsMatch = recipe.ingredients?.some((ingredient: string) =>
//       ingredient.toLowerCase().includes(query.toLowerCase())
//     );

//     return nameMatches || ingredientsMatch;
//   });

//   this.searchResultSource.next(filteredResults);
// }
}
