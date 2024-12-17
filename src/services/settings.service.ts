import { Injectable } from '@angular/core';
import { IDateFormats, ILanguages, SettingStorageEnum } from '../models/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  // Date format list for setting page
  public dateFormats: IDateFormats[] = [
    { value: 'shortDate', viewValue: 'MM/dd/yyyy' },
    { value: 'mediumDate', viewValue: 'MMM d, y' },
    { value: 'longDate', viewValue: 'MMMM d, y' },
    { value: 'fullDate', viewValue: 'EEEE, MMMM d, y' },
    { value: 'shortTime', viewValue: 'h:mm a' },
    { value: 'mediumTime', viewValue: 'h:mm:ss a' },
    { value: 'longTime', viewValue: 'h:mm:ss a z' },
  ];

  // Language list for setting page
  public languages: ILanguages[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'zh', name: 'Chinese' },
  ];

  /**
   * This method trigger from app component and used to store default value for DateFormat and Language in case data not available
   * in the localstorage
   */
  init() {
    const selectedDate = this.getDateFormatsFromLocale();
    const selectedLanguage = this.getLanguageFromLocale();

    if (!selectedDate || !selectedLanguage) {
      this.onDateChange(this.dateFormats[0].value);
      this.onLanguageChange(this.languages[0].code);
    }
  }

  onLanguageChange(value: string) {
    localStorage.setItem(SettingStorageEnum.language, JSON.stringify(value));
  }

  onDateChange(value: string) {
    localStorage.setItem(SettingStorageEnum.dateFormat, JSON.stringify(value));
  }

  getDateFormatsFromLocale() {
    return JSON.parse(localStorage.getItem(SettingStorageEnum.dateFormat) as string);
  }

  getLanguageFromLocale() {
    return JSON.parse(localStorage.getItem(SettingStorageEnum.language) as string);
  }
}
