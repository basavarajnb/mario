import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { DisplayText } from 'src/app/constants/game.constant';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit {

  diplayText = DisplayText;

  constructor(public gameService: GameService,
    public settingsService: SettingsService) { }

  ngOnInit() {
  }

  getGameMode() {

  }

}
