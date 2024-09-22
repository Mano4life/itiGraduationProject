import { Component } from '@angular/core';
import { RecipesService } from '../../core/services/recipes.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css'
})
export class SingleRecipeComponent {
  recipe: any;
  scrollPosition: number = 0;
  routerSubscription!: Subscription;

  constructor(private recipesService: RecipesService, private router: Router){
    this.recipesService.getSingleRecipe().subscribe((res)=>{
      this.recipe = res;
      console.log(this.recipe);
    })
  }



ngOnInit(): void {
    // Subscribe to router events
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Delay scroll restoration to ensure all content is loaded
        setTimeout(() => {
          window.scrollTo(0, this.scrollPosition);
        }, 50); // You can adjust the delay if needed
      }
  });

  // Capture scroll position before refreshing
  window.addEventListener('beforeunload', this.saveScrollPosition.bind(this));
}

ngOnDestroy(): void {
  // Unsubscribe from router events
  this.routerSubscription.unsubscribe();
  window.removeEventListener('beforeunload', this.saveScrollPosition.bind(this));
}

private saveScrollPosition(): void {
  this.scrollPosition = window.scrollY;
}
}
