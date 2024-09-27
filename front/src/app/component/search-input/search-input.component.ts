import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from '../../core/services/search/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  searchResults$: Observable<any[]>;
  searchQuery: string = '';

  constructor(private searchService: SearchService) {
    this.searchResults$ = searchService.searchResults$;
  }

  onSearch(){
      // const query = event.target.value;
    this.searchService.search(this.searchQuery);
  }

  onClear(){
    this.searchQuery = '';
    this.searchService.search('');
  }
}
