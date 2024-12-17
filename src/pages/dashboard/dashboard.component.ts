import { Component, OnInit } from '@angular/core';
import { IUser, userStore } from '../../models/User';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatCardModule,
    KeyValuePipe,
    AsyncPipe,
  ],
})
export class DashboardComponent implements OnInit {

  public users: Observable<IUser[]> = userStore.pipe(state => state);

  public companyData = {};
  public totalCompany = 0;

  async ngOnInit() {
    this.filterData();
  }

  /**
   * Filtering data to get user count as per company names and showing it to the user.
   */
  filterData() {
    this.users.subscribe((data: IUser[]) => {
      this.companyData = data.reduce((companyCount: any, user: IUser) => {
        const companyName = user.company.name;

        // If the company is already in the count object, increment its count
        if (companyCount[companyName]) {
          companyCount[companyName]++;
        } else {
          companyCount[companyName] = 1;
          this.totalCompany++;
        }

        return companyCount;
      }, {});
    });
  }
}
