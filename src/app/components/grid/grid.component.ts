import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Settings, GameMode } from 'src/app/constants/game.constant';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  gameMode = GameMode;

  constructor(public gameService: GameService) { }

  ngOnInit() {
  }

  onTryAgainClick() {
    this.gameService.currentMode = GameMode.setup;
    this.gameService.resetValues();
    this.gameService.initialize();
  }
}
