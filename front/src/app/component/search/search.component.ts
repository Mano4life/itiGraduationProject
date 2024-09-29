import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Add this import

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add CommonModule here
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  objects: { key: string, value: string }[] = [
    { key: '1', value: 'fera5' },
    { key: '2', value: 'la7ma' },
    { key: '3', value: 'samak' },
    { key: '4', value: '5odar' },
    { key: '5', value: 'zebala' }
  ];
  value: string = '';
  filteredObjects: { key: string, value: string }[] = [];

  constructor() {}

  search() {
    if (this.value.trim()) {
      this.filteredObjects = this.objects.filter((object) =>
        object.value.toLowerCase().includes(this.value.toLowerCase())
      );
    } else {
      this.filteredObjects = [];
    }
  }

  selectItem(selectedValue: string) {
    this.value = selectedValue;
    this.filteredObjects = []; // Hide the dropdown after selection
  }
}
