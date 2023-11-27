import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVilaComponent } from './info-vila.component';

describe('InfoVilaComponent', () => {
  let component: InfoVilaComponent;
  let fixture: ComponentFixture<InfoVilaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoVilaComponent]
    });
    fixture = TestBed.createComponent(InfoVilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
