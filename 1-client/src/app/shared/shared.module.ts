import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';
import { InputErrorsComponent } from './input-errors/input-errors.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    InputErrorsComponent,
    ButtonsComponent,
    ShortenPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  exports: [InputErrorsComponent, ButtonsComponent, ShortenPipe]
})
export class SharedModule { }
