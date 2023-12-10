import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMapPageRoutingModule } from './modal-map-routing.module';

import { ModalMapPage } from './modal-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMapPageRoutingModule
  ],
  declarations: [ModalMapPage]
})
export class ModalMapPageModule {}
