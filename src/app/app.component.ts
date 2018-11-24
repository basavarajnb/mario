import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GameService } from './services/game.service';
import { Settings } from './constants/game.constant';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Mario';
  rows = 10;
  columns = 10;
  height = 0;
  width = 0;
  showModal = false;
  modalHeader = '';
  inputValue = '';

  gotUserDetais = false;


  constructor(private settingsService: SettingsService,
    private gameService: GameService) {

  }
  ngOnInit(): void {
    this.getRows();
  }

  getRows() {
    this.modalHeader = 'Enter Rows';
    this.showModal = true;
  }

  submitClicked(value) {
    this.showModal = false;
    this.inputValue = '';
    if (this.modalHeader === 'Enter Columns') {
      this.columns = value;
      this.showModal = false;
      this.setRowsColumns();
      return;
    }
    if (this.modalHeader === 'Enter Rows') {
      this.rows = value;
      this.modalHeader = 'Enter Columns';
      this.showModal = true;
    }
  }

  setRowsColumns() {
    this.gotUserDetais = true;
    this.settingsService.setRows(this.rows);
    this.settingsService.setColumns(this.columns);
    this.height = this.rows * Settings.tileSize;
    this.width = this.columns * Settings.tileSize;
    this.gameService.initialize();
  }

  getColumns() {

  }

  ngAfterViewInit(): void {
  }

}
