import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'car',
        loadChildren: () => import('./car/car.module').then( m => m.CarPageModule)
      },
      {
        path: 'license',
        loadChildren: () => import('./license/license.module').then( m => m.LicensePageModule)
      },
      {
        path: 'penalty',
        loadChildren: () => import('./penalty/penalty.module').then( m => m.PenaltyPageModule)
      },
      {
        path: 'license',
        loadChildren: () => import('./license/license.module').then( m => m.LicensePageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'zodiac',
        loadChildren: () => import('./zodiac/zodiac.module').then( m => m.ZodiacPageModule)
      },
    ],
  },
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
