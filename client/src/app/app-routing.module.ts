import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./calendar/calendar.module').then(
            (m) => m.CalendarSheetModule
          ),
      },
      {
        path: 'calendar-sheet',
        loadChildren: () =>
          import('./calendar/calendar.module').then(
            (m) => m.CalendarSheetModule
          ),
      },
    ],
  },
  /**
   * Public Routing (Pages can be visited without authentication)
   */
  {
    path: 'auth',
    // loadChildren: './auth/auth.module#AuthModule',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
