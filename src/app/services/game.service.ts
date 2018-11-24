import { Injectable } from '@angular/core';
import { Tile, Mario, Directions, Score } from '../model/game.model';
import { GameHelper } from '../helpers/game.helper';
import { fromEvent, timer, merge, interval, Observable, Subscription, Subject } from 'rxjs';
import {
  take, map, bufferTime, filter, tap, switchMap, mapTo, takeWhile, repeat, takeUntil, mergeMap,
  withLatestFrom, distinctUntilChanged, debounceTime
} from 'rxjs/operators';
import { Keys, GameMode, Settings } from '../constants/game.constant';
import { SettingsService } from './settings.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  grid: Array<Array<Tile>> = [];
  mushrooms: Array<Tile> = [];
  currentMode = GameMode.setup;
  score = new Score();

  startGame$: Observable<any>;
  startGameSubscription: Subscription;

  pauseGame$ = new Subject<any>();
  endGame$ = new Subject<any>();

  constructor(private settingsService: SettingsService,
    private playerService: PlayerService) {
  }

  // Initialize the grid
  initializeGrid() {
    this.grid = [];
    const tempGrid = [];
    for (let i = 0; i < this.settingsService.rows; i++) {
      tempGrid[i] = [];
      for (let j = 0; j < this.settingsService.columns; j++) {
        tempGrid[i].push(new Tile({ rowIndex: i, columnIndex: j }));
      }
    }
    this.grid = tempGrid;
  }

  // Initialize the randomly placed x number of Mushrooms
  getMushrooms() {
    this.mushrooms = [];
    const mushroomLocations = [];
    const indices = GameHelper.getUniqueRandomIndexes(this.settingsService.rows, this.settingsService.rows, this.settingsService.columns);
    indices.forEach(element => {
      mushroomLocations.push(new Tile({ rowIndex: element.rowIndex, columnIndex: element.columnIndex }));
    });
    this.mushrooms = mushroomLocations;
  }

  drawMushrooms() {
    if (this.grid && this.mushrooms) {
      this.mushrooms.forEach((tile) => {
        this.grid[tile.index.rowIndex][tile.index.columnIndex].hasMushroom = true;
      });
    }
  }

  initializeMario() {
    this.playerService.initializeMario();
  }

  initialize() {
    this.initializeGrid();
    this.getMushrooms();
    this.drawMushrooms();
    this.initializeMario();
    this.setGame();
  }

  resetValues() {
    this.currentMode = GameMode.notStarted;
    this.score = new Score();
    this.grid = [];
    this.mushrooms = [];
  }

  togglePause() {
    if (this.currentMode === GameMode.paused) {
      this.currentMode = GameMode.playing;
      this.pauseGame$.next(false);
    } else if (this.currentMode === GameMode.playing) {
      this.currentMode = GameMode.paused;
      this.pauseGame$.next(true);
    }
  }

  updateScore() {
    this.score.moveCount++;
    if (this.grid[this.playerService.mario.tile.index.rowIndex][this.playerService.mario.tile.index.columnIndex].hasMushroom) {
      this.score.mashroomCount++;
      this.grid[this.playerService.mario.tile.index.rowIndex][this.playerService.mario.tile.index.columnIndex].hasMushroom = false;
    }

    if (this.score.mashroomCount === this.mushrooms.length) {
      this.gameOver(true);
    }
  }

  gameOver(won) {
    if (won) {
      this.currentMode = GameMode.won;
    } else {
      this.currentMode = GameMode.lost;
    }
    if (this.startGameSubscription) {
      this.startGameSubscription.unsubscribe();
    }
  }

  setGame() {
    this.currentMode = GameMode.notStarted;

    fromEvent(document, 'keydown').pipe(
      filter((event: KeyboardEvent) => {
        switch (event && event.keyCode) {
          case Keys.up:
          case Keys.right:
          case Keys.down:
          case Keys.left:
            this.currentMode = GameMode.playing;
            return true;
            break;
        }
        return false;
      }),
      take(1)
    ).subscribe();

    const keyboardEvent$ = fromEvent(document, 'keydown').pipe(
      map((event: KeyboardEvent) => {
        switch (event && event.keyCode) {
          case Keys.up:
            this.playerService.setDirection(Directions.up);
            break;
          case Keys.right:
            this.playerService.setDirection(Directions.right);
            break;
          case Keys.down:
            this.playerService.setDirection(Directions.down);
            break;
          case Keys.left:
            this.playerService.setDirection(Directions.left);
            break;
          case Keys.esc:
            if (this.currentMode === GameMode.playing) {
              this.gameOver(false);
            }
            break;
          case Keys.space:
          case Keys.enter:
            this.togglePause();
            break;
        }
        return event;
      }),
      distinctUntilChanged((p: KeyboardEvent, q: KeyboardEvent) => p.keyCode === q.keyCode),
    );

    const interval$ = interval(Settings.speed);

    this.startGame$ = interval$
      .pipe(withLatestFrom(keyboardEvent$),
        filter(event => this.currentMode === GameMode.playing));

    this.startGameSubscription = this.startGame$.subscribe(() => {
      this.playerService.move();
      this.updateScore();
    });

    // The arrow keys are not recognised when types very fast
    // KeyboardEvent$.pipe(
    //   switchMap(val => interval(Settings.speed)
    //   ),
    //   filter(event => this.currentMode === GameMode.playing)
    // );

    // The arrow key buttons move Mario faster
    // merge(
    //   interval(Settings.speed),
    //   KeyboardEvent$
    // ).pipe(
    //   filter(event => this.currentMode === GameMode.playing)
    // );

    // interval(Settings.speed).pipe(
    //   withLatestFrom(KeyboardEvent$),
    //   takeWhile(event => this.currentMode === GameMode.playing),
    //   map(([intervalEmit, key]) => {
    //     if (intervalEmit) {
    //       this.move();
    //     }
  }
}
