import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    ConfirmDialogComponent,
    CategoryPipe
  ]
})
export class SharedModule { }
