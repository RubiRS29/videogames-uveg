import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth-module/auth-module.module').then(m => m.AuthModuleModule) }, // 📌 Lazy Loading
  { path: 'games', loadChildren: () => import('./app-module/app-module.module').then(m => m.AppModuleModule), canActivate:[AuthGuard] }, 
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
