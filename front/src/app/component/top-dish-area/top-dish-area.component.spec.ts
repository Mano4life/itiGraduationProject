import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDishAreaComponent } from './top-dish-area.component';

describe('TopDishAreaComponent', () => {
  let component: TopDishAreaComponent;
  let fixture: ComponentFixture<TopDishAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDishAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopDishAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
