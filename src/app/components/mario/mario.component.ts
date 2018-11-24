import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Settings } from 'src/app/constants/game.constant';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-mario',
  templateUrl: './mario.component.html'
})
export class MarioComponent implements OnInit {

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
  }

  getStyles() {
    if (this.playerService.mario) {
      return Object.assign({}, {
        left: this.playerService.mario.tile.index.columnIndex * Settings.tileSize + 'px',
        top: this.playerService.mario.tile.index.rowIndex * Settings.tileSize + 'px',
        width: Settings.tileSize + 'px',
        height: Settings.tileSize + 'px'
      });
    }
  }

}
