import { Component } from '@angular/core';
import {
  MatAccordion,
} from '@angular/material/expansion';
import { UserAccordionComponent } from '../../components/user-accordion/user-accordion.component';
import { IUser, userStore } from '../../models/User';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [
    MatAccordion,
    UserAccordionComponent,
    AsyncPipe,
  ],
})
export class UserComponent {

  public users: Observable<IUser[]> = userStore.pipe(state => state);

  onDeleteUser(id: number) {
    userStore.update(state => state.filter(user => user.id !== id));
  }

}
