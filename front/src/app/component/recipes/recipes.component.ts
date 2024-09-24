import { Component } from '@angular/core';
import { TestService } from '../../test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  recipeList=[
    {
      "name":"butter chicken",
      "ingredients":[{name:["chicken", "parsly", "milk", "butter"],measure:[200,10,400,25]}] ,
      "category":"dinner",
      "sub-category":"indian",
      "time":40,
      "image":"https://www.allrecipes.com/thmb/Apm8-tS4DADYnne_fY1WJaRkPBc=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/45957-ChickenMakhaniIndianButterChicken-mfs-4X3-0037-7aa9a555bf3943baae20c5c3b0921375.jpg"
    },
    {
      "name":"chicken noodles soup",
      "ingredients":[{name:["chicken", "carrots", "broth", "macroni"],measure:[300,10,500,250]}] ,
      "category":"dinner",
      "sub-category":"soup",
      "time":30,
      "image":"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F05%2F16%2F26460-quick-and-easy-chicken-noodle-soup-allrecipes-1x1-1.jpg&q=60&c=sc&poi=auto&orient=true&h=512"
    },
    {
      "name":"caesar salad",
      "ingredients":[{name:["meat", "lettuce", "dressing", "bread"],measure:[20,400,40,25]}] ,
      "category":"lunch",
      "sub-category":"salad",
      "time":15,
      "image":"https://www.allrecipes.com/thmb/9PC5mJkK4D_AjwNnllhWNn2c3z0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Classic-Caesar-Salad-2000-6b3bd6e156f84d1ab5e776702bd48a15.jpg"
    },
    {
      "name":"pancake",
      "ingredients":[{name:["milk", "eggs", "flour", "butter"],measure:[200,2,400,25]}] ,
      "category":"breakfast",
      "description":"butter chicken is a popular dish in india",
      "sub-category":"salad",
      "time":25,
      "image":"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F10%2F06%2FCheater-Pancake-Syrup-2000.jpg&q=60&c=sc&poi=auto&orient=true&h=512"
    },
    {
      "name":"Breakfast Sausage Casserole",
      "ingredients":[{name:["sausage", "eggs", "cheese", "butter"],measure:[200,3,100,15]}] ,
      "category":"breakfast",
      "sub-category":"Casserole",
      "time":20,
      "image":"https://www.allrecipes.com/thmb/z-I35ncG8GHWLhYEJ6XAIpzhduk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9247-christmas-breakfast-sausage-casserole-DDMFS-4x3-293f309a68ba433d8065347bccf448f6.jpg"
    },
    {
      "name":"School Lunch Bagel Sandwich",
      "ingredients":[{name:["bagel", "turkey", "cheese"],measure:[1,2,2]}] ,
      "category":"lunch",
      "sub-category":"sandwitch",
      "time":10,
      "image":"https://www.allrecipes.com/thmb/1Y_JC73634h2cH7xBJVZA5suSEs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/195868-adf4006ed4964c6a9df8cbf10f65c29f.jpg"
    }
  ]
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
