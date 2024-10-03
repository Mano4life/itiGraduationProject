import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { SubcategoriesService } from '../../core/services/subcategories/subcategories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-premium-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './premium-recipe.component.html',
  styleUrl: './premium-recipe.component.css'
})
export class PremiumRecipeComponent {
  recipeList: any[] = [];
  sub_categoryList: any[] = [];
  ingredentsList: any[] = [];
  
  constructor(
    private recipes: RecipesService,
    private subcategories: SubcategoriesService,
    private ingredent: IngredientsService,
    private router: Router,
    private  route: ActivatedRoute

  ) {
    
  }
  ngOnInit(): void {
    this.getreciepes();
    this.getsubcategories();
    this.getingredients();
    this.getFilterFromHome()
    
  }
  getFilterFromHome() {
    this.route.queryParams.subscribe((res) => {
      let filteredRecipes = this.recipeList; // Start with the original list
  
      if (res['category']) {
        filteredRecipes = filteredRecipes.filter((recipe) => {
          return recipe.category.name === res['category'];
        });
      }
      
      if (res['subcategory']) {
        filteredRecipes = filteredRecipes.filter((recipe) => {
          return recipe.subcategory.name === res['subcategory'];
        });
      }
  
      // Update the original recipe list with filtered results
      this.recipeList = filteredRecipes; // This modifies the original list
    });
  }
  getreciepes() {
    this.recipes.getRecipes().subscribe({
      next: (Response: any) => {
        this.recipeList = Response;
        const premiumRecipes = this.recipeList.filter(recipe => 
           recipe.user.role === 'premium'
        );
  
        if (premiumRecipes.length > 0) {
          this.recipeList = premiumRecipes;
        } else {
          this.recipeList = []; // Or handle the case when no premium recipes are found
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getsubcategories() {
    this.subcategories.getSubCategories().subscribe({
      next: (Response: any) => {
        // Assuming Response.data is an array of subcategories
        this.sub_categoryList = Response.data.map(
          (sub: any, index: number) => ({
            id: sub.id, // Adjust this based on your actual response structure
            name: sub.name,
            selected: false, // Initialize selected as false
          })
        );
        console.log(this.sub_categoryList);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getingredients() {
    this.ingredent.getIngredients().subscribe({
      next: (Response: any) => {
        // Assuming Response.data is an array of subcategories
        this.ingredentsList = Response.map((sub: any, index: number) => ({
          id: sub.id, // Adjust this based on your actual response structure
          name: sub.name,
          selected: false, // Initialize selected as false
        }));
        console.log(this.ingredentsList);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  time = [
    { id: 1, name: '15 min >', selected: false },
    { id: 2, name: '20 min >', selected: false },
    { id: 3, name: '30 min >', selected: false },
    { id: 4, name: '40 min >', selected: false },
    { id: 5, name: 'more than 60 min ', selected: false },
  ];

  dropdownOpen = false;
  dropdown2Open = false;
  dropdown3Open = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdown2Open = false;
    this.dropdown3Open = false;
  }
  toggleDropdown2() {
    this.dropdownOpen = false;
    this.dropdown2Open = !this.dropdown2Open;
    this.dropdown3Open = false;
  }
  toggleDropdown3() {
    this.dropdownOpen = false;
    this.dropdown2Open = false;
    this.dropdown3Open = !this.dropdown3Open;
  }
  toggleOption(option: any) {
    this.sub_categoryList.forEach((opt) => {
      opt.selected = opt === option ? !opt.selected : false;
    });
  }

  getSelectedSub_category() {
    return this.sub_categoryList
      .filter((option) => option.selected)
      .map((opt) => opt.name);

  }
  toggleOption2(option: any) {
    option.selected = !option.selected;
  }

  getSelectedIngridents() {
    return this.ingredentsList.filter((option) => option.selected);
  }
  toggleOption3(option: any) {
    this.time.forEach((opt) => {
      opt.selected = opt === option ? !opt.selected : false;
    });
  }

  getSelectedIngredients() {
    return this.ingredentsList
      .filter((option) => option.selected)
      .map((opt) => opt.name);
  }

  getSelectedtime() {
    return this.time.filter((option) => option.selected).map((opt) => opt.name);
  }

  selectedCategories: string[] = [];

  toggleCategory(category: string) {
    this.selectedCategories = [];

    this.selectedCategories.push(category);
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  getFilteredRecipes() {
    const selectedSubCategories = this.getSelectedSub_category();
    const selectedIngredients = this.getSelectedIngredients();
    const selectedTimes = this.getSelectedtime();

    return this.recipeList.filter((recipe) => {
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(recipe.category.name);
      const matchesSubCategory =
        selectedSubCategories.length === 0 ||
        selectedSubCategories.includes(recipe.subcategory.name);
      const matchesIngredients =
        selectedIngredients.length === 0 ||
        recipe.ingredients.some((ingredient: any) =>
          selectedIngredients.includes(ingredient.name)
        );

      const matchesTime =
        selectedTimes.length === 0 ||
        this.timeMatches(recipe.time, selectedTimes);

      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesIngredients &&
        matchesTime
      );
    });
  }
  timeMatches(recipeTime: number, selectedTimes: string[]): boolean {
    return selectedTimes.some((selected) => {
      if (selected === '15 min >')
        return recipeTime == 15 || recipeTime < 15;
      if (selected === '20 min >')
        return recipeTime == 15 || recipeTime <= 20;
      if (selected === '30 min >')
        return recipeTime == 30 || recipeTime < 40;
      if (selected === '40 min >')
        return recipeTime == 40 || recipeTime < 60;
      if (selected === 'more than 60 min ')
         return recipeTime == 60 || recipeTime > 60;
      return false;
    });
  }
  SingleRecipePage(recipeId: number) {
    this.router.navigate(['/recipes', recipeId]);
  }

}
