import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarPageRoutingModule } from './car-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CarPage } from './car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarPageRoutingModule,
    SharedModule
  ],
  declarations: [CarPage]
})
export class CarPageModule {}
