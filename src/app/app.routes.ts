import { Routes } from '@angular/router';

/**
 * As per requirement, lazily loading Home, User and settings route for better performance
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('../pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
  }, {
    path: 'user',
    loadComponent: () => import('../pages/user/user.component').then(c => c.UserComponent),
  }, {
    path: 'settings',
    loadComponent: () => import('../pages/settings/settings.component').then(c => c.SettingsComponent),
  },
];
