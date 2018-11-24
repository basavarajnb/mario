import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Settings } from 'src/app/constants/game.constant';
import { Tile } from 'src/app/model/game.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html'
})
export class TileComponent implements OnInit {

  @Input() tile: Tile;
  settings = Settings.tileSize;

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  getStyles() {
    if (this.tile) {
      return Object.assign({}, {
        left: this.tile.index.columnIndex * Settings.tileSize + 'px',
        top: this.tile.index.rowIndex * Settings.tileSize + 'px',
        width: Settings.tileSize + 'px',
        height: Settings.tileSize + 'px'
      });
    }
  }

}
