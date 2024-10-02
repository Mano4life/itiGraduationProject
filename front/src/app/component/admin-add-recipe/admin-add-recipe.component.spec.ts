import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRecipeComponent } from './admin-add-recipe.component';

describe('AdminAddRecipeComponent', () => {
  let component: AdminAddRecipeComponent;
  let fixture: ComponentFixture<AdminAddRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
