import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenaltyPageRoutingModule } from './penalty-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { PenaltyPage } from './penalty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenaltyPageRoutingModule,
    SharedModule
  ],
  declarations: [PenaltyPage]
})
export class PenaltyPageModule {}
