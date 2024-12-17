import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation-modal',
  imports: [MatDialogModule, MatFormField, MatInput, MatButton, FormsModule, MatLabel, MatError],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {

  /*  Injectable declaration start  */
  private dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);
  public data = inject<DialogData>(MAT_DIALOG_DATA);

  /*  Injectable declaration start  */

  public inputValue = '';
  public validationError = signal(false);

  /**
   * Validating the confirmation action using input value
   */
  onConfirm() {
    let match = false;
    if (!!this.data.inputValueToBeChecked && this.data.inputValueToBeChecked === this.inputValue) {
      match = true;
    } else {
      this.validationError.update(() => true);
      return;
    }
    this.dialogRef.close(match);
  }

}

/**
 * Settings for dialog.
 *
 * Title - Title of the dialog.
 * inputValueToBeChecked (optional) - If provided, then we are showing input field where user need to type value for further action
 * isAlert (optional) - If provided, then modal can be used as Alert box.
 */
export interface DialogData {
  title: string;
  inputValueToBeChecked?: string;
  isAlert?: boolean;
}
