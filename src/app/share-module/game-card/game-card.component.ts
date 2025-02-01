import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VIDEOJUEGOS_DUMMY } from '../../dummy/data-dummy';
import { Videojuego } from '../../clases/game';

@Component({
  selector: 'app-game-card',
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {

  @Input() game: Videojuego = {} as Videojuego; 

}
