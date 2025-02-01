import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { GameCardComponent } from './game-card/game-card.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenuComponent,
    GameCardComponent
  ],
  exports : [MenuComponent, GameCardComponent]
})

export class ShareModuleModule { }
