import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibretasComponent } from './libretas.component';

describe('LibretasComponent', () => {
  let component: LibretasComponent;
  let fixture: ComponentFixture<LibretasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibretasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibretasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
