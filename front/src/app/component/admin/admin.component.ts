import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { AdminUserComponent } from "./admin-user/admin-user.component";
import { AdminRecipesComponent } from "./admin-recipes/admin-recipes.component";
import { AdminPendingRecipesComponent } from "./admin-pending-recipes/admin-pending-recipes.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule, ButtonModule, AdminUserComponent,
      AdminRecipesComponent, AdminPendingRecipesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor() {}
  
  ngOnInit() {
    
  }

  activeSection: string = 'pendingRecipes';
  // Method to switch sections
  changeSection(section: string) {
    this.activeSection = section;
  }

}
