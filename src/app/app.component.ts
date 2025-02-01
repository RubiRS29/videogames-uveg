import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./share-module/menu/menu.component";
import { ShareModuleModule } from './share-module/share-module.module';
import { VideoGameService } from './core/game.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShareModuleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [VideoGameService]
})

export class AppComponent {
  title = 'videogames-register-project';
}
