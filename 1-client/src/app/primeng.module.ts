import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    ButtonModule,
    PasswordModule,
    InputTextModule,
    PanelModule,
    ToastModule,
    TableModule,
    DynamicDialogModule,
    DropdownModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    ConfirmDialogModule,
    MultiSelectModule,
    CardModule,
  ],
  exports: [
    ButtonModule,
    PasswordModule,
    InputTextModule,
    PanelModule,
    ToastModule,
    TableModule,
    DynamicDialogModule,
    DropdownModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    ConfirmDialogModule,
    MultiSelectModule,
    CardModule,
  ]
})
export class PrimeNgModule {}
