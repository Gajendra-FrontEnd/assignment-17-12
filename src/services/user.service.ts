import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser, userStore } from '../models/User';
import { setEntities } from '@ngneat/elf-entities';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http: HttpClient = inject<HttpClient>(HttpClient);

  async fetchUsers() {
    const users = await lastValueFrom(this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users'));
    userStore.update(() => users);
    return true;
  }
}
