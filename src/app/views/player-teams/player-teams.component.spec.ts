import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTeamsComponent } from './player-teams.component';

describe('PlayerTeamsComponent', () => {
  let component: PlayerTeamsComponent;
  let fixture: ComponentFixture<PlayerTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
