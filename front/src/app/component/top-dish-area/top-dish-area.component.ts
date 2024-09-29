import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-dish-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-dish-area.component.html',
  styleUrl: './top-dish-area.component.css'
})
export class TopDishAreaComponent {
  @Input() title: string = '';
  @Input() showTitle: boolean = true;

  @Input() isNavbar:boolean = false;
}
