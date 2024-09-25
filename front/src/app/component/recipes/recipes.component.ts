import { Component } from '@angular/core';
import { TestService } from '../../test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  recipeList=[
    {
      "name":"butter chicken",
      "ingredients":[{name:["chicken", "parsly", "milk", "butter"],measure:[200,10,400,25]}] ,
      "category":"dinner",
      "sub-category":"indian",
      "time":40,
      "image":"https://www.allrecipes.com/thmb/Apm8-tS4DADYnne_fY1WJaRkPBc=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/45957-ChickenMakhaniIndianButterChicken-mfs-4X3-0037-7aa9a555bf3943baae20c5c3b0921375.jpg"
    },
    {
      "name":"chicken noodles soup",
      "ingredients":[{name:["chicken", "carrots", "broth", "macroni"],measure:[300,10,500,250]}] ,
      "category":"dinner",
      "sub-category":"soup",
      "time":30,
      "image":"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F05%2F16%2F26460-quick-and-easy-chicken-noodle-soup-allrecipes-1x1-1.jpg&q=60&c=sc&poi=auto&orient=true&h=512"
    },
    {
      "name":"caesar salad",
      "ingredients":[{name:["meat", "lettuce", "dressing", "bread"],measure:[20,400,40,25]}] ,
      "category":"lunch",
      "sub-category":"salad",
      "time":15,
      "image":"https://www.allrecipes.com/thmb/9PC5mJkK4D_AjwNnllhWNn2c3z0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Classic-Caesar-Salad-2000-6b3bd6e156f84d1ab5e776702bd48a15.jpg"
    },
    {
      "name":"pancake",
      "ingredients":[{name:["milk", "eggs", "flour", "butter"],measure:[200,2,400,25]}] ,
      "category":"breakfast",
      "description":"butter chicken is a popular dish in india",
      "sub-category":"dessert",
      "time":25,
      "image":"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F10%2F06%2FCheater-Pancake-Syrup-2000.jpg&q=60&c=sc&poi=auto&orient=true&h=512"
    },
    {
      "name":"Breakfast Sausage Casserole",
      "ingredients":[{name:["sausage", "eggs", "cheese", "butter"],measure:[200,3,100,15]}] ,
      "category":"breakfast",
      "sub-category":"Casserole",
      "time":20,
      "image":"https://www.allrecipes.com/thmb/z-I35ncG8GHWLhYEJ6XAIpzhduk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9247-christmas-breakfast-sausage-casserole-DDMFS-4x3-293f309a68ba433d8065347bccf448f6.jpg"
    },
    {
      "name":"School Lunch Bagel Sandwich",
      "ingredients":[{name:["bagel", "turkey", "cheese"],measure:[1,2,2]}] ,
      "category":"lunch",
      "sub-category":"sandwitch",
      "time":10,
      "image":"https://www.allrecipes.com/thmb/1Y_JC73634h2cH7xBJVZA5suSEs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/195868-adf4006ed4964c6a9df8cbf10f65c29f.jpg"
    }
  ]
  sub_category = [
    { id: 1, name: 'dessert', selected: false },
    { id: 2, name: 'Casserole', selected: false },
    { id: 3, name: 'sandwitch', selected: false },
    { id: 4, name: 'salad', selected: false },
    { id: 5, name: 'soup', selected: false },
    { id: 6, name: 'indian', selected: false },
  ];
  ingredents = [
    { id: 1, name: 'bagel', selected: false },
    { id: 2, name: 'turkey', selected: false },
    { id: 3, name: 'cheese', selected: false },
    { id: 4, name: 'sausage', selected: false },
    { id: 5, name: 'milk', selected: false },
    { id: 6, name: 'eggs', selected: false },
    { id: 7, name: 'butter', selected: false },
    { id: 8, name: 'lettuce', selected: false },
    { id: 9, name: 'flour', selected: false },
    { id: 10, name: 'broth', selected: false },
    { id: 11, name: 'macroni', selected: false },
    { id: 12, name: 'carrots', selected: false },
    { id: 13, name: 'dressing', selected: false },
    { id: 14, name: 'bread', selected: false },
    { id: 15, name: 'meat', selected: false },
    { id: 13, name: 'parsly', selected: false },
    { id: 14, name: 'chicken', selected: false },
    
  
  ];
  time = [
    { id: 1, name: '10 t0 20 mins', selected: false },
    { id: 2, name: '20 to 40 mins', selected: false },
    { id: 3, name: 'more than 40 mins', selected: false },
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
    this.dropdown2Open =false;
    this.dropdown3Open = !this.dropdown3Open;
  }
  toggleOption(option: any) {
    this.sub_category.forEach(opt => {
      opt.selected = opt === option ? !opt.selected : false; 
    });
  }

  getSelectedSub_category() {
    return this.sub_category.filter(option => option.selected).map(opt => opt.name);
  }
  toggleOption2(option: any) {
    option.selected = !option.selected;
  }

  getSelectedIngridents() {
    return this.ingredents.filter(option => option.selected);
  }
  toggleOption3(option: any) {
    this.time.forEach(opt => {
      opt.selected = opt === option ? !opt.selected : false; 
    });
  }

  getSelectedIngredients() {
    return this.ingredents.filter(option => option.selected).map(opt => opt.name);
  }

  getSelectedtime() {
    return this.time.filter(option => option.selected).map(opt => opt.name);
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
  
      return this.recipeList.filter(recipe => {
          const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(recipe.category);
          const matchesSubCategory = selectedSubCategories.length === 0 || selectedSubCategories.includes(recipe['sub-category']);
          const matchesIngredients = selectedIngredients.length === 0 || recipe.ingredients[0].name.some(ingredient => selectedIngredients.includes(ingredient));
          const matchesTime = selectedTimes.length === 0 || this.timeMatches(recipe.time, selectedTimes);
  
          return matchesCategory && matchesSubCategory && matchesIngredients && matchesTime;
      });
  }
  timeMatches(recipeTime: number, selectedTimes: string[]): boolean {
    return selectedTimes.some(selected => {
      if (selected === '10 to 20 mins') return recipeTime >= 10 && recipeTime <= 20;
      if (selected === '20 to 40 mins') return recipeTime > 20 && recipeTime <= 40;
      if (selected === 'more than 40 mins') return recipeTime > 40;
      return false;
    });
  }

}
