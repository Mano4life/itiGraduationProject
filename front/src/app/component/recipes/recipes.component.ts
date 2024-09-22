import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  items = Array(8);
  options = [
    { id: 1, name: 'Option 1', selected: false },
    { id: 2, name: 'Option 2', selected: false },
    { id: 3, name: 'Option 3', selected: false },
  ];
  options2 = [
    { id: 1, name: 'Option 1', selected: false },
    { id: 2, name: 'Option 2', selected: false },
    { id: 3, name: 'Option 3', selected: false },
  ];
  options3 = [
    { id: 1, name: 'Time 1', selected: false },
    { id: 2, name: 'Time 2', selected: false },
    { id: 3, name: 'Time 3', selected: false },
  ];

  dropdownOpen = false;
  dropdown2Open = false;
  dropdown3Open = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
 toggleDropdown2() {
    this.dropdown2Open = !this.dropdown2Open;
  }
  toggleDropdown3() {
    this.dropdown3Open = !this.dropdown3Open;
  }
  toggleOption(option: any) {
    option.selected = !option.selected;
  }

  getSelectedOptions() {
    return this.options.filter(option => option.selected);
  }
  toggleOption2(option: any) {
    option.selected = !option.selected;
  }

  getSelectedOptions2() {
    return this.options2.filter(option => option.selected);
  }
  toggleOption3(selectedOption: any) {
    this.options3.forEach(option => {
      option.selected = option === selectedOption; 
    });
  }

  getSelectedOptions3() {
    return this.options3.filter(option => option.selected);
  }

}
