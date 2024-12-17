import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { IUser } from '../../models/User';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent, DialogData } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-user-accordion',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './user-accordion.component.html',
  styleUrl: './user-accordion.component.scss',
})
export class UserAccordionComponent {

  private dialog = inject(MatDialog);
  public user: InputSignal<IUser> = input.required();
  public deleteUser: OutputEmitterRef<number> = output<number>();

  onDelete(event: Event) {
    event.stopPropagation();
    const dialogData: DialogData = { title: 'Are you sure?', inputValueToBeChecked: this.user().name };

    const dialog = this.dialog.open(ConfirmationModalComponent, { data: dialogData });

    dialog.afterClosed().subscribe(result => {
      if (result && dialogData.inputValueToBeChecked) {
        this.deleteUser.emit(this.user().id);
      }
    });
  }
}
