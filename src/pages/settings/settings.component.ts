import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { IDateFormats, ILanguages } from '../../models/settings';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [
    MatSelectModule,
    FormsModule,
  ],
})
export class SettingsComponent implements OnInit {

  /*  Injectable declaration start  */
  private settingService: SettingsService = inject<SettingsService>(SettingsService);

  /*  Injectable declaration end  */

  public dateFormats: IDateFormats[] = [];
  public languages: ILanguages[] = [];

  public selectedDate = '';
  public selectedLanguage = '';

  /**
   * We have store the default list value in 'Settings' service, from there we are getting and storing list in to the respected variables.
   *
   * Also setting up the default dropdown value which we have store in the localstorage.
   */
  ngOnInit() {
    this.dateFormats = this.settingService.dateFormats;
    this.languages = this.settingService.languages;
    this.selectedLanguage = this.settingService.getLanguageFromLocale();
    this.selectedDate = this.settingService.getDateFormatsFromLocale();
  }

  onLanguageChange() {
    this.settingService.onLanguageChange(this.selectedLanguage);
  }

  onDateChange() {
    this.settingService.onDateChange(this.selectedDate);
  }
}
