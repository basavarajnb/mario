import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { TileComponent } from './components/tile/tile.component';
import { MarioComponent } from './components/mario/mario.component';
import { ModalComponent } from './controls/modal/modal.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    TileComponent,
    MarioComponent,
    ModalComponent,
    UserInputComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
