import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { VideoGameService } from '../../core/game.service';

@Component({
  selector: 'app-add-game',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css'
})
export class AddGameComponent {
  authImage = 'assets/images/games.png';
  addGameForm: FormGroup;

  constructor(private videoGameService: VideoGameService) {
    this.addGameForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      releaseDate: new FormControl('', [Validators.required, this.validateReleaseDate()]), // ✅ Se llama como función
      downloads: new FormControl(0, [Validators.required, Validators.min(0)]),
      isSoon: new FormControl(false)
    });
  }

  // ✅ Función de validación personalizada para evitar fechas futuras
  validateReleaseDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // Si el campo está vacío, no aplicar validación
      
      const today = new Date();
      const inputDate = new Date(control.value);
      
      return inputDate > today ? { futureDate: true } : null;
    };
  }

  onSubmit() {
    if (this.addGameForm.valid) {
      const newGame = {
        ...this.addGameForm.value,
        rating: Number(this.addGameForm.value.rating),
        downloads: Number(this.addGameForm.value.downloads)
      };

      this.videoGameService.addVideoGame(newGame);
      this.addGameForm.reset();
    }
  }
}
