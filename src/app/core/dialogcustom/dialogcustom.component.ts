import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/components/material/material.module';
import { DialogCustomData } from '../models/dialog.model';

@Component({
  selector: 'app-dialogcustom',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatDialogModule],
  template: `<ng-container class="dialog-content">
    <button type="button" class="closeDialogUp" mat-dialog-close></button>
    <ng-container *ngTemplateOutlet="data.template; context: { $implicit: data.data }">
    </ng-container>
  </ng-container>`,
  styleUrl: './dialogcustom.component.scss',
})
export class DialogcustomComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogCustomData) {}
}
