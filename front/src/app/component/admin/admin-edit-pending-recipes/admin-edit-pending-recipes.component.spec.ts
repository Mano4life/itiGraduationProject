import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPendingRecipesComponent } from './admin-edit-pending-recipes.component';

describe('AdminEditPendingRecipesComponent', () => {
  let component: AdminEditPendingRecipesComponent;
  let fixture: ComponentFixture<AdminEditPendingRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditPendingRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditPendingRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
