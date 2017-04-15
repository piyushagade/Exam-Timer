import { Routes, RouterModule } from '@angular/router';

const appRoutes : Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'all'}
];

export const routing = RouterModule.forRoot(appRoutes);
