import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Videojuego } from '../../clases/game';
import { VideoGameService } from '../../core/game.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../../share-module/game-card/game-card.component';

@Component({
  selector: 'app-list-game',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css']
})
export class ListGameComponent implements OnInit {
  filter: string | null = null;
  videoGames$!: Observable<Videojuego[]>;
  routeSubscription!: Subscription;


  constructor(
    private route: ActivatedRoute, 
    private videoGameService: VideoGameService
  ) {}

  ngOnInit(): void {
    // Escucha cambios en el parámetro de la ruta para actualizar el filtro
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.filter = params.get('filter'); // Obtener el filtro de la URL
      this.applyFilter(); // Aplica el filtro
    });
  }

  // Método para aplicar el filtro
  applyFilter(): void {
    
    this.videoGames$ = new Observable<Videojuego[]>((observer) => {
      const filterToApply = this.filter || ''; 
      const filteredGames = this.videoGameService.getVideoGamesBy(filterToApply); // Obtén los juegos filtrados
      observer.next(filteredGames); // Emitir los juegos filtrados
      observer.complete(); // Completar el observable
    });
    
  }

 
  
}
