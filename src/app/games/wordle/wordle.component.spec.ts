import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleComponent } from './wordle.component';

describe('WordleComponent', () => {
  let component: WordleComponent;
  let fixture: ComponentFixture<WordleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WordleComponent]
    });
    fixture = TestBed.createComponent(WordleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
