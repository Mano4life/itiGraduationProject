import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumRecipeComponent } from './premium-recipe.component';

describe('PremiumRecipeComponent', () => {
  let component: PremiumRecipeComponent;
  let fixture: ComponentFixture<PremiumRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
