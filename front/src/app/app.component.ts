import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./component/home/home.component";
import { RecipesComponent } from './component/recipes/recipes.component';
import { AboutComponent } from './component/about/about.component';
import { NavbarComponent } from './component/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent,RecipesComponent,AboutComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
