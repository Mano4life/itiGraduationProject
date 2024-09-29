import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingRecipesComponent } from './admin-pending-recipes.component';

describe('AdminPendingRecipesComponent', () => {
  let component: AdminPendingRecipesComponent;
  let fixture: ComponentFixture<AdminPendingRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPendingRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPendingRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
