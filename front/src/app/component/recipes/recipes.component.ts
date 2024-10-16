import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SubcategoriesService } from '../../core/services/subcategories/subcategories.service';
import { UsersService } from '../../core/services/users/users.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { TopDishAreaComponent } from '../top-dish-area/top-dish-area.component';
declare var bootstrap: any;
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, TopDishAreaComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  recipeList: any[] = [];
  reverseOrder: Boolean = false;
  p=1
  sub_categoryList: any[] = [];
  ingredentsList: any[] = [];
  filteredIngredientsList: any[] = [];
  filteredSubCategoryList: any[] = [];
  disable:boolean=true;
  user:any;
  constructor(
    private recipes: RecipesService,
    private subcategories: SubcategoriesService,
    private ingredent: IngredientsService,
    private router: Router,
    private route: ActivatedRoute,
    private UserService:UsersService

  ) {
    
  }
  ngOnInit(): void {
    // All Recipe Button
    this.route.queryParams.subscribe((params) => {
      // Check if reverse parameter is set
      this.reverseOrder = params['reverse'] === 'true';

      
      this.getreciepes();
    });
    
    this.getsubcategories();
    this.getingredients();
    this.getFilterFromHome()
    this.getUser();
  }
  getUser(){
    this.UserService.getUser().subscribe((res:any)=>{
      this.user=res;
      
      })
  }
  isPremiumUser(): boolean {
    return this.user && this.user.role === 'premium' ||  this.user && this.user.role === 'admin';

  }
  getFilterFromHome() {
    this.route.queryParams.subscribe((res) => {
      
      if (res['category']) {
        this.selectedCategories.push(res['category']);
      }
    });
  }

  getreciepes() {
    this.recipes.getRecipes().subscribe({
      next: (Response: any) => {  
        console.log(Response)      
        if(this.reverseOrder){
          this.recipeList = [...Response].reverse();          
        }else{
          this.recipeList = Response;
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getsubcategories() {
    this.subcategories.getSubCategories().subscribe({
      next: (response: any) => {
        console.log(response)
        const uniqueSubCategories = new Map();
  
        this.sub_categoryList = response
          .map((sub: any) => ({
            id: sub.id, 
            name: sub.name,
            category_name:sub.category.name,
            selected: false, 
          }))
          .filter((sub: any) => {
            if (!uniqueSubCategories.has(sub.name)) {
              uniqueSubCategories.set(sub.name, true);
              return true; 
            }
            return false; 
          });
          this.filteredingredents();
          
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getingredients() {
    this.ingredent.getIngredients().subscribe({
      next: (Response: any) => {
        console.log("Recipes Filter",Response)
        this.ingredentsList = Response.map((sub: any, index: number) => ({
          id: sub.id, 
          name: sub.name,
          sub_name:sub.recipes[0].subcategory.name,
          category_name:sub.recipes[0].category.name,
          selected: false, 
        }))
        
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  filteredSubCategory(){
    const selectedcategories = this.selectedCategories;
    return this.filteredSubCategoryList = this.sub_categoryList.filter((sub: any) => {
        return selectedcategories.length === 0 || selectedcategories.includes(sub.category_name.toLowerCase());
    });
  }
  filteredingredents(){
    const selectedSubcategories = this.getSelectedSub_category();
    return this.filteredIngredientsList = this.ingredentsList.filter((sub: any) => {
      return (
        (selectedSubcategories.length === 0 || selectedSubcategories.includes(sub.sub_name)) &&
        (this.selectedCategories.length === 0 || this.selectedCategories.includes(sub.category_name.toLowerCase()))
    );


    });
  }
  time = [
    { id: 1, name: '15 min ', selected: false },
    { id: 2, name: '20 min ', selected: false },
    { id: 3, name: '30 min ', selected: false },
    { id: 4, name: '40 min ', selected: false },
    { id: 5, name: 'less than 60 min ', selected: false },
    { id: 6, name: 'more than 60 min ', selected: false },
    
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
    this.filteredingredents()
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
    
    if(this.selectedCategories[0]==category){
      this.selectedCategories = [];
    }
    else{
      this.selectedCategories = [];
      this.selectedCategories.push(category);
    }
    this.filteredSubCategory()
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
        this.selectedCategories.includes(recipe.category.name.toLowerCase());
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
      if (selected === '15 min ')
        return recipeTime == 15 || recipeTime < 15;
      if (selected === '20 min ')
        return recipeTime == 20 || recipeTime < 20;
      if (selected === '30 min ')
        return recipeTime == 30 || recipeTime < 30;
      if (selected === '40 min ')
        return recipeTime == 40 || recipeTime < 40;
      if (selected === 'less than 60 min ')
        return recipeTime == 60 || recipeTime < 60;
      if (selected === 'more than 60 min ')
      return recipeTime == 60 || recipeTime > 60;
      return false;
    });
  }
  SingleRecipePage(recipeId: number) {
    this.router.navigate(['/recipes', recipeId]);
  }
  premiumRecipeClick(){
    const logged=localStorage.getItem('auth_token')
    if(logged){
      this.router.navigate(['/payment']);
    }
    else{
      const nextModalEl = document.getElementById('loginModal');
          const nextModalInstance = new bootstrap.Modal(nextModalEl);
          nextModalInstance.show();
    }
  }

}
