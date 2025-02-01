import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGameComponent } from './list-game/list-game.component';
import { AddGameComponent } from './add-game/add-game.component';

const routes: Routes = [
  
  { path: 'list_games', component: ListGameComponent }, 
  { path: 'list_games/:filter', component: ListGameComponent },
  { path: 'add_games', component: AddGameComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule {
    
 }
