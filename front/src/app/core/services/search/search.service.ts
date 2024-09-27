import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchResultSource = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultSource.asObservable();

  // constructor(private recipes: RecipesService) {}

  // recipesArr!: any;

  // ngOnInit() {
  //   this.recipes.getRecipes().subscribe((res) => {
  //     this.recipesArr = res;
  //     console.log(this.recipesArr);
  //   });
  // }
  
  // Static
  private recipes = [
    { 
      id: 1,
      name: 'Spaghetti Carbonara',
      img: 'https://images.pexels.com/photos/14737/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    },
    { 
      id: 2,
      name: 'Chicken Alfredo',
      img: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    },
    { 
      id: 3,
      name: 'Margherita Pizza',
      img: 'https://images.pexels.com/photos/2180875/pexels-photo-2180875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    { 
      id: 4,
      name: 'Caesar Salad',
      img: 'https://images.pexels.com/photos/28618639/pexels-photo-28618639/free-photo-of-delicious-caesar-salad-with-grilled-chicken.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    { 
      id: 5,
      name: 'Tiramisu',
      img: 'https://images.pexels.com/photos/14766327/pexels-photo-14766327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];
  search(query:string){
    if(!query){
      this.searchResultSource.next([]);
      return
    }

    const filteredResults = this.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );

    this.searchResultSource.next(filteredResults);
  }

}
