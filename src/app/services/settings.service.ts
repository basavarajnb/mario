import { Injectable } from '@angular/core';
import { Settings } from '../constants/game.constant';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  rows: number;
  columns: number;

  height: number = Settings.tileSize;
  width: number = Settings.tileSize;
  speed: number;

  constructor() { }

  setRows(rows) {
    this.rows = +rows;
  }

  setColumns(columns) {
    this.columns = +columns;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setHeight(height) {
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

}
