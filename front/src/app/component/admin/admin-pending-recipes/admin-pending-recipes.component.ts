import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PendingRecipesService } from '../../../core/services/pendinRecipes/pending-recipes.service';

@Component({
  selector: 'app-admin-pending-recipes',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './admin-pending-recipes.component.html',
  styleUrl: './admin-pending-recipes.component.css'
})
export class AdminPendingRecipesComponent {

  constructor(private pendingRecipesServices: PendingRecipesService) {}

  pendingRecipes!: any;
  ngOnInit() {
    // Get pending recipes
    this.pendingRecipesServices.pendingRecipes().subscribe((res:any) => {
      this.pendingRecipes = res;
    })
  }
}
