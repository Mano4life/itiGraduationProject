import { Component } from '@angular/core';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  arr!:any;
  constructor(private test:TestService){

  }
  ngOnInit(){
    this.test.gett().subscribe({
      next: (data) => {
        this.arr=data;
        console.log(this.arr.data);
        },
        error: (error) => {
          console.error('Error:', error);
        }
    })
  }

}
