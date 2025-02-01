import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGameComponent } from './list-game/list-game.component';
import { GamesRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ListGameComponent
  ]
})
export class AppModuleModule { }
