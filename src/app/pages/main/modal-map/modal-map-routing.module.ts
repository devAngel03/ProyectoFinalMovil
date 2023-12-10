import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMapPage } from './modal-map.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMapPageRoutingModule {}
