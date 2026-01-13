import { Routes } from '@angular/router';
import { PricesComponent } from './pages/prices/prices.component';
import { FixedCostsComponent } from './pages/fixed-costs/fixed-costs.component';
import { ListCostsComponent } from './pages/list-costs/list-costs.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivateLayoutComponent } from './pages/private-layout/private-layout.component';
import { CostsComponent } from './pages/costs/costs.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [guestGuard], pathMatch: 'full' },
    {
  path: 'private',
      component: PrivateLayoutComponent,
  canActivate: [authGuard],
  children: [
    { path: '', redirectTo: 'costs', pathMatch: 'full' },  

    { path: 'prices', component: PricesComponent },
    { path: 'fixed-costs', component: FixedCostsComponent },
    { path: 'costs', component: ListCostsComponent },
    { path: 'costs/:id', component: CostsComponent }
  ]
},

     {path: '**',  redirectTo: '/' }
];






