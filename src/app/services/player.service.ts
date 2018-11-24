import { Injectable } from '@angular/core';
import { Tile, Mario, Directions } from '../model/game.model';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  mario: Mario = null;
  constructor(private settingsService: SettingsService) { }

  initializeMario() {
    this.mario = new Mario(new Tile({ rowIndex: 0, columnIndex: 0 }));
  }

  setDirection(direction: Directions) {
    this.mario.direction = direction;
  }

  move(currentDirection?: Directions) {
    const direction = currentDirection || this.mario.direction;
    switch (direction) {
      case Directions.up: this.moveUp(); break;
      case Directions.right: this.moveRight(); break;
      case Directions.down: this.moveDown(); break;
      case Directions.left: this.moveLeft(); break;
    }
  }

  moveUp() {
    if (this.mario) {
      this.mario.direction = Directions.up;
      if (this.mario.tile.index.rowIndex > 0) {
        this.mario.tile.index.rowIndex = this.mario.tile.index.rowIndex - 1;
      } else {
        this.moveDown();
      }
    }
  }

  moveRight() {
    if (this.mario) {
      this.mario.direction = Directions.right;
      if (this.mario.tile.index.columnIndex < this.settingsService.columns - 1) {
        this.mario.tile.index.columnIndex = this.mario.tile.index.columnIndex + 1;
      } else {
        this.moveLeft();
      }
    }
  }

  moveDown() {
    if (this.mario) {
      this.mario.direction = Directions.down;
      if (this.mario.tile.index.rowIndex < this.settingsService.rows - 1) {
        this.mario.tile.index.rowIndex = this.mario.tile.index.rowIndex + 1;
      } else {
        this.moveUp();
      }
    }
  }

  moveLeft() {
    if (this.mario) {
      this.mario.direction = Directions.left;
      if (this.mario.tile.index.columnIndex > 0) {
        this.mario.tile.index.columnIndex = this.mario.tile.index.columnIndex - 1;
      } else {
        this.moveRight();
      }
    }
  }
}
