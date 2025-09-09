import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';
import { PruebaComponent } from './components/prueba/prueba.component';

const routes: Routes = [
  { path: '', redirectTo: 'tarjetas', pathMatch: 'full' },
  { path: 'tarjetas', component: TarjetaCreditoComponent },
  { path: 'pruebas', component: PruebaComponent },
  { path: '**', redirectTo: 'tarjetas' } // ruta por defecto si no existe
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
