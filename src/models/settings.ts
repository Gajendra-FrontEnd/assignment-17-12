export interface ILanguages {
  code: string;
  name: string;
}

export interface IDateFormats {
  value: string;
  viewValue: string;
}

export enum SettingStorageEnum {
  language = 'language',
  dateFormat = 'dateFormat',
}
