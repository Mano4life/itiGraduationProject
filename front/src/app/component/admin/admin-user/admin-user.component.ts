import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsersService } from '../../../core/services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {
  activeSection: string = 'pendingRecipes';

  constructor(private usersService: UsersService) {}

  users!: any;
  ngOnInit() {
    // Get all users
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    })
  }
}
