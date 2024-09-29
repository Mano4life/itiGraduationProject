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

  constructor(private usersService: UsersService) {}

  users!: any;
  ngOnInit() {
    // Get all recipes
    this.getAllUsers();
  }

  getAllUsers(){
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    })
  }
  
  deleteUser(id:any){
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.getAllUsers();
      },
    error: (err) => {
        console.error('Error Deleting User:', err);
      }
    })
  }
}
