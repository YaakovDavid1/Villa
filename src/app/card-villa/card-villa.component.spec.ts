import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVillaComponent } from './card-villa.component';

describe('CardVillaComponent', () => {
  let component: CardVillaComponent;
  let fixture: ComponentFixture<CardVillaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardVillaComponent]
    });
    fixture = TestBed.createComponent(CardVillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
