import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLobbyComponent } from './player-lobby.component';

describe('PlayerLobbyComponent', () => {
  let component: PlayerLobbyComponent;
  let fixture: ComponentFixture<PlayerLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerLobbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
