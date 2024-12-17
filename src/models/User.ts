import { createStore, withProps } from '@ngneat/elf';

interface IGeo {
  lat: string;
  log: string;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export const userStore = createStore(
  { name: 'user'},
  withProps<IUser[]>([])
);

