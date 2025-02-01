// src/app/services/video-game.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Videojuego } from '../clases/game';
import { VIDEOJUEGOS_DUMMY } from '../dummy/data-dummy';

@Injectable({
  providedIn: 'root' // This is equivalent to providing it in AppModule
})
export class VideoGameService {
  private videoGamesSource = new BehaviorSubject<Videojuego[]>(VIDEOJUEGOS_DUMMY);  // Usamos BehaviorSubject para emitir valores
  
  videoGames$ = this.videoGamesSource.asObservable();  // Exponemos el estado como un observable

  constructor() {
    // Comprobar si estamos en el navegador (cliente)
    if (typeof window !== 'undefined' && window.localStorage) {
      // Cargar videojuegos desde localStorage al iniciar la aplicación
      const savedGames = localStorage.getItem('videoGames');
      if (savedGames) {
        this.videoGamesSource = new BehaviorSubject<Videojuego[]>(JSON.parse(savedGames));
      } else {
        this.videoGamesSource = new BehaviorSubject<Videojuego[]>(VIDEOJUEGOS_DUMMY);  // Si no hay juegos guardados, usa los dummy
      }
    } else {
      // En caso de no estar en un entorno cliente, usar los valores predeterminados
      this.videoGamesSource = new BehaviorSubject<Videojuego[]>(VIDEOJUEGOS_DUMMY);
    }
  }

  addVideoGame(game: Videojuego): void {
    const currentGames = this.videoGamesSource.value;
    game.image = "assets/images/game.png";
    const updatedGames = [...currentGames, game];
    this.videoGamesSource.next(updatedGames);
    localStorage.setItem('videoGames', JSON.stringify(updatedGames));
  }

  getVideoGamesBy(filterWord: string): Videojuego[] {
    if (typeof localStorage !== 'undefined') {  // Verifica si localStorage está disponible
      const savedGames = localStorage.getItem('videoGames');
      const games: Videojuego[] = savedGames ? JSON.parse(savedGames) : [];
  
      if (filterWord === 'downloads') {
        return games.filter(game => game.downloads > 100);
      } else if (filterWord === 'soon') {
        return games.filter(game => game.comingSoon);
      } else if (filterWord === 'rating') {
        return games.filter(game => game.rating > 4);
      }
      return games;

    } else {
      return [];  // En caso de que no haya localStorage, retorna un arreglo vacío o maneja el caso
    }
  }


}
