import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, Event, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { SettingsService } from '../services/settings.service';
import { MatButton } from '@angular/material/button';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatList, MatListItem, RouterLink, MatIcon, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  /*  Injectable declaration start  */
  private settingService: SettingsService = inject<SettingsService>(SettingsService);
  private userService: UserService = inject<UserService>(UserService);
  private route: Router = inject<Router>(Router);
  /*  Injectable declaration end  */

  public isUserRoute = signal(false);

  /***************************
   * Here we are fetching the user list from the server and storing it in state using Elf state management plugin
   * ***************************/
  async ngOnInit() {
    this.settingService.init();
    await this.userService.fetchUsers();


    this.route.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.indexOf('user') > -1) {
          this.isUserRoute.update(() => true);
        } else {
          this.isUserRoute.update(() => false);
        }
      }
    });
  }


}
