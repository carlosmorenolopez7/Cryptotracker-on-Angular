import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerasComponent } from './primeras.component';

describe('PrimerasComponent', () => {
  let component: PrimerasComponent;
  let fixture: ComponentFixture<PrimerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimerasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
