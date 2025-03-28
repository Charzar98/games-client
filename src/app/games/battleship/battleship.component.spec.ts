import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleshipComponent } from './battleship.component';

describe('BattleshipComponent', () => {
  let component: BattleshipComponent;
  let fixture: ComponentFixture<BattleshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleshipComponent]
    });
    fixture = TestBed.createComponent(BattleshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
